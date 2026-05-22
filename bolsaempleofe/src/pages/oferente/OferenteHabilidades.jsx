import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function OferenteHabilidades() {
    const { auth } = useAuth();
    const [habilidades, setHabilidades] = useState([]);
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [expandidas, setExpandidas] = useState([]);
    const [nuevaHabilidad, setNuevaHabilidad] = useState({ caracteristicaId: "", nivel: 1 });
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const cargarHabilidades = () => {
        api.get("/oferentes/habilidades").then(res => setHabilidades(res.data));
    };

    useEffect(() => {
        cargarHabilidades();
        api.get("/caracteristicas").then(res => setCaracteristicas(res.data));
    }, []);

    const toggleExpandida = (id) => {
        setExpandidas(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const agregar = async () => {
        if (!nuevaHabilidad.caracteristicaId) {
            setError("❌ Seleccioná una característica.");
            return;
        }
        try {
            const yaExiste = habilidades.some(
                h => h.caracteristica?.id === parseInt(nuevaHabilidad.caracteristicaId)
            );
            if (yaExiste) {
                setError("❌ Ya tenés esta habilidad registrada.");
                return;
            }
            const nuevas = [
                ...habilidades.map(h => ({
                    caracteristicaId: h.caracteristica?.id,
                    nivel: h.nivel
                })),
                {
                    caracteristicaId: parseInt(nuevaHabilidad.caracteristicaId),
                    nivel: parseInt(nuevaHabilidad.nivel)
                }
            ];
            await api.put("/oferentes/habilidades", nuevas);
            setMensaje("✅ Habilidad agregada correctamente.");
            setError("");
            setNuevaHabilidad({ caracteristicaId: "", nivel: 1 });
            cargarHabilidades();
            setTimeout(() => setMensaje(""), 3000);
        } catch {
            setError("❌ Error al agregar la habilidad.");
        }
    };

    const eliminar = async (caracteristicaId) => {
        try {
            const nuevas = habilidades
                .filter(h => h.caracteristica?.id !== caracteristicaId)
                .map(h => ({
                    caracteristicaId: h.caracteristica?.id,
                    nivel: h.nivel
                }));
            await api.put("/oferentes/habilidades", nuevas);
            setMensaje("✅ Habilidad eliminada.");
            cargarHabilidades();
            setTimeout(() => setMensaje(""), 3000);
        } catch {
            setError("❌ Error al eliminar la habilidad.");
        }
    };

    const nivelLabel = (n) => {
        const labels = { 1: "Básico", 2: "Intermedio", 3: "Avanzado", 4: "Experto", 5: "Maestría" };
        return labels[n] || n;
    };

    const renderCaracteristicas = (lista) => (
        <ul className="space-y-1">
            {lista.map(c => {
                const tieneHijos = c.subCaracteristicas?.length > 0;
                const estaExpandida = expandidas.includes(c.id);
                return (
                    <li key={c.id}>
                        <div className="flex items-center justify-between py-1">
                            <span className="text-sm font-semibold text-gray-700">{c.nombre}</span>
                            {tieneHijos ? (
                                <button
                                    onClick={() => toggleExpandida(c.id)}
                                    className="text-gray-400 hover:text-blue-600 transition-transform duration-200"
                                    style={{ transform: estaExpandida ? "rotate(180deg)" : "rotate(0deg)" }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setNuevaHabilidad({ ...nuevaHabilidad, caracteristicaId: c.id })}
                                    className={"text-xs px-2 py-0.5 rounded-full font-semibold transition " +
                                        (nuevaHabilidad.caracteristicaId === c.id
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-blue-100")}
                                >
                                    Seleccionar
                                </button>
                            )}
                        </div>

                        {tieneHijos && (
                            <div
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    maxHeight: estaExpandida ? c.subCaracteristicas.length * 40 + "px" : "0px",
                                    opacity: estaExpandida ? 1 : 0
                                }}
                            >
                                <ul className="ml-4 border-l-2 border-gray-200 pl-3 space-y-1 py-1">
                                    {c.subCaracteristicas.map(sub => (
                                        <li key={sub.id} className="flex items-center justify-between py-1">
                                            <span className="text-sm text-gray-600">{sub.nombre}</span>
                                            <button
                                                onClick={() => setNuevaHabilidad({ ...nuevaHabilidad, caracteristicaId: sub.id })}
                                                className={"text-xs px-2 py-0.5 rounded-full font-semibold transition " +
                                                    (nuevaHabilidad.caracteristicaId === sub.id
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-gray-100 text-gray-600 hover:bg-blue-100")}
                                            >
                                                Seleccionar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Mis Habilidades</h1>
                    <p className="text-gray-500 text-sm">Gestioná tus destrezas y niveles</p>
                </div>
                <Link to="/oferente/dashboard"
                      className="text-sm text-blue-500 hover:underline">
                    ← Volver al dashboard
                </Link>
            </div>

            {mensaje && (
                <div className="bg-green-100 text-green-700 rounded-lg p-3 mb-6 text-sm">{mensaje}</div>
            )}
            {error && (
                <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-6 text-sm">{error}</div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Habilidades actuales */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="font-bold text-gray-800 mb-4">Habilidades registradas</h2>
                    {habilidades.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-4">
                            Sin habilidades registradas
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {habilidades.map((h, i) => (
                                <li key={i}
                                    className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {h.caracteristica?.nombre}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {nivelLabel(h.nivel)} (nivel {h.nivel})
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="bg-blue-500 h-1.5 rounded-full"
                                                style={{ width: (h.nivel * 20) + "%" }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => eliminar(h.caracteristica?.id)}
                                            className="text-red-400 hover:text-red-600 text-xs font-bold"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Árbol de características */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="font-bold text-gray-800 mb-4">Seleccionar característica</h2>
                    {caracteristicas.length === 0 ? (
                        <p className="text-gray-400 text-sm">Cargando...</p>
                    ) : (
                        renderCaracteristicas(caracteristicas)
                    )}
                </div>

                {/* Agregar */}
                <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                    <h2 className="font-bold text-gray-800 mb-4">Agregar habilidad</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Característica seleccionada
                        </label>
                        <div className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700 min-h-9">
                            {nuevaHabilidad.caracteristicaId ? (
                                (() => {
                                    const todas = caracteristicas.flatMap(c => [c, ...(c.subCaracteristicas || [])]);
                                    const found = todas.find(c => c.id === nuevaHabilidad.caracteristicaId);
                                    return found?.nombre || "—";
                                })()
                            ) : (
                                <span className="text-gray-400">Seleccioná del árbol</span>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Nivel (1-5)
                        </label>
                        <select
                            value={nuevaHabilidad.nivel}
                            onChange={e => setNuevaHabilidad({ ...nuevaHabilidad, nivel: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value="1">1 — Básico</option>
                            <option value="2">2 — Intermedio</option>
                            <option value="3">3 — Avanzado</option>
                            <option value="4">4 — Experto</option>
                            <option value="5">5 — Maestría</option>
                        </select>
                    </div>

                    <button
                        onClick={agregar}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                    >
                        Agregar habilidad
                    </button>
                </div>

            </div>
        </Layout>
    );
}