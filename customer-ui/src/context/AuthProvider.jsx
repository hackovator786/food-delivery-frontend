import { createContext, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ email, setEmail, auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;