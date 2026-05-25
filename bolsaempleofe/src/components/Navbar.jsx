import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Navbar() {
    const { auth, login, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [form, setForm] = useState({ usuario: "", clave: "" });
    const [error, setError] = useState("");

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async e => {
        e.preventDefault();
        setError("");
        try {
            const res = await api.post("/auth/login", form);
            login(res.data);
            setShowLogin(false);
            setForm({ usuario: "", clave: "" });
            const rol = res.data.rol;
            if (rol === "EMPRESA") navigate("/empresa/dashboard");
            else if (rol === "OFERENTE") navigate("/oferente/dashboard");
            else if (rol === "ADMIN") navigate("/admin/dashboard");
        } catch (err) {
            // Leer el mensaje del backend
            const mensaje = err.response?.data;
            if (mensaje === "Empresa no aprobada" || mensaje === "Oferente no aprobado") {
                setError("⏳ Tu cuenta aún no ha sido aprobada por el administrador.");
            } else if (mensaje === "Credenciales inválidas") {
                setError("❌ Usuario o contraseña incorrectos.");
            } else if (mensaje === "Usuario no encontrado") {
                setError("❌ No existe una cuenta con ese usuario.");
            } else {
                setError("❌ Error al iniciar sesión. Intentá de nuevo.");
            }
        }
    };

    return (
        <>
            <nav className="bg-blue-600 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">

                        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Bolsa de Empleo
                        </Link>

                        <div className="flex items-center gap-6 text-sm font-semibold">
                            {!auth && (
                                <>
                                    <Link to="/buscar" className="hover:underline">Buscar puestos</Link>
                                    <Link to="/registro/empresa" className="hover:underline">Registro Empresa</Link>
                                    <Link to="/registro/oferente" className="hover:underline">Registro Oferente</Link>
                                    <span className="text-white/70">|</span>
                                    <button
                                        onClick={() => setShowLogin(true)}
                                        className="hover:underline"
                                    >
                                        Login
                                    </button>
                                </>
                            )}

                            {auth?.rol === "EMPRESA" && (
                                <>
                                    <span className="text-white/80">{auth.nombre}</span>
                                    <Link to="/empresa/dashboard" className="hover:underline">Dashboard</Link>
                                    <span className="text-white/70">|</span>
                                    <button onClick={handleLogout} className="hover:underline">Salir</button>
                                </>
                            )}

                            {auth?.rol === "OFERENTE" && (
                                <>
                                    <span className="text-white/80">{auth.nombre}</span>
                                    <Link to="/oferente/dashboard" className="hover:underline">Dashboard</Link>
                                    <span className="text-white/70">|</span>
                                    <button onClick={handleLogout} className="hover:underline">Salir</button>
                                </>
                            )}

                            {auth?.rol === "ADMIN" && (
                                <>
                                    <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
                                    <span className="text-white/70">|</span>
                                    <button onClick={handleLogout} className="hover:underline">Salir</button>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </nav>

            {/* Modal Login */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
                    showLogin
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Fondo */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => { setShowLogin(false); setError(""); }}
                />

                {/* Contenido */}
                <div
                    className={`relative bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transition-all duration-300 ${
                        showLogin
                            ? "scale-100 opacity-100 translate-y-0"
                            : "scale-95 opacity-0 translate-y-4"
                    }`}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Iniciar sesión</h2>
                        <button
                            onClick={() => { setShowLogin(false); setError(""); }}
                            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600"
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                      d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.21.794 5.879 2.104M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-4 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            name="usuario"
                            value={form.usuario}
                            onChange={handleChange}
                            placeholder="correo o identificación"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="clave"
                            value={form.clave}
                            onChange={handleChange}
                            onKeyDown={e => e.key === "Enter" && handleLogin(e)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </>
    );
}