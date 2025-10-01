import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import {ThemeContextProvider} from "./context/ThemeContext.jsx";
import {SignUpContextProvider} from "./context/SignUpContext.jsx";
import {LoginContextProvider} from "./context/LoginContext.jsx";
import {OtpContextProvider} from "./context/OtpContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <ThemeContextProvider>
              <SignUpContextProvider>
                  <LoginContextProvider>
                      <OtpContextProvider>
                        <Routes>
                            <Route path="/*" element={<App />} />
                        </Routes>
                      </OtpContextProvider>
                  </LoginContextProvider>
              </SignUpContextProvider>
          </ThemeContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
