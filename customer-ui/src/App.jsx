import './App.css'
import HomePage from './components/HomePage.jsx'
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import RestaurantMenu from "./components/RestaurantMenu.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import Checkout from "./components/Checkout.jsx";
import Cart from "./components/Cart.jsx";

function App() {

    return (
        <Routes>
            <Route path="/">
                <Route element={<PersistLogin/>}>
                    <Route element={<Navbar title="Home"/>}>
                        <Route path="" element={<HomePage/>}/>
                        <Route path="items" element={<RestaurantMenu/>}/>
                    </Route>
                    <Route element={<Navbar title="Checkout"/>}>
                        <Route path="cart" element={<Cart/>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
