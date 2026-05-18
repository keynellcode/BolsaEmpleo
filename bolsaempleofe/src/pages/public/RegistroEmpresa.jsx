import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";

export default function RegistroEmpresa() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "", localizacion: "", correo: "",
        telefono: "", descripcion: "", clave: ""
    });
    const [error, setError] = useState("");
    const [exito, setExito] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        if (!form.nombre || !form.correo || !form.clave) {
            setError("❌ Nombre, correo y contraseña son obligatorios.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(form.correo)) {
            setError("❌ Ingresá un correo válido.");
            return;
        }
        if (form.clave.length < 4) {
            setError("❌ La contraseña debe tener al menos 4 caracteres.");
            return;
        }
        try {
            await api.post("/empresas/registro", form);
            setExito(true);
        } catch (err) {
            setError("Error al registrar. Verificá los datos.");
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-center py-10">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">

                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Registro de Empresa</h1>

                    {exito && (
                        <div className="bg-green-100 text-green-700 rounded-lg p-4 mb-4 text-sm text-center">
                            ✅ Registro exitoso. Un administrador debe aprobar tu cuenta antes de que puedas ingresar.
                            <br/>
                            <button
                                onClick={() => window.history.back()}
                                className="mt-2 underline font-semibold"
                            >
                                Volver
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-4 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {[
                        { label: "Nombre", name: "nombre", type: "text" },
                        { label: "Localización", name: "localizacion", type: "text" },
                        { label: "Correo", name: "correo", type: "email" },
                        { label: "Teléfono", name: "telefono", type: "text" },
                        { label: "Contraseña", name: "clave", type: "password" },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Registrarse
                    </button>

                </div>
            </div>
        </Layout>
    );
}