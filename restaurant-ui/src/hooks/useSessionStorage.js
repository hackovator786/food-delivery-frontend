import { useState, useEffect } from "react";

const getSessionValue = (key, initValue) => {
    if (typeof window === 'undefined') return initValue;

    const sessionValue = JSON.parse(sessionStorage.getItem(key));
    if (sessionValue) return sessionValue;

    if (initValue instanceof Function) return initValue();

    return initValue;
}

const useSessionStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        return getSessionValue(key, initValue);
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useSessionStorage;