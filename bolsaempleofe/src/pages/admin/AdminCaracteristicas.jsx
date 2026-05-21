import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function AdminCaracteristicas() {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [nombre, setNombre] = useState("");
    const [padreId, setPadreId] = useState("");
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");

    const cargar = () => {
        api.get("/caracteristicas").then(res => setCaracteristicas(res.data));
    };

    useEffect(() => { cargar(); }, []);

    const crear = async () => {
        if (!nombre.trim()) {
            setError("❌ El nombre es obligatorio.");
            return;
        }
        try {
            await api.post("/caracteristicas", {
                nombre,
                padreId: padreId ? parseInt(padreId) : null
            });
            setNombre("");
            setPadreId("");
            setExito("✅ Característica creada.");
            setError("");
            cargar();
            setTimeout(() => setExito(""), 3000);
        } catch {
            setError("❌ Error al crear la característica.");
        }
    };

    const todasPlanas = caracteristicas.flatMap(c => [
        c,
        ...(c.subCaracteristicas || [])
    ]);

    const renderArbol = (lista) => (
        <ul className="space-y-2">
            {lista.map(c => (
                <li key={c.id}>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                        <span className="font-semibold text-gray-800">{c.nombre}</span>
                        <span className="text-xs text-gray-400">ID: {c.id}</span>
                    </div>
                    {c.subCaracteristicas?.length > 0 && (
                        <ul className="ml-6 mt-1 border-l-2 border-gray-200 pl-3 space-y-1">
                            {c.subCaracteristicas.map(sub => (
                                <li key={sub.id}
                                    className="flex items-center justify-between bg-white rounded-lg px-3 py-1.5 text-sm">
                                    <span className="text-gray-700">{sub.nombre}</span>
                                    <span className="text-xs text-gray-400">ID: {sub.id}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <Layout>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Características</h1>
                <p className="text-gray-500">Gestión del árbol de características</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Formulario */}
                <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Nueva característica</h2>

                    {exito && (
                        <div className="bg-green-100 text-green-700 rounded-lg p-3 mb-4 text-sm">
                            {exito}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej: Java, MySQL..."
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Categoría padre (opcional)
                        </label>
                        <select
                            value={padreId}
                            onChange={e => setPadreId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Ninguna (es categoría raíz) --</option>
                            {caracteristicas.map(c => (
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={crear}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Crear característica
                    </button>
                </div>

                {/* Árbol */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Árbol actual
                        <span className="ml-2 text-sm text-gray-400 font-normal">
              ({todasPlanas.length} total)
            </span>
                    </h2>
                    {caracteristicas.length === 0 ? (
                        <p className="text-gray-400 text-sm">No hay características aún.</p>
                    ) : (
                        renderArbol(caracteristicas)
                    )}
                </div>

            </div>
        </Layout>
    );
}