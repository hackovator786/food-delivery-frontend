import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Typography } from "@mui/material";
import { categories } from "../assets/assets";
import "./swiper-custom.css";

export default function MenuItemSwiper() {
  return (
    <Box sx={{ py: 4, px: 2,width: { xs: "100%", sm: "90%", md: "85%" }, margin: "auto", padding: "2vh 0" }}>
      <Typography variant="h6" gutterBottom>
        Popular Categories
      </Typography>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={50}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 7 },
        }}
        style={{ padding: "10px 0" }}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center", 
                cursor: "pointer" 
              }}>
              <img
                src={item.icon}
                alt={item.category}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "auto",
                  cursor: "pointer"
                }}
              />
              <Typography variant="body2" sx={{ mt: 1, cursor: "pointer" }}>
                {item.category}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
