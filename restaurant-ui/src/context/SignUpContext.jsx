import {createContext, useRef, useState} from "react";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";
import useInput from "../hooks/useInput.js";
import {toast} from "react-toastify";

const REGISTER_URL = '/signup';

const SignUpContext = createContext();

export const SignUpContextProvider = ({ children }) => {
    const [fullName, setFullName] = useState("");
    const [email, resetEmail, emailAttribs] = useInput('email', '');
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
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
        navigate('/verify-otp');
    };

    return (
        <SignUpContext.Provider value={{ fullName, setFullName, email, resetEmail, emailAttribs,
        loading, setLoading, errMsg, setErrMsg, errRef, handleSendOtp }}>
        {children}
        </SignUpContext.Provider>
    )
}

export default SignUpContext;