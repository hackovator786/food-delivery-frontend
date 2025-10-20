import {createContext, useState, useRef, useContext} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import {toast} from "react-toastify";
import AuthContext from "./AuthProvider.jsx";

const LOGIN_URL = '/auth/login/send-otp';

const LoginContext = createContext({});

export const LoginContextProvider = ({ children }) => {
    const {email} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [errMsg, setErrMsg] = useState('');

    const userRef = useRef();
    const errRef = useRef();

    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            toast.error("Invalid email!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({email}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/verify-otp');
            toast.success("Verification code sent successfully");
            sessionStorage.setItem('authContext', JSON.stringify('login'));
        } catch (err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <LoginContext.Provider value={
            {
                navigate, location, from, errMsg, setErrMsg, userRef, errRef, loading, setLoading, handleSendOtp
            }
        }>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;