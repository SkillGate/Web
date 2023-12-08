"use client";

import React, { useEffect, useState } from "react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  Zoom,
  Scrollbar,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/zoom";
import "swiper/css/effect-fade";
import { slidesData } from "../../data/sidesData";

const useViewport = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWidth);

    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return width;
};

const Hero = () => {
  const viewportWidth = useViewport();

  const isMobileView = viewportWidth <= 450;

  const pagination = {
    clickable: true,
    dynamicBullets: true,
    renderBullet: ({ index, className }) => {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };
  return (
    <Swiper
      //   style={{
      //     '--swiper-navigation-color': '#fff',
      //     '--swiper-pagination-color': '#fff',
      //   }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      // zoom={true}
      loop={true}
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 12000,
        disableOnInteraction: false,
      }}
      navigation={false}
      effect="fade"
      modules={[Autoplay, Pagination, Navigation, Zoom, EffectFade]}
      className="mySwiper"
      onSlideChangeTransitionStart={handleSlideChange}
    >
      {slidesData.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            style={{ width: "100vw", height: isMobileView ? "100vh" : "85vh" }}
            className="relative swiper-zoom-container"
          >
            <Image
              src={slide.imageUrl}
              alt={`Slider ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="brightness-50 opacity-100"
            />
            <div
              className={`padding-container text-main z-50 transition-opacity duration-500 ${currentSlide === index ? "slider-transition" : ""
                }`}
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <h2 className="text-xl lg:w-1/3 md:text-3xl font-bold text-white uppercase">
                  {slide.title}
                </h2>
                {/* <h2 className="text-5xl md:text-6xl font-bold text-white uppercase py-8">
                {index % 2 === 0 ? (
                  <>
                    Pelican<span className="text-primary"> Holdings</span>
                  </>
                ) : (
                  <>
                    Bitumen and
                    <span className="text-primary"> Bituminous</span>
                    <br />
                    Products
                  </>
                )}
              </h2> */}
                <p className="text-md lg:w-2/3 text-2xl bg-dark-card border border-gray-800 rounded-2xl text-purple-400 px-6 p-10">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
