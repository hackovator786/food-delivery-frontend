import { createContext, useState, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import useAuth from "../hooks/useAuth";
import '../css/login.css';
import axios from '../api/axios';
import { handleError } from "../utils/ErrorHandler";
const LOGIN_URL = '/login';

const LoginContext = createContext({});

export const LoginContextProvider = ({ children }) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribs] = useInput('email', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user || !pwd){
            setErrMsg('Missing email id or password');
            return;
        }
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ emailPhno: user, pwd: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            resetUser();
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            handleError({err, setErrMsg, errRef});
        }
    }

    return (
        <LoginContext.Provider value={
            {
                navigate, location, from, userRef, errRef, user, resetUser, userAttribs, pwd, setPwd, errMsg, setErrMsg, check, toggleCheck, handleSubmit
            }
        }>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;