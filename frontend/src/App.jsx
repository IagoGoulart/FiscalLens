import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistrosFiscais from "./pages/RegistrosFiscais/RegistrosFiscais";
import AnaliseRegistro from "./pages/AnaliseRegistro/AnaliseRegistro";
import Relatorios from "./pages/Relatorios/Relatorios";
import SobreProjeto from "./pages/SobreProjeto/SobreProjeto";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/registros" element={<RegistrosFiscais />} />
      <Route path="/registros/:id" element={<AnaliseRegistro />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="/sobre" element={<SobreProjeto />} />
    </Routes>
  );
}