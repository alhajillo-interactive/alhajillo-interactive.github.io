import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { PortfolioCarousel } from "./carousels";
export class ArcadeScreen {
    constructor(scene) {
        const arcadeScreen = document.createElement("div");
        // arcadeScreen.style.height = "1px";
        // arcadeScreen.style.width = "1.5px";
        // arcadeScreen.style.background = "red";
        // arcadeScreen.style.display = "flex";
        // arcadeScreen.style.fontSize = "0.1px";
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "next";
        nextBtn.addEventListener("click", () => {
            PortfolioCarousel.slideNext();
        });
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "prev";
        prevBtn.addEventListener("click", () => {
            PortfolioCarousel.slidePrev();
        });
        const instagramBTN = document.createElement("a");
        instagramBTN.textContent = "instagram";
        instagramBTN.href = "https://www.instagram.com/alhajillo.interactive/";
        // instagramBTN.style.fontSize = "1rem";
        instagramBTN.target = "_blank";
        arcadeScreen.appendChild(instagramBTN);
        arcadeScreen.appendChild(prevBtn);
        arcadeScreen.appendChild(nextBtn);
        const test3dObject = new CSS3DObject(arcadeScreen);
        scene.add(test3dObject);
        test3dObject.position.set(-3.5, 3.88, 1.53);
        test3dObject.rotation.set(0, -Math.PI * 0.25, 0);
    }
}
