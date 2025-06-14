import Swiper from "swiper";
import { EffectCoverflow, HashNavigation } from "swiper/modules";
import "swiper/css";

let swiperSection, swiperPortfolio;
function initCarousels() {
    swiperPortfolio = new Swiper(".swiper.portfolio", {
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
    swiperSection = new Swiper(".swiper.sections", {
        hashNavigation: {
            watchState: true,
        },
        modules: [HashNavigation],
    });
}
const PortfolioCarousel = {
    slideNext: () => {
        if (swiperPortfolio === undefined) throw new Error("Call initCarousels before manipulating them");
        swiperPortfolio.slideNext();
    },
    slidePrev: () => {
        if (swiperPortfolio === undefined) throw new Error("Call initCarousels before manipulating them");
        swiperPortfolio.slidePrev();
    },
};

export { initCarousels, PortfolioCarousel };
