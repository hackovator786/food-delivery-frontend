import { createContext, useState } from "react";
import {toast} from "react-toastify";
import axios from "../api/axios.js";
const AuthContext = createContext({});

const LOGIN_URL = '/auth/login/send-otp';
const SIGNUP_URL = '/auth/signup/send-otp';
const LOGIN_VERIFY_URL = '/auth/login/verify-otp'
const SIGNUP_VERIFY_URL = '/auth/signup/verify-otp';
const LOGIN_RESEND_URL = '/auth/login/resend-otp';
const SIGNUP_RESEND_URL = '/auth/signup/resend-otp';

export const AuthProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [auth, setAuth] = useState({});
    const [forLogin, setForLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            toast.error("Invalid email!");
            return;
        }
        if(!forLogin){
            if(!fullName) {
                toast.error("Invalid full name!");
                return;
            }
        }
        setLoading(true);
        try {
            const response = await axios.post(forLogin ? LOGIN_URL : SIGNUP_URL,
                JSON.stringify({email, "role": "customer"}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setOtpSent(true);
            toast.success("Verification code sent successfully");
        } catch (err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        let content = {role: "customer"};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            toast.error("Invalid email!");
            return;
        }
        content.email = email;
        if(!forLogin){
            if(!fullName) {
                toast.error("Invalid full name!");
                return;
            }
            content.name = fullName;
        }
        if(!otp || otp.length !== 6){
            toast.error("Invalid OTP\nPlease enter valid OTP");
            return;
        }
        content.otp = otp;

        setLoading(true);
        try {
            const response = await axios.post(forLogin ? LOGIN_VERIFY_URL : SIGNUP_VERIFY_URL,
                JSON.stringify(content),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data?.accessToken);
            toast.success("Email verified successfully!");
            setAuth({accessToken: response?.data?.accessToken});
            setFullName('');
            setEmail('');
            setOtp('');
            content.email = '';
            content.name = '';
            content.role = '';
            content.otp = '';
            setForLogin(true);
            setOtpSent(false);
            setModalOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ modalOpen, setModalOpen, fullName, setFullName,
            email, setEmail, otp, setOtp, auth, setAuth, forLogin, setForLogin, loading,
            setLoading, otpSent, setOtpSent, handleSendOtp, handleVerifyOtp
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;