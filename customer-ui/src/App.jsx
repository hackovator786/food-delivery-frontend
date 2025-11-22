import './App.css'
import HomePage from './components/HomePage.jsx'
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import RestaurantMenu from "./components/RestaurantMenu.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route path="" element={<HomePage/>}/>
                <Route path="items" element={<RestaurantMenu/>}/>
            </Route>
        </Routes>
    )
}

export default App
