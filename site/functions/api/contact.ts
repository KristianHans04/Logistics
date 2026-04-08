/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Receives intake form submissions and sends an email notification
 * via Zoho SMTP using Cloudflare's TCP socket API (cloudflare:sockets).
 *
 * Required environment variables (set as Cloudflare Pages secrets):
 *   ZOHO_USER       - Zoho sender address, e.g. intake@logistics.ownthejoke.com
 *   ZOHO_PASS       - Zoho app-specific password
 *   CONTACT_TO      - Destination address for notifications
 *
 * The function degrades gracefully: if credentials are not yet configured
 * the submission is acknowledged but no email is dispatched.
 */

interface Env {
  ZOHO_USER: string;
  ZOHO_PASS: string;
  CONTACT_TO: string;
}

interface FormPayload {
  name: string;
  handle?: string;
  contact: string;
  type: string;
  referral?: string;
  message: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  // Parse and validate body
  let payload: FormPayload;
  try {
    const body = await request.json() as FormPayload;
    if (!body.name || !body.contact || !body.message) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields." }),
        { status: 400, headers }
      );
    }
    payload = body;
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Invalid request body." }),
      { status: 400, headers }
    );
  }

  // Attempt to send email if credentials are configured
  if (env.ZOHO_USER && env.ZOHO_PASS && env.CONTACT_TO) {
    try {
      await sendViaSMTP({
        host: "smtp.zoho.com",
        port: 587,
        user: env.ZOHO_USER,
        pass: env.ZOHO_PASS,
        to: env.CONTACT_TO,
        subject: `[Logistics HQ] New Intake: ${payload.type} — ${payload.name}`,
        body: buildEmailBody(payload),
      });
    } catch (err) {
      // Log but do not surface SMTP errors to the client
      console.error("SMTP dispatch failed:", err);
    }
  }

  return new Response(
    JSON.stringify({ ok: true }),
    { status: 200, headers }
  );
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

// ---------------------------------------------------------------------------
// Email body builder
// ---------------------------------------------------------------------------

function buildEmailBody(p: FormPayload): string {
  return [
    "New intake submission — Department of Logistics",
    "----------------------------------------------",
    `Name:      ${p.name}`,
    `Handle:    ${p.handle || "—"}`,
    `Contact:   ${p.contact}`,
    `Type:      ${p.type}`,
    `Referral:  ${p.referral || "—"}`,
    "",
    "Message:",
    p.message,
    "",
    "----------------------------------------------",
    `Received: ${new Date().toUTCString()}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Minimal SMTP over Cloudflare TCP sockets (STARTTLS on port 587)
// ---------------------------------------------------------------------------

async function sendViaSMTP(opts: {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
  subject: string;
  body: string;
}): Promise<void> {
  // @ts-expect-error -- cloudflare:sockets is a Cloudflare Workers runtime API
  const { connect } = await import("cloudflare:sockets");

  const socket = connect({ hostname: opts.host, port: opts.port });
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();

  const enc = new TextEncoder();
  const dec = new TextDecoder();

  async function read(): Promise<string> {
    const { value } = await reader.read();
    return dec.decode(value);
  }

  async function write(line: string): Promise<void> {
    await writer.write(enc.encode(line + "\r\n"));
  }

  await read(); // 220 greeting

  await write(`EHLO logistics.ownthejoke.com`);
  const ehloResp = await read();
  if (!ehloResp.includes("STARTTLS")) {
    throw new Error("Server does not support STARTTLS");
  }

  await write("STARTTLS");
  await read(); // 220 Go ahead

  // Upgrade to TLS
  const secureSocket = socket.startTls();
  const secWriter = secureSocket.writable.getWriter();
  const secReader = secureSocket.readable.getReader();

  async function sRead(): Promise<string> {
    const { value } = await secReader.read();
    return dec.decode(value);
  }
  async function sWrite(line: string): Promise<void> {
    await secWriter.write(enc.encode(line + "\r\n"));
  }

  await sWrite(`EHLO logistics.ownthejoke.com`);
  await sRead();

  await sWrite("AUTH LOGIN");
  await sRead(); // 334 Username

  await sWrite(btoa(opts.user));
  await sRead(); // 334 Password

  await sWrite(btoa(opts.pass));
  const authResp = await sRead();
  if (!authResp.startsWith("235")) {
    throw new Error("SMTP authentication failed");
  }

  await sWrite(`MAIL FROM:<${opts.user}>`);
  await sRead();

  await sWrite(`RCPT TO:<${opts.to}>`);
  await sRead();

  await sWrite("DATA");
  await sRead(); // 354

  const message = [
    `From: Logistics HQ <${opts.user}>`,
    `To: ${opts.to}`,
    `Subject: ${opts.subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
    ``,
    opts.body,
    `.`,
  ].join("\r\n");

  await sWrite(message);
  await sRead(); // 250 OK

  await sWrite("QUIT");

  await secWriter.close();
}
