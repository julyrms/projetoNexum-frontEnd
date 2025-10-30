import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastrar from "./componentes/pages/Cadastrar";
import Dashboard from "./componentes/pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./componentes/pages/Login";
import CadastroServico from "./componentes/pages/CadastrarServiço";
import Perfil from "./componentes/pages/Perfil/index";
import EditarServico from "./componentes/pages/EditarServico";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/cadastroServico" element={<CadastroServico />} />
          <Route path="/editarServico/:id" element={<EditarServico />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
