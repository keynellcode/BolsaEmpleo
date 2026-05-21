import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function AdminEmpresas() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        api.get("/admin/empresas").then(res => setEmpresas(res.data));
    }, []);

    return (
        <Layout>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Lista de Empresas</h1>
                <p className="text-gray-500">Gestión de empresas registradas</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="border-b text-left text-gray-600">
                    <tr>
                        <th className="py-2">Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Localización</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {empresas.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center text-gray-400 py-6">
                                No hay empresas registradas
                            </td>
                        </tr>
                    ) : (
                        empresas.map(e => (
                            <tr key={e.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="py-3 font-semibold text-gray-800">{e.nombre}</td>
                                <td className="text-gray-600">{e.correo}</td>
                                <td className="text-gray-600">{e.telefono}</td>
                                <td className="text-gray-600">{e.localizacion}</td>
                                <td>
                                    {e.aprobada ? (
                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        ✓ Aprobada
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