import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'
import OtpPage from "./components/OtpPage.jsx";
import ScooterAnimation from "./components/ScooterAnimation.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
       <Route path="/" >
        <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="home" element={<>Home page</>} />
            </Route>
          </Route>
      </Route>

      {/* Authentication and Authorization routes */}
      <Route path="/">
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<Signup />}/>
          <Route path="verify-otp" element={<OtpPage />} />
          <Route path="test-home" element={<>Home page</>} />
          <Route path="loading" element={<ScooterAnimation />} />
      </Route>
    </Routes>
  )
}

export default App
