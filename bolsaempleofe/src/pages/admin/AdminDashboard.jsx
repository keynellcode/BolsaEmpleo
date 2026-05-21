import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        empresasPendientes: 0,
        oferentesPendientes: 0,
        totalEmpresas: 0,
        totalOferentes: 0,
    });

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

    const cards = [
        { label: "Empresas pendientes", valor: stats.empresasPendientes, color: "text-blue-600" },
        { label: "Oferentes pendientes", valor: stats.oferentesPendientes, color: "text-blue-600" },
        { label: "Total empresas", valor: stats.totalEmpresas, color: "text-gray-800" },
        { label: "Total oferentes", valor: stats.totalOferentes, color: "text-gray-800" },
    ];

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
                <p className="text-gray-500 text-sm">Resumen general del sistema</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                        <p className="text-gray-500 text-sm">{card.label}</p>
                        <h2 className={`text-3xl font-bold mt-1 ${card.color}`}>{card.valor}</h2>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Accesos rápidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/admin/aprobaciones"
                          className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition text-center font-semibold">
                        ✅ Aprobar usuarios
                    </Link>
                    <Link to="/admin/caracteristicas"
                          className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition text-center font-semibold">
                        🏷️ Gestionar características
                    </Link>
                    <Link to="/admin/empresas"
                          className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition text-center font-semibold">
                        🏢 Ver empresas
                    </Link>
                    <Link to="/admin/oferentes"
                          className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition text-center font-semibold">
                        👤 Ver oferentes
                    </Link>
                </div>
            </div>
        </Layout>
    );
}