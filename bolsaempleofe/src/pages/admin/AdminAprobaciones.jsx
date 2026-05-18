import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function AdminAprobaciones() {
    const [empresas, setEmpresas] = useState([]);
    const [oferentes, setOferentes] = useState([]);
    const [mensaje, setMensaje] = useState("");

    const cargarDatos = () => {
        Promise.all([
            api.get("/admin/empresas/pendientes"),
            api.get("/admin/oferentes/pendientes"),
        ]).then(([eRes, oRes]) => {
            setEmpresas(eRes.data);
            setOferentes(oRes.data);
        }).catch(err => console.error(err));
    };

    useEffect(() => { cargarDatos(); }, []);

    const aprobarEmpresa = async (id) => {
        await api.put(`/admin/empresas/${id}/aprobar`);
        setMensaje("✅ Empresa aprobada");
        cargarDatos();
        setTimeout(() => setMensaje(""), 3000);
    };

    const aprobarOferente = async (id) => {
        await api.put(`/admin/oferentes/${id}/aprobar`);
        setMensaje("✅ Oferente aprobado");
        cargarDatos();
        setTimeout(() => setMensaje(""), 3000);
    };

    return (
        <Layout>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Aprobaciones</h1>
                <p className="text-gray-500">Gestión de usuarios pendientes</p>
            </div>

            {mensaje && (
                <div className="bg-green-100 text-green-700 rounded-lg p-3 mb-6 text-center font-semibold">
                    {mensaje}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">

                {/* Empresas */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                        Empresas pendientes
                        {empresas.length > 0 && (
                            <span className="ml-2 bg-blue-100 text-blue-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                {empresas.length}
              </span>
                        )}
                    </h2>

                    {empresas.length === 0 ? (
                        <p className="text-gray-400 text-sm">Sin empresas pendientes 🎉</p>
                    ) : (
                        empresas.map(e => (
                            <div key={e.id}
                                 className="border-b py-4 flex justify-between items-center last:border-0">
                                <div>
                                    <p className="font-semibold text-gray-800">{e.nombre}</p>
                                    <p className="text-sm text-gray-500">{e.correo}</p>
                                    <p className="text-xs text-gray-400">{e.localizacion}</p>
                                </div>
                                <button
                                    onClick={() => aprobarEmpresa(e.id)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
                                >
                                    ✔ Aprobar
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Oferentes */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                        Oferentes pendientes
                        {oferentes.length > 0 && (
                            <span className="ml-2 bg-blue-100 text-blue-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                {oferentes.length}
              </span>
                        )}
                    </h2>

                    {oferentes.length === 0 ? (
                        <p className="text-gray-400 text-sm">Sin oferentes pendientes 🎉</p>
                    ) : (
                        oferentes.map(o => (
                            <div key={o.id}
                                 className="border-b py-4 flex justify-between items-center last:border-0">
                                <div>
                                    <p className="font-semibold text-gray-800">{o.nombre} {o.apellido}</p>
                                    <p className="text-sm text-gray-500">{o.correo}</p>
                                    <p className="text-xs text-gray-400">{o.residencia}</p>
                                </div>
                                <button
                                    onClick={() => aprobarOferente(o.id)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
                                >
                                    ✔ Aprobar
                                </button>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </Layout>
    );
}