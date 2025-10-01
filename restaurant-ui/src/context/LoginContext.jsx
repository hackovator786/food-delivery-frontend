import {createContext, useState, useRef} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';

const LOGIN_URL = '/login';

const LoginContext = createContext({});

export const LoginContextProvider = ({ children }) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, resetEmail, emailAttribs] = useInput('email', '');
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
        <LoginContext.Provider value={
            {
                navigate, location, from, userRef, errRef, email, resetEmail, emailAttribs, loading, setLoading, handleSendOtp
            }
        }>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;