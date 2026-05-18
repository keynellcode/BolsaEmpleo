import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function Home() {
    const [puestos, setPuestos] = useState([]);
    const [selectedPuesto, setSelectedPuesto] = useState(null);

    useEffect(() => {
        api.get("/puestos/publicos")
            .then(res => setPuestos(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Layout>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Bolsa de Empleo</h1>
                <p className="text-gray-600">Últimos 5 puestos públicos disponibles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {puestos.length === 0 && (
                    <p className="text-gray-500 col-span-3 text-center">
                        No hay puestos disponibles por el momento.
                    </p>
                )}

                {puestos.map(puesto => (
                    <div
                        key={puesto.id}
                        className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-6 text-white"
                    >
                        <p className="text-green-100 text-sm">{puesto.empresa?.nombre}</p>
                        <h2 className="text-xl font-bold mb-2">{puesto.titulo}</h2>
                        <p className="text-lg font-semibold mb-4">
                            ₡ {puesto.salario?.toLocaleString()}
                        </p>
                        <button
                            className="w-full bg-white text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                            onClick={() => setSelectedPuesto(puesto)}
                        >
                            Ver detalle
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
                    selectedPuesto
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Fondo gris */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setSelectedPuesto(null)}
                />

                {/* Contenido */}
                <div
                    className={`relative bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transition-all duration-300 ${
                        selectedPuesto
                            ? "scale-100 opacity-100 translate-y-0"
                            : "scale-95 opacity-0 translate-y-4"
                    }`}
                >
                    {selectedPuesto && (
                        <>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        {selectedPuesto.empresa?.nombre}
                                    </p>
                                    <h3 className="font-bold text-2xl text-gray-800">
                                        {selectedPuesto.titulo}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setSelectedPuesto(null)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold ml-4 leading-none"
                                >
                                    ✕
                                </button>
                            </div>

                            <p className="text-green-600 font-bold text-xl mb-3">
                                ₡ {selectedPuesto.salario?.toLocaleString()}
                            </p>

                            <p className="text-gray-600 text-sm mb-4">
                                {selectedPuesto.descripcion}
                            </p>

                            {selectedPuesto.requisitos?.length > 0 && (
                                <>
                                    <p className="font-semibold text-sm text-gray-700 mb-2">
                                        Requisitos:
                                    </p>
                                    <ul className="space-y-1">
                                        {selectedPuesto.requisitos.map((req, i) => (
                                            <li key={i}
                                                className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
                        <span className="text-gray-700">
                          {req.caracteristica?.nombre}
                        </span>
                                                <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full text-xs">
                          Nivel {req.nivel}
                        </span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            <button
                                onClick={() => setSelectedPuesto(null)}
                                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                Cerrar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}