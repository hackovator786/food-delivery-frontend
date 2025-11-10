import {useState} from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'
import OtpPage from "./components/OtpPage.jsx";
import ScooterAnimation from "./components/ScooterAnimation.jsx";
import HomePage from "./components/HomePage.jsx";
import AuthContainer from "./components/AuthContainer.jsx";
import CheckAuth from "./components/CheckAuth.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Routes>
            <Route path="/">
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth/>}>
                        <Route path="" element={<HomePage/>}/>
                        <Route path="protected-route" element={<>Protected Route</>}/>
                    </Route>
                </Route>
            </Route>

            {/* Authentication and Authorization routes */}
            <Route path="/">
                <Route element={<PersistLogin/>}>
                    <Route element={<CheckAuth/>}>
                        <Route element={<AuthContainer/>}>
                            <Route path="login" element={<Login/>}/>
                            <Route path="signup" element={<Signup/>}/>
                            <Route path="verify-otp" element={<OtpPage/>}/>
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
