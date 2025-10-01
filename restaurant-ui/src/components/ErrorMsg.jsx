import { useContext } from "react";

export default function ErrorMsg({context}){
    const {errRef, errMsg} = useContext(context);
    return (
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    );
}