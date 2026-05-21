import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function EmpresaDashboard() {
    const { auth } = useAuth();
    const [empresa, setEmpresa] = useState(null);

    useEffect(() => {
        api.get("/empresas/perfil").then(res => setEmpresa(res.data));
    }, []);

    if (!empresa) return (
        <Layout>
            <p className="text-gray-500 text-center py-20">Cargando...</p>
        </Layout>
    );

    return (
        <Layout>
            {/* Bienvenida */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Bienvenido, {empresa.nombre}
                </h1>
                <p className="text-gray-600">{empresa.descripcion}</p>
            </div>

            {/* Accesos rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Link to="/empresa/puestos"
                      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Mis Puestos</h3>
                            <p className="text-blue-100 mb-4">Ver y gestionar tus ofertas de empleo</p>
                            <span className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
                Ir a Puestos
              </span>
                        </div>
                        <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                    </div>
                </Link>

                <Link to="/empresa/puestos/nuevo"
                      className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Crear Puesto</h3>
                            <p className="text-green-100 mb-4">Publicar una nueva oferta de empleo</p>
                            <span className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold">
                Crear
              </span>
                        </div>
                        <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                    </div>
                </Link>
            </div>

            {/* Info de la empresa */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Información de la Empresa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Correo</p>
                            <p className="font-semibold text-gray-800">{empresa.correo}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Teléfono</p>
                            <p className="font-semibold text-gray-800">{empresa.telefono}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Ubicación</p>
                            <p className="font-semibold text-gray-800">{empresa.localizacion}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Estado</p>
                            {empresa.aprobada ? (
                                <span className="text-green-600 font-semibold">✓ Aprobada</span>
                            ) : (
                                <span className="text-yellow-600 font-semibold">⏳ Pendiente</span>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}