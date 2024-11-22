import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicial from "./Inicial/Inicial";
import CadastroUsuario from "./CadastroUsuario/CadastroUsuario";
import CadastroTarefa from "./CadastroTarefa/CadastroTarefa";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/cadastrousuario" element={<CadastroUsuario />} />
        <Route path="/cadastrotarefa" element={<CadastroTarefa />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;