import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

//Pages
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
//Admin pages
import Doutor from "./Pages/Admin/Doutor/Doutor";
import Enfermeira from "./Pages/Admin/Enfermeira/Enfermeira";
import Farmacia from "./Pages/Admin/Farmacia/Farmacia";
import Camas from "./Pages/Admin/Camas/Camas";
//Home
import Home from "./Pages/Home/Home";
//Doutor
import DoutorDoador from "./Pages/Doutor/Doutor-Doador/DoutorDoador";
import DoutorBanco from "./Pages/Doutor/Doutor-banco/DoutorBanco";
import DoutorDespachar from "./Pages/Doutor/Doutor-despachar/DoutorDespachar";
import DoutorOperacao from "./Pages/Doutor/Doutor-operações/DoutorOperacao";
import DoutorPaciente from "./Pages/Doutor/Doutor-paciente/DoutorPaciente";
import DoutorPacientePerfil from "./Pages/Doutor/Doutor-paciente-perfil/DoutorPacientePerfil";
import DoutorPerfil from "./Pages/Doutor/Doutor-perfil/DoutorPerfil";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />
        
        <div className="content-container">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Admin rotas */}
            <Route path="/admin/doutor" element={<Doutor />} />
            <Route path="/admin/enfermeira" element={<Enfermeira />} />
            <Route path="/admin/farmacia" element={<Farmacia />} />
            <Route path="/admin/camas" element={<Camas />} />

            {/* Doutor rotas */}
            <Route path="/doutor/doador" element={<DoutorDoador />} />
            <Route path="/doutor/banco" element={<DoutorBanco />} />
            <Route path="/doutor/despachar" element={<DoutorDespachar />} />
            <Route path="/doutor/operacoes" element={<DoutorOperacao />} />
            <Route path="/doutor/pacientes" element={<DoutorPaciente />} />
            <Route path="/doutor/pacientes/perfil/id/:id" element={<DoutorPacientePerfil />} />
            <Route path="/doutor/perfil" element={<DoutorPerfil/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
