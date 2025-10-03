import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastrar from "./componentes/pages/Cadastrar";
import Dashboard from "./componentes/pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./componentes/pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;