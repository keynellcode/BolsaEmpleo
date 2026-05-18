import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("token");
        const rol = localStorage.getItem("rol");
        const id = localStorage.getItem("id");
        const nombre = localStorage.getItem("nombre");
        return token ? { token, rol, id, nombre } : null;
    });

    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("id", data.id);
        localStorage.setItem("nombre", data.nombre);
        setAuth(data);
    };

    const logout = () => {
        localStorage.clear();
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}