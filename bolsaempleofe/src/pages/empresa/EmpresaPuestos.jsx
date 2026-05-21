import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function EmpresaPuestos() {
    const [puestos, setPuestos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const cargar = () => {
        api.get("/puestos/empresa").then(res => setPuestos(res.data));
    };

    useEffect(() => { cargar(); }, []);

    const mostrarMensaje = (msg, esError = false) => {
        if (esError) setError(msg);
        else setMensaje(msg);
        setTimeout(() => { setMensaje(""); setError(""); }, 3000);
    };

    const desactivar = async (id) => {
        if (!confirm("¿Desactivar este puesto?")) return;
        try {
            await api.put(`/puestos/${id}/desactivar`);
            mostrarMensaje("✅ Puesto desactivado");
            cargar();
        } catch {
            mostrarMensaje("❌ Error al desactivar", true);
        }
    };

    const activar = async (id) => {
        try {
            await api.put(`/puestos/${id}/activar`);
            mostrarMensaje("✅ Puesto activado");
            cargar();
        } catch {
            mostrarMensaje("❌ Error al activar", true);
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Mis Puestos</h1>
                    <p className="text-gray-500 text-sm">Gestión de ofertas de empleo</p>
                </div>
                <Link to="/empresa/puestos/nuevo"
                      className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition text-sm font-semibold">
                    + Crear Puesto
                </Link>
            </div>

            {mensaje && (
                <div className="bg-green-100 text-green-700 rounded-lg p-3 mb-6 text-sm">
                    {mensaje}
                </div>
            )}
            {error && (
                <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-6 text-sm">
                    {error}
                </div>
            )}

            {puestos.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-10 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No hay puestos publicados
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                        Empezá creando tu primera oferta de empleo
                    </p>
                    <Link to="/empresa/puestos/nuevo"
                          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-semibold">
                        Crear Puesto
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-600">
                            <th className="px-5 py-3 font-semibold">Título</th>
                            <th className="px-5 py-3 font-semibold">Salario</th>
                            <th className="px-5 py-3 font-semibold">Tipo</th>
                            <th className="px-5 py-3 font-semibold">Estado</th>
                            <th className="px-5 py-3 font-semibold">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {puestos.map(puesto => (
                            <tr key={puesto.id}
                                className="border-b border-gray-100 hover:bg-gray-50 transition">

                                <td className="px-5 py-4 font-medium text-gray-800">
                                    {puesto.titulo}
                                    <p className="text-xs text-gray-400 font-normal">
                                        {puesto.descripcion?.substring(0, 50)}...
                                    </p>
                                </td>

                                <td className="px-5 py-4 text-gray-700">
                                    {puesto.salario
                                        ? `₡ ${puesto.salario.toLocaleString()}`
                                        : <span className="text-gray-400">—</span>
                                    }
                                </td>

                                <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        puesto.tipoPublicacion === "PUBLICO"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                    }`}>
                      {puesto.tipoPublicacion === "PUBLICO" ? "🌐 Público" : "🔒 Privado"}
                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    {puesto.activo ? (
                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        ✓ Activo
                      </span>
                                    ) : (
                                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        ✕ Inactivo
                      </span>
                                    )}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex gap-2">
                                        {puesto.activo ? (
                                            <button
                                                onClick={() => desactivar(puesto.id)}
                                                className="px-3 py-1 rounded text-xs font-semibold border border-red-400 text-red-600 hover:bg-red-50 transition"
                                            >
                                                Desactivar
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => activar(puesto.id)}
                                                className="px-3 py-1 rounded text-xs font-semibold border border-green-500 text-green-600 hover:bg-green-50 transition"
                                            >
                                                Activar
                                            </button>
                                        )}
                                        <Link
                                            to={`/empresa/candidatos/${puesto.id}`}
                                            className="px-3 py-1 rounded text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white transition"
                                        >
                                            Candidatos
                                        </Link>
                                    </div>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Layout>
    );
}