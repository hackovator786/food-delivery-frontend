import { Outlet } from "react-router-dom";

const AuthContainer = () => {
    return (
        <div id="auth-container">
            <Outlet />
        </div>
    )
}
export default AuthContainer;
