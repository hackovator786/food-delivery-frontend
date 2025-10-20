import {createContext, useContext, useRef, useState} from "react";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import AuthContext from "./AuthProvider.jsx";

const SIGNUP_URL = '/auth/signup/send-otp';

const SignUpContext = createContext();

export const SignUpContextProvider = ({ children }) => {
    const {email} = useContext(AuthContext);
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const errRef = useRef();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            toast.error("Invalid email!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({email}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/verify-otp');
            toast.success("Verification code sent successfully");
            sessionStorage.setItem('authContext', JSON.stringify('signUp'));
        } catch (err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SignUpContext.Provider value={{ fullName, setFullName,
        loading, setLoading, errMsg, setErrMsg, errRef, handleSendOtp }}>
        {children}
        </SignUpContext.Provider>
    )
}

export default SignUpContext;