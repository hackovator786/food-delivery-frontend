import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CheckAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("CheckAuth accesstoken", auth.accessToken);

    return (auth?.accessToken
            ? <Navigate to="/" />
            :
            <Outlet />
    );
}

export default CheckAuth;