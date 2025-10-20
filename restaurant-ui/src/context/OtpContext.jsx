import React, {createContext, useContext, useRef, useState} from "react";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import useAuth from "../hooks/useAuth";
import SignUpContext from "./SignUpContext.jsx";
import AuthContext from "./AuthProvider.jsx";

const LOGIN_VERIFY_URL = '/auth/login/verify-otp'
const SIGNUP_VERIFY_URL = '/auth/signup/verify-otp';
const LOGIN_RESEND_URL = '/auth/login/resend-otp';
const SIGNUP_RESEND_URL = '/auth/signup/resend-otp';

const OtpContext = createContext();

export const OtpContextProvider = ({ children }) => {
    const { setAuth } = useAuth();
    const {fullName, setFullName} = useContext(SignUpContext);
    const {email, setEmail} = useContext(AuthContext);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const authContext = JSON.parse(sessionStorage.getItem('authContext'));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errRef = useRef();

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if(!authContext || (authContext !== 'login' && authContext !== 'signUp') || (authContext === 'signUp' && !fullName) || !emailRegex.test(email)) {
            toast.error("Can't verify otp");
            return;
        }
        if(!otp || otp.length !== 6){
            toast.error("Invalid OTP\nPlease enter valid OTP");
            return;
        }
        const URL = authContext === 'signUp' ? SIGNUP_VERIFY_URL : LOGIN_VERIFY_URL;
        const content = {email, otp};

        if(authContext === 'signUp'){
            content.name = fullName;
            content.role = "restaurant_owner";
        }
        setLoading(true);
        try {
            console.log('URL: ' + URL);
            console.log(content);
            const response = await axios.post(URL,
                JSON.stringify(content),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data?.accessToken);
            toast.success("Email verified successfully!");
            sessionStorage.removeItem('authContext');
            navigate('/home');
            setAuth({accessToken: response?.data?.accessToken});
            setFullName('');
            setEmail('');
            setOtp('');
            content.email = '';
            content.name = '';
            content.role = '';
            content.otp = '';
        } catch (err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if(!authContext || (authContext !== 'login' && authContext !== 'signUp') || !email || !emailRegex.test(email)) {
            toast.error("Can't resend otp");
            return;
        }
        console.log(authContext);
        const URL = authContext === 'signUp' ? SIGNUP_RESEND_URL : LOGIN_RESEND_URL;
        setResendLoading(true);
        try {
            console.log('URL: ' + URL);
            const response = await axios.post(URL,
                JSON.stringify({email}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            toast.success("Verification code resent successfully");
        } catch (err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setResendLoading(false);
        }
    };

    const formatTimer = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <OtpContext.Provider value={{ otp, setOtp, loading, setLoading, navigate,
            resendLoading, setResendLoading, errMsg, setErrMsg, errRef, handleVerifyOtp, handleResendOtp,
            formatTimer }}>
            {children}
        </OtpContext.Provider>
    )
}

export default OtpContext;