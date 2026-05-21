import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function EmpresaCrearPuesto() {
    const navigate = useNavigate();
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        salario: "",
        tipoPublicacion: "",
    });
    const [requisitos, setRequisitos] = useState([
        { caracteristicaId: "", nivel: "" }
    ]);

    useEffect(() => {
        api.get("/caracteristicas").then(res => {
            // Aplanar árbol para el select
            const planas = [];
            res.data.forEach(c => {
                planas.push(c);
                c.subCaracteristicas?.forEach(sub => planas.push(sub));
            });
            setCaracteristicas(planas);
        });
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRequisito = (index, field, value) => {
        const nuevos = [...requisitos];
        nuevos[index][field] = value;
        setRequisitos(nuevos);
    };

    const agregarRequisito = () => {
        setRequisitos([...requisitos, { caracteristicaId: "", nivel: "" }]);
    };

    const eliminarRequisito = (index) => {
        if (requisitos.length === 1) return;
        setRequisitos(requisitos.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setError("");

        if (!form.titulo || !form.descripcion || !form.tipoPublicacion) {
            setError("❌ Título, descripción y tipo de publicación son obligatorios.");
            return;
        }

        const requisitosValidos = requisitos.filter(r => r.caracteristicaId && r.nivel);
        if (requisitosValidos.length === 0) {
            setError("❌ Agregá al menos una característica requerida.");
            return;
        }

        try {
            await api.post("/puestos", {
                ...form,
                salario: form.salario ? parseFloat(form.salario) : null,
                requisitos: requisitosValidos.map(r => ({
                    caracteristicaId: parseInt(r.caracteristicaId),
                    nivel: parseInt(r.nivel)
                }))
            });
            navigate("/empresa/puestos");
        } catch (err) {
            setError("❌ Error al crear el puesto. Intentá de nuevo.");
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Crear Nuevo Puesto</h2>
                    <p className="text-gray-600">Completá el formulario para publicar una nueva oferta de empleo</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">

                    {error && (
                        <div className="bg-red-100 text-red-700 rounded-lg p-3 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Título */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Título del Puesto *
                        </label>
                        <input
                            type="text"
                            name="titulo"
                            value={form.titulo}
                            onChange={handleChange}
                            placeholder="Ej: Desarrollador Senior Java"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Descripción *
                        </label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Descripción detallada del puesto, responsabilidades, requisitos..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    {/* Salario */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Salario (₡)
                        </label>
                        <input
                            type="number"
                            name="salario"
                            value={form.salario}
                            onChange={handleChange}
                            min="0"
                            placeholder="Ej: 1200000"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    {/* Tipo publicación */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tipo de Publicación *
                        </label>
                        <select
                            name="tipoPublicacion"
                            value={form.tipoPublicacion}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        >
                            <option value="">Seleccionar...</option>
                            <option value="PUBLICO">Público</option>
                            <option value="PRIVADO">Privado</option>
                        </select>
                    </div>

                    {/* Características */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            Características Requeridas
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Seleccioná las habilidades y el nivel requerido
                        </p>

                        <div className="space-y-3">
                            {requisitos.map((req, i) => (
                                <div key={i}
                                     className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Característica
                                        </label>
                                        <select
                                            value={req.caracteristicaId}
                                            onChange={e => handleRequisito(i, "caracteristicaId", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                                        >
                                            <option value="">Seleccionar...</option>
                                            {caracteristicas.map(c => (
                                                <option key={c.id} value={c.id}>{c.nombre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nivel Requerido
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={req.nivel}
                                                onChange={e => handleRequisito(i, "nivel", e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                                            >
                                                <option value="">Seleccionar...</option>
                                                <option value="1">Básico (1)</option>
                                                <option value="2">Intermedio (2)</option>
                                                <option value="3">Avanzado (3)</option>
                                                <option value="4">Experto (4)</option>
                                                <option value="5">Maestría (5)</option>
                                            </select>
                                            {requisitos.length > 1 && (
                                                <button
                                                    onClick={() => eliminarRequisito(i)}
                                                    className="text-red-400 hover:text-red-600 font-bold text-lg px-2"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={agregarRequisito}
                            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold flex items-center gap-2 text-sm"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            Agregar otra característica
                        </button>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between pt-6 border-t border-gray-200">
                        <Link
                            to="/empresa/puestos"
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </Link>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Publicar Puesto
                        </button>
                    </div>

                </div>
            </div>
        </Layout>
    );
}