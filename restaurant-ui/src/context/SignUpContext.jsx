import {createContext, useState} from "react";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";
import useInput from "../hooks/useInput.js";

const REGISTER_URL = '/signup';

const SignUpContext = createContext();

export const SignUpContextProvider = ({ children }) => {
    const [email, resetEmail, emailAttribs] = useInput('email', '');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSendOtp = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setLoading(true);
            console.log('Sending OTP for login to:', email);
            setTimeout(() => {
                setLoading(false);
                navigate('/verify-otp');
            }, 2000);
        } else {
            console.log('Please enter a valid email address.');
        }
    };

    return (
        <SignUpContext.Provider value={{ email, resetEmail, emailAttribs,
        loading, setLoading,handleSendOtp }}>
        {children}
        </SignUpContext.Provider>
    )
}

export default SignUpContext;