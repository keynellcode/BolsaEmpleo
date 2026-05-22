import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function OferenteDashboard() {
    const { auth } = useAuth();
    const [oferente, setOferente] = useState(null);

    useEffect(() => {
        api.get("/oferentes/perfil").then(res => setOferente(res.data));
    }, []);

    if (!oferente) return (
        <Layout>
            <p className="text-gray-500 text-center py-20">Cargando...</p>
        </Layout>
    );

    return (
        <Layout>
            {/* Bienvenida */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Bienvenido, {oferente.nombre} {oferente.apellido}
                </h1>
                <p className="text-gray-600">{oferente.correo}</p>
            </div>

            {/* Accesos rápidos */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Link to="/oferente/habilidades"
                      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Mis Habilidades</h3>
                            <p className="text-blue-100 mb-4">Gestioná tus destrezas y niveles</p>
                            <span className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
                Ver habilidades
              </span>
                        </div>
                        <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                    </div>
                </Link>

                <Link to="/oferente/curriculum"
                      className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Mi CV</h3>
                            <p className="text-green-100 mb-4">Subí o actualizá tu currículum</p>
                            <span className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold">
                Ver CV
              </span>
                        </div>
                        <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                    </div>
                </Link>
            </div>

            {/* Info del oferente */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Mi Información</h3>
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
                            <p className="font-semibold text-gray-800">{oferente.correo}</p>
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
                            <p className="font-semibold text-gray-800">{oferente.telefono}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Residencia</p>
                            <p className="font-semibold text-gray-800">{oferente.residencia}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Identificación</p>
                            <p className="font-semibold text-gray-800">{oferente.identificacion}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-red-100 p-3 rounded-full">
                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 7l2.55 2.4A1 1 0 0116 11H6a3 3 0 01-3-3V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Nacionalidad</p>
                            <p className="font-semibold text-gray-800">{oferente.nacionalidad}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 p-3 rounded-full">
                            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Estado</p>
                            {oferente.aprobado ? (
                                <span className="text-green-600 font-semibold">✓ Aprobado</span>
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