import React, {createContext, useState} from "react";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";

const VERIFY_URL = '/signup';

const OtpContext = createContext();

export const OtpContextProvider = ({ children }) => {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        console.log('Verifying OTP:', otp);
    };

    return (
        <OtpContext.Provider value={{ otp, setOtp, navigate, handleVerifyOtp }}>
            {children}
        </OtpContext.Provider>
    )
}

export default OtpContext;