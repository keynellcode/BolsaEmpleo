import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function AdminOferentes() {
    const [oferentes, setOferentes] = useState([]);

    useEffect(() => {
        api.get("/admin/oferentes").then(res => setOferentes(res.data));
    }, []);

    return (
        <Layout>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Lista de Oferentes</h1>
                <p className="text-gray-500">Gestión de usuarios registrados</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="border-b text-left text-gray-600">
                    <tr>
                        <th className="py-2">Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Residencia</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {oferentes.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center text-gray-400 py-6">
                                No hay oferentes registrados
                            </td>
                        </tr>
                    ) : (
                        oferentes.map(o => (
                            <tr key={o.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="py-3 font-semibold text-gray-800">
                                    {o.nombre} {o.apellido}
                                </td>
                                <td className="text-gray-600">{o.correo}</td>
                                <td className="text-gray-600">{o.telefono}</td>
                                <td className="text-gray-600">{o.residencia}</td>
                                <td>
                                    {o.aprobado ? (
                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        ✓ Aprobado
                      </span>
                                    ) : (
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        ⏳ Pendiente
                      </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}