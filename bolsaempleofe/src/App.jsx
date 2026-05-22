import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Páginas públicas
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Buscar from "./pages/public/Buscar";
import RegistroEmpresa from "./pages/public/RegistroEmpresa";
import RegistroOferente from "./pages/public/RegistroOferente";

// Páginas empresa
import EmpresaDashboard from "./pages/empresa/EmpresaDashboard";
import EmpresaPuestos from "./pages/empresa/EmpresaPuestos";
import EmpresaCrearPuesto from "./pages/empresa/EmpresaCrearPuesto";

// Páginas oferente
import OferenteDashboard from "./pages/oferente/OferenteDashboard";
import OferenteHabilidades from "./pages/oferente/OferenteHabilidades";

// Páginas admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAprobaciones from "./pages/admin/AdminAprobaciones";
import AdminCaracteristicas from "./pages/admin/AdminCaracteristicas";
import AdminEmpresas from "./pages/admin/AdminEmpresas";
import AdminOferentes from "./pages/admin/AdminOferentes";
import EmpresaCandidatos from "./pages/empresa/EmpresaCandidatos";
import OferenteCurriculum from "./pages/oferente/OferenteCurriculum";


function RutaProtegida({ children, rol }) {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/login" />;
  if (rol && auth.rol !== rol) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/registro/empresa" element={<RegistroEmpresa />} />
        <Route path="/registro/oferente" element={<RegistroOferente />} />

        {/* Empresa */}
        <Route path="/empresa/dashboard" element={
          <RutaProtegida rol="EMPRESA"><EmpresaDashboard /></RutaProtegida>
        } />
        <Route path="/empresa/puestos" element={
          <RutaProtegida rol="EMPRESA"><EmpresaPuestos /></RutaProtegida>
        } />
        <Route path="/empresa/puestos/nuevo" element={
          <RutaProtegida rol="EMPRESA"><EmpresaCrearPuesto /></RutaProtegida>
        } />
          <Route path="/empresa/candidatos/:puestoId" element={
          <RutaProtegida rol="EMPRESA"><EmpresaCandidatos /></RutaProtegida>
        } />

        {/* Oferente */}
        <Route path="/oferente/dashboard" element={
          <RutaProtegida rol="OFERENTE"><OferenteDashboard /></RutaProtegida>
        } />
        <Route path="/oferente/habilidades" element={
          <RutaProtegida rol="OFERENTE"><OferenteHabilidades /></RutaProtegida>
        } />

        {/* Admin */}
        <Route path="/admin/dashboard" element={
          <RutaProtegida rol="ADMIN"><AdminDashboard /></RutaProtegida>
        } />
        <Route path="/admin/aprobaciones" element={
          <RutaProtegida rol="ADMIN"><AdminAprobaciones /></RutaProtegida>
        } />
        <Route path="/admin/caracteristicas" element={
          <RutaProtegida rol="ADMIN"><AdminCaracteristicas /></RutaProtegida>
        } />
          <Route path="/admin/empresas" element={
              <RutaProtegida rol="ADMIN"><AdminEmpresas /></RutaProtegida>
          } />
          <Route path="/admin/oferentes" element={
              <RutaProtegida rol="ADMIN"><AdminOferentes /></RutaProtegida>
          } />

          <Route path="/oferente/curriculum" element={
              <RutaProtegida rol="OFERENTE"><OferenteCurriculum /></RutaProtegida>
          } />

        {/* Cualquier otra ruta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}