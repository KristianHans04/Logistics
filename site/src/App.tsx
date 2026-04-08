import { Routes, Route } from "react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import Home from "@/pages/Home";
import Operations from "@/pages/Operations";
import Clearance from "@/pages/Clearance";
import Protocols from "@/pages/Protocols";
import Recovery from "@/pages/Recovery";
import Intake from "@/pages/Intake";

export default function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/clearance" element={<Clearance />} />
        <Route path="/protocols" element={<Protocols />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/intake" element={<Intake />} />
      </Routes>
    </PageLayout>
  );
}
