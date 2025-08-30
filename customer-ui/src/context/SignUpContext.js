import { createContext, useState, useRef } from "react";
import axios from "../api/axios";
import { handleError } from '../utils/ErrorHandler';
import { isValidUsername } from "../utils/ValidInput";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/signup';

const SignUpContext = createContext();

export const SignUpContextProvider = ({ children }) => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidName(isValidUsername(user));
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
        
        const v1 = isValidUsername(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ emailPhno: user, pwd, cpwd: matchPwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            handleError({ err, setErrMsg, errRef });
            errRef.current.focus();
        }
    }
    return (
        <SignUpContext.Provider value={{ userRef, errRef, user, setUser, validName, 
            setValidName, userFocus, setUserFocus, pwd, setPwd, validPwd, setValidPwd, 
            pwdFocus, setPwdFocus, matchPwd, setMatchPwd, validMatch, setValidMatch,
            matchFocus, setMatchFocus, errMsg, setErrMsg, success, setSuccess, handleSubmit}}
        >{children}
        </SignUpContext.Provider>
    )
}

export default SignUpContext;