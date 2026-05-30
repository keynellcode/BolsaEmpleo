import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function OferenteCurriculum() {
    const { auth } = useAuth();
    const [curriculum, setCurriculum] = useState(null);
    const [archivo, setArchivo] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [subiendo, setSubiendo] = useState(false);

    const cargar = () => {
        api.get("/curriculum/oferente/" + auth.id)
            .then(res => setCurriculum(res.data))
            .catch(() => setCurriculum(null));
    };

    useEffect(() => { cargar(); }, []);

    const handleSubir = async () => {
        if (!archivo) {
            setError("❌ Seleccioná un archivo PDF.");
            return;
        }
        if (archivo.type !== "application/pdf") {
            setError("❌ Solo se aceptan archivos PDF.");
            return;
        }

        setSubiendo(true);
        setError("");

        const formData = new FormData();
        formData.append("archivo", archivo);

        try {
            await api.post("/curriculum/subir", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMensaje("✅ CV subido correctamente.");
            setArchivo(null);
            cargar();
            setTimeout(() => setMensaje(""), 3000);
        } catch {
            setError("❌ Error al subir el CV.");
        } finally {
            setSubiendo(false);
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Mi CV</h1>
                    <p className="text-gray-500 text-sm">Subí o actualizá tu currículum</p>
                </div>
                <Link to="/oferente/dashboard"
                      className="text-sm text-blue-500 hover:underline">
                    ← Volver al dashboard
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

            <div className="grid md:grid-cols-2 gap-6">

                {/* Subir CV */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {curriculum ? "Actualizar CV" : "Subir CV"}
                    </h2>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Seleccioná tu CV (PDF)
                        </label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={e => setArchivo(e.target.files[0])}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {archivo && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-700 mb-4">
                            📄 {archivo.name}
                        </div>
                    )}

                    <button
                        onClick={handleSubir}
                        disabled={subiendo}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {subiendo ? "Subiendo..." : curriculum ? "Reemplazar CV" : "Subir CV"}
                    </button>
                </div>

                {/* CV actual */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">CV actual</h2>

                    {!curriculum ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm">No has subido ningún CV todavía.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <svg className="w-8 h-8 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{curriculum.archivo}</p>
                                    <p className="text-xs text-gray-400">PDF subido</p>
                                </div>
                            </div>


                            <button
                                onClick={async () => {
                                    const res = await api.get(
                                        "/curriculum/descargar/" + curriculum.archivo,
                                        { responseType: "blob" }
                                    );
                                    const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
                                    window.open(url, "_blank");
                                }}
                                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Ver PDF
                            </button>
                        </div>
                        )}
                </div>

            </div>
        </Layout>
    );
}