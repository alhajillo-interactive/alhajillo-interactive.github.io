import "/src/js/arcade-scene.js";

import Swiper from "swiper";
import "swiper/css";
import { EffectCoverflow } from "swiper/modules";

const portfolioSlider = new Swiper(".swiper.portfolio", {
    loop: true,
    spaceBetween: 16,
    breakpoints: {
        640: {
            slidesPerView: 2,
            centeredSlides: true,
            spaceBetween: 64,
        },
    },
    effect: "coverflow",
    modules: [EffectCoverflow],
    coverflowEffect: {
        slideShadows: false,
    },
});
