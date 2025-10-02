import React, {createContext, useRef, useState} from "react";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";

const VERIFY_URL = '/signup';

const OtpContext = createContext();

export const OtpContextProvider = ({ children }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const [resendLoading, setResendLoading] = useState(false);

    const errRef = useRef();

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otp.length === 6) {
            setLoading(true);
            console.log('Verifying OTP:', otp, 'for email:', 'email@email.com');

            setTimeout(() => {
                setLoading(false);
                // Handle successful verification (e.g., navigate to home page)
                console.log("OTP Verified! Navigating to the app...");
            }, 2000);
        } else {
            console.log('Please enter a valid 6-digit OTP.');
        }
    };

    const handleResendOtp = () => {
        setResendLoading(true);
        console.log('Resending OTP to:');

        setTimeout(() => {
            setResendLoading(false);
            setOtp(''); // Clear OTP field
            console.log("OTP successfully resent. Timer reset.");
        }, 1500);
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