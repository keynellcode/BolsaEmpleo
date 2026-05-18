import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function Buscar() {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [buscado, setBuscado] = useState(false);
    const [expandidas, setExpandidas] = useState([]);

    useEffect(() => {
        api.get("/caracteristicas").then(res => setCaracteristicas(res.data));
    }, []);

    const toggleExpandida = (id) => {
        setExpandidas(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const toggleCaracteristica = (c) => {
        const tieneHijos = c.subCaracteristicas?.length > 0;

        if (tieneHijos) {
            const hijosIds = c.subCaracteristicas.map(h => h.id);
            const todosSeleccionados = hijosIds.every(id => seleccionadas.includes(id));
            if (todosSeleccionados) {
                setSeleccionadas(prev => prev.filter(id => !hijosIds.includes(id)));
            } else {
                setSeleccionadas(prev => [...new Set([...prev, ...hijosIds])]);
            }
        } else {
            setSeleccionadas(prev =>
                prev.includes(c.id) ? prev.filter(id => id !== c.id) : [...prev, c.id]
            );
        }
    };

    const buscar = async () => {
        try {
            const res = await api.post("/puestos/buscar", {
                caracteristicaIds: seleccionadas
            });
            setResultados(res.data);
            setBuscado(true);
        } catch (err) {
            console.error(err);
        }
    };

    const limpiar = () => {
        setSeleccionadas([]);
        setResultados([]);
        setBuscado(false);
        setExpandidas([]);
    };

    const renderCaracteristicas = (lista) => (
        <ul className="space-y-2">
            {lista.map(c => {
                const tieneHijos = c.subCaracteristicas?.length > 0;
                const estaExpandida = expandidas.includes(c.id);
                const todosHijosSeleccionados = tieneHijos &&
                    c.subCaracteristicas.every(h => seleccionadas.includes(h.id));
                const algunHijoSeleccionado = tieneHijos &&
                    c.subCaracteristicas.some(h => seleccionadas.includes(h.id));

                return (
                    <li key={c.id}>
                        <div className="flex items-center justify-between gap-2 py-1">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-semibold flex-1">
                                <input
                                    type="checkbox"
                                    checked={tieneHijos ? todosHijosSeleccionados : seleccionadas.includes(c.id)}
                                    ref={el => {
                                        if (el) el.indeterminate = tieneHijos && algunHijoSeleccionado && !todosHijosSeleccionados;
                                    }}
                                    onChange={() => toggleCaracteristica(c)}
                                    className="accent-blue-600"
                                />
                                {c.nombre}
                            </label>

                            {tieneHijos && (
                                <button
                                    onClick={() => toggleExpandida(c.id)}
                                    className="text-gray-400 hover:text-blue-600 transition-transform duration-200"
                                    style={{ transform: estaExpandida ? "rotate(180deg)" : "rotate(0deg)" }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Subcaracterísticas con animación */}
                        {tieneHijos && (
                            <div
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    maxHeight: estaExpandida ? `${c.subCaracteristicas.length * 40}px` : "0px",
                                    opacity: estaExpandida ? 1 : 0
                                }}
                            >
                                <ul className="ml-6 border-l-2 border-gray-200 pl-3 space-y-1 py-1">
                                    {c.subCaracteristicas.map(sub => (
                                        <li key={sub.id}>
                                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 py-1">
                                                <input
                                                    type="checkbox"
                                                    checked={seleccionadas.includes(sub.id)}
                                                    onChange={() => toggleCaracteristica(sub)}
                                                    className="accent-blue-600"
                                                />
                                                {sub.nombre}
                                            </label>
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
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Buscar Puestos</h1>
                <p className="text-gray-600">Filtrá por características requeridas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Filtros */}
                <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                    <h2 className="font-bold text-gray-700 mb-4">Características</h2>
                    {caracteristicas.length === 0 ? (
                        <p className="text-gray-400 text-sm">Cargando...</p>
                    ) : (
                        renderCaracteristicas(caracteristicas)
                    )}

                    <div className="flex gap-2 mt-6">
                        <button
                            onClick={buscar}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Buscar
                        </button>
                        <button
                            onClick={limpiar}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Limpiar
                        </button>
                    </div>

                    {seleccionadas.length > 0 && (
                        <p className="text-xs text-blue-600 mt-2 text-center">
                            {seleccionadas.length} característica(s) seleccionada(s)
                        </p>
                    )}
                </div>

                {/* Resultados */}
                <div className="md:col-span-2">
                    <h2 className="font-bold text-gray-700 mb-4">Resultados</h2>
                    {buscado && resultados.length === 0 && (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                            No se encontraron puestos con esas características.
                        </div>
                    )}
                    {!buscado && (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-400">
                            Seleccioná características y presioná Buscar.
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resultados.map(puesto => (
                            <div key={puesto.id}
                                 className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
                                <p className="text-sm text-gray-500">{puesto.empresa?.nombre}</p>
                                <h3 className="text-lg font-bold text-gray-800">{puesto.titulo}</h3>
                                <p className="text-green-600 font-semibold">
                                    ₡ {puesto.salario?.toLocaleString()}
                                </p>
                                <p className="text-gray-600 text-sm mt-2">{puesto.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    );
}