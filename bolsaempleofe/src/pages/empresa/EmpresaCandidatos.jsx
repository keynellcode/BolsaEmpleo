import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function EmpresaCandidatos() {
    const { puestoId } = useParams();
    const [candidatos, setCandidatos] = useState([]);
    const [selectedOferente, setSelectedOferente] = useState(null);
    const [habilidades, setHabilidades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [curriculum, setCurriculum] = useState(null);

    useEffect(() => {
        api.get("/puestos/" + puestoId + "/candidatos")
            .then(res => setCandidatos(res.data))
            .finally(() => setCargando(false));
    }, [puestoId]);

    const verPerfil = async (oferente) => {
        setSelectedOferente(oferente);
        setCurriculum(null);
        try {
            const habRes = await api.get("/oferentes/" + oferente.id + "/habilidades");
            setHabilidades(habRes.data);
        } catch {
            setHabilidades([]);
        }
        try {
            const cvRes = await api.get("/curriculum/oferente/" + oferente.id);
            setCurriculum(cvRes.data);
        } catch {
            setCurriculum(null);
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">

                <Link to="/empresa/puestos"
                      className="text-sm text-blue-500 hover:underline mb-4 inline-block">
                    ← Volver a mis puestos
                </Link>

                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">Candidatos</h1>
                    <p className="text-gray-500 text-sm">
                        Oferentes que coinciden con los requisitos del puesto
                    </p>
                </div>

                {cargando ? (
                    <p className="text-gray-400 text-center py-10">Cargando...</p>
                ) : candidatos.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-10 text-center text-gray-400">
                        No hay candidatos que coincidan con este puesto.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {candidatos.map(c => (
                            <div key={c.id}
                                 className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {c.nombre} {c.apellido}
                                        </p>
                                        <p className="text-sm text-gray-500">{c.correo}</p>
                                    </div>
                                    <button
                                        onClick={() => verPerfil(c)}
                                        className="text-sm text-blue-500 hover:underline font-semibold"
                                    >
                                        Ver perfil →
                                    </button>
                                </div>
                                <div className="mt-3 text-sm text-gray-600 grid md:grid-cols-3 gap-2">
                                    <span>📞 {c.telefono}</span>
                                    <span>📍 {c.residencia}</span>
                                    <span>🪪 {c.identificacion}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal perfil */}
            <div className={"fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 " +
                (selectedOferente ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>

                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                     onClick={() => setSelectedOferente(null)} />

                <div className={"relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transition-all duration-300 " +
                    (selectedOferente ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4")}>

                    {selectedOferente && (
                        <>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {selectedOferente.nombre} {selectedOferente.apellido}
                                    </h3>
                                    <p className="text-sm text-gray-500">{selectedOferente.correo}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedOferente(null)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold ml-4"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-500 text-xs">Teléfono</p>
                                    <p className="font-semibold">{selectedOferente.telefono}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-500 text-xs">Residencia</p>
                                    <p className="font-semibold">{selectedOferente.residencia}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-500 text-xs">Identificación</p>
                                    <p className="font-semibold">{selectedOferente.identificacion}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-500 text-xs">Nacionalidad</p>
                                    <p className="font-semibold">{selectedOferente.nacionalidad}</p>
                                </div>
                            </div>

                            {habilidades.length > 0 && (
                                <>
                                    <p className="font-semibold text-sm text-gray-700 mb-2">Habilidades:</p>
                                    <ul className="space-y-1 max-h-40 overflow-y-auto">
                                        {habilidades.map((h, i) => (
                                            <li key={i}
                                                className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 text-sm">
                                                <span className="text-gray-700">{h.caracteristica?.nombre}</span>
                                                <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-xs">
                                                    Nivel {h.nivel}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* CV */}
                            <div className="mt-4">
                                <p className="font-semibold text-sm text-gray-700 mb-2">Currículum Vitae:</p>
                                {curriculum ? (
                                    <button
                                        onClick={async () => {
                                            const res = await api.get(
                                                "/curriculum/descargar/" + curriculum.archivo,
                                                { responseType: "blob" }
                                            );
                                            const url = window.URL.createObjectURL(new Blob([res.data]));
                                            const link = document.createElement("a");
                                            link.href = url;
                                            link.setAttribute("download", curriculum.archivo);
                                            document.body.appendChild(link);
                                            link.click();
                                            link.remove();
                                        }}
                                        className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 hover:bg-blue-100 transition w-full"
                                    >
                                        <div className="flex items-center gap-2 text-sm text-blue-700">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                            {curriculum.archivo}
                                        </div>
                                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                            ⬇ Descargar
                                        </span>
                                    </button>
                                ) : (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-400 text-center">
                                        Este candidato no ha subido su CV
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setSelectedOferente(null)}
                                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
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