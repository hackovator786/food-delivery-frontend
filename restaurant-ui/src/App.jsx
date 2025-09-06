import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
       <Route path="/" >
        <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="" element={<>Home page</>} />
            </Route>
          </Route>
      </Route>
      
      {/* Authentication and Authorization routes */}
      <Route path="/">
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
      </Route>
    </Routes>
  )
}

export default App
