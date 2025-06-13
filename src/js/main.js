import "/src/js/arcade-scene.js";

import Swiper from "swiper";
import "swiper/css";
import { EffectCoverflow, HashNavigation } from "swiper/modules";

const portfolioCarousel = new Swiper(".swiper.portfolio", {
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

const sectionCarousel = new Swiper(".swiper.sections", {
    hashNavigation: {
        watchState: true,
    },
    modules: [HashNavigation],
});

document.addEventListener("keydown", (e) => {
    if (e.key == "a") {
        console.log("previous slide");
        portfolioCarousel.slidePrev();
    }
    if (e.key == "d") {
        console.log("next slide");
        portfolioCarousel.slideNext();
    }
});
