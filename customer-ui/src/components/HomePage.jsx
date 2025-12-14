import React from "react";
import MenuItemSwiper from "./MenuItemSwiper";
import HeroSection from "./HeroSection";
import Restaurants from "./Restaurants";
import Footer from "./Footer.jsx";

export default function HomePage() {
    return (
        <>
            <HeroSection/>
            <MenuItemSwiper/>
            <Restaurants/>
            <Footer/>
        </>
    );
}
