import Swiper from "swiper";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

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
        modules: [EffectCoverflow, Navigation],
        coverflowEffect: {
            slideShadows: false,
            scale: 0.8,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
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
    onSlideChangeEvent: (listener) => {
        if (swiperPortfolio === undefined) throw new Error("Call initCarousels before manipulating them");
        swiperPortfolio.on("slideChangeTransitionEnd", listener);
    },
    getProjectsData() {
        const slideCount = swiperPortfolio.slides.length;
        const wrapper = swiperPortfolio.slidesEl;
        const data = [];
        for (let i = 0; i < slideCount; i++) {
            const slide = wrapper.querySelector(`[data-swiper-slide-index="${i}"]`);
            data.push({
                title: slide.querySelector("h3").textContent,
                imgSrc: slide.querySelector("img").src,
                href: slide.querySelector("a").href,
            });
        }

        return data;
    },
};

export { initCarousels, PortfolioCarousel };
