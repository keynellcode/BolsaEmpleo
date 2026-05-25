import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        empresasPendientes: 0,
        oferentesPendientes: 0,
        totalEmpresas: 0,
        totalOferentes: 0,
    });

    const [empresas, setEmpresas] = useState([]);
    const [oferentes, setOferentes] = useState([]);
    const [modalEmpresasOpen, setModalEmpresasOpen] = useState(false);
    const [modalOferentesOpen, setModalOferentesOpen] = useState(false);

    useEffect(() => {
        Promise.all([
            api.get("/admin/empresas/pendientes"),
            api.get("/admin/oferentes/pendientes"),
            api.get("/admin/oferentes/total"),
            api.get("/admin/empresas/total"),
        ]).then(([empresasRes, oferentesRes, oferentesTotal, empresasTotal]) => {
            setStats({
                empresasPendientes: empresasRes.data.length,
                oferentesPendientes: oferentesRes.data.length,
                totalEmpresas: empresasTotal.data,
                totalOferentes: oferentesTotal.data,
            });
        }).catch(err => console.error(err));
    }, []);

    const openEmpresas = () => {
        api.get("/admin/empresas")
            .then(res => {
                setEmpresas(res.data);
                setModalEmpresasOpen(true);
            })
            .catch(err => console.error(err));
    };

    const openOferentes = () => {
        api.get("/admin/oferentes")
            .then(res => {
                setOferentes(res.data);
                setModalOferentesOpen(true);
            })
            .catch(err => console.error(err));
    };

    const cards = [
        { label: "Empresas pendientes", valor: stats.empresasPendientes, gradient: "from-blue-500 to-blue-600" },
        { label: "Oferentes pendientes", valor: stats.oferentesPendientes, gradient: "from-blue-500 to-blue-600" },
        { label: "Total empresas", valor: stats.totalEmpresas, gradient: "from-blue-500 to-blue-600" },
        { label: "Total oferentes", valor: stats.totalOferentes, gradient: "from-blue-500 to-blue-600" },
    ];

    return (
        <Layout>
            {/* Bienvenida */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Dashboard Administrativo
                </h1>
                <p className="text-gray-600">Resumen general del sistema y gestión</p>
            </div>



            {/* Accesos rápidos */}
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Aprobar usuarios */}
                    <a href="/admin/aprobaciones"
                       className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-8 text-white block">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Aprobar usuarios</h3>
                                <p className="text-green-100 mb-4">Revisa y aprueba solicitudes pendientes</p>
                                <span className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold text-sm">
                                    Ver solicitudes
                                </span>
                            </div>
                            <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </a>

                    {/* Características */}
                    <a href="/admin/caracteristicas"
                       className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-8 text-white block">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Características</h3>
                                <p className="text-cyan-100 mb-4">Gestiona habilidades y características</p>
                                <span className="bg-white text-cyan-600 px-6 py-2 rounded-lg font-semibold text-sm">
                                    Administrar
                                </span>
                            </div>
                            <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM15 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM15 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                            </svg>
                        </div>
                    </a>

                    {/* Empresas — ahora abre popout */}
                    <button
                        onClick={openEmpresas}
                        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-8 text-white text-left w-full">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Empresas</h3>
                                <p className="text-blue-100 mb-4">Gestiona y revisa todas las empresas</p>
                                <span className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold text-sm">
                                    Ver empresas
                                </span>
                            </div>
                            <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </div>
                    </button>

                    {/* Oferentes — ahora abre popout */}
                    <button
                        onClick={openOferentes}
                        className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-8 text-white text-left w-full">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Oferentes</h3>
                                <p className="text-pink-100 mb-4">Revisa y gestiona perfiles de oferentes</p>
                                <span className="bg-white text-pink-600 px-6 py-2 rounded-lg font-semibold text-sm">
                                    Ver oferentes
                                </span>
                            </div>
                            <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>

            {/* Modal Empresas */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
                modalEmpresasOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalEmpresasOpen(false)} />
                <div className={`relative bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-4 transition-all duration-300 ${
                    modalEmpresasOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
                }`}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-2xl text-gray-800">Lista de Empresas</h3>
                            <p className="text-sm text-gray-500">Gestión de empresas registradas</p>
                        </div>
                        <button
                            onClick={() => setModalEmpresasOpen(false)}
                            className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none">
                            ✕
                        </button>
                    </div>
                    <div className="overflow-auto max-h-[60vh]">
                        <table className="w-full text-sm">
                            <thead className="border-b text-left text-gray-600 sticky top-0 bg-white">
                            <tr>
                                <th className="py-2 pr-4">Nombre</th>
                                <th className="pr-4">Correo</th>
                                <th className="pr-4">Teléfono</th>
                                <th className="pr-4">Localización</th>
                                <th>Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {empresas.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-400 py-6">
                                        No hay empresas registradas
                                    </td>
                                </tr>
                            ) : (
                                empresas.map(e => (
                                    <tr key={e.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="py-3 pr-4 font-semibold text-gray-800">{e.nombre}</td>
                                        <td className="pr-4 text-gray-600">{e.correo}</td>
                                        <td className="pr-4 text-gray-600">{e.telefono}</td>
                                        <td className="pr-4 text-gray-600">{e.localizacion}</td>
                                        <td>
                                            {e.aprobada ? (
                                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">✓ Aprobada</span>
                                            ) : (
                                                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold">⏳ Pendiente</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                    <button
                        onClick={() => setModalEmpresasOpen(false)}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Cerrar
                    </button>
                </div>
            </div>

            {/* Estadísticas */}
            <h2 className="text-xl font-bold text-gray-800 mb-6 mt-6">Estadísticas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                {cards.map((card, i) => (
                    <div key={i} className={`bg-gradient-to-br ${card.gradient} rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-6 text-white`}>
                        <div className="flex flex-col h-full justify-between">
                            <p className="text-white text-opacity-90 text-sm font-medium">{card.label}</p>
                            <h2 className="text-4xl font-bold mt-2">{card.valor}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Oferentes */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
                modalOferentesOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOferentesOpen(false)} />
                <div className={`relative bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-4 transition-all duration-300 ${
                    modalOferentesOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
                }`}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-2xl text-gray-800">Lista de Oferentes</h3>
                            <p className="text-sm text-gray-500">Gestión de usuarios registrados</p>
                        </div>
                        <button
                            onClick={() => setModalOferentesOpen(false)}
                            className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none">
                            ✕
                        </button>
                    </div>
                    <div className="overflow-auto max-h-[60vh]">
                        <table className="w-full text-sm">
                            <thead className="border-b text-left text-gray-600 sticky top-0 bg-white">
                            <tr>
                                <th className="py-2 pr-4">Nombre</th>
                                <th className="pr-4">Correo</th>
                                <th className="pr-4">Teléfono</th>
                                <th className="pr-4">Residencia</th>
                                <th>Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {oferentes.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-400 py-6">
                                        No hay oferentes registrados
                                    </td>
                                </tr>
                            ) : (
                                oferentes.map(o => (
                                    <tr key={o.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="py-3 pr-4 font-semibold text-gray-800">{o.nombre} {o.apellido}</td>
                                        <td className="pr-4 text-gray-600">{o.correo}</td>
                                        <td className="pr-4 text-gray-600">{o.telefono}</td>
                                        <td className="pr-4 text-gray-600">{o.residencia}</td>
                                        <td>
                                            {o.aprobado ? (
                                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">✓ Aprobado</span>
                                            ) : (
                                                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold">⏳ Pendiente</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                    <button
                        onClick={() => setModalOferentesOpen(false)}
                        className="mt-6 w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition">
                        Cerrar
                    </button>
                </div>
            </div>
        </Layout>
    );
}