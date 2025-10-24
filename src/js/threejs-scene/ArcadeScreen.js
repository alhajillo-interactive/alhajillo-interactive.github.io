import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { PortfolioCarousel } from "../carousels";
export class ArcadeScreen {
    constructor(scene) {
        const s = 50;
        const toRad = Math.PI / 180;
        this.projectsData = PortfolioCarousel.getProjectsData();

        this.arcadeButtons = this._createArcadeButtons();
        const buttonsObject = new CSS3DObject(this.arcadeButtons);
        scene.add(buttonsObject);
        buttonsObject.position.set(-3.78 * s, 2.86 * s, 1.76 * s);
        buttonsObject.rotation.set(-65.07 * toRad, -22.87 * toRad, -38.3 * toRad, "XYZ");

        this.arcadeScreen = this._createArcadeScreen();
        const screenObject = new CSS3DObject(this.arcadeScreen);
        scene.add(screenObject);
        screenObject.position.set(-3.55 * s, 3.9 * s, 1.526 * s);
        screenObject.rotation.set(0 * toRad, -43 * toRad, -0 * toRad, "XYZ");

        PortfolioCarousel.onSlideChangeEvent((s) => this.updateScreen(s.realIndex));
    }
    _createArcadeScreen() {
        const arcadeScreen = document.createElement("div");
        arcadeScreen.classList.add("wrapper", "arcade-screen");

        // add project list
        const projectsList = document.createElement("ul");
        projectsList.classList.add("projects-list");
        this.projectsList = this.projectsData.map(({ title }) => {
            const entry = document.createElement("li");
            entry.textContent = title;
            projectsList.appendChild(entry);
            return entry;
        });

        const gamePanel = document.createElement("div");

        this.screenImg = document.createElement("img");
        this.screenImg.src = "/img/supaykuna.png";
        this.screenImg.alt = "arcade screen img";

        arcadeScreen.appendChild(gamePanel);
        gamePanel.appendChild(this.screenImg);
        arcadeScreen.appendChild(projectsList);

        this.updateScreen(0);
        return arcadeScreen;
    }
    _createArcadeButtons() {
        const arcadeButtons = document.createElement("div");
        arcadeButtons.classList.add("wrapper", "arcade-buttons");

        const controls = document.createElement("div");

        const prevBtn = document.createElement("button");
        prevBtn.textContent = "up";
        prevBtn.addEventListener("click", () => {
            PortfolioCarousel.slidePrev();
        });
        controls.appendChild(prevBtn);

        const nextBtn = document.createElement("button");
        nextBtn.textContent = "down";
        nextBtn.addEventListener("click", () => {
            PortfolioCarousel.slideNext();
        });

        this.playBtn = document.createElement("a");
        this.playBtn.href = "https://toka404.itch.io/supaykuna";
        this.playBtn.target = "_blank";
        this.playBtn.textContent = "play";
        this.playBtn.classList.add("play-btn");
        controls.appendChild(nextBtn);

        arcadeButtons.appendChild(controls);
        arcadeButtons.appendChild(this.playBtn);

        return arcadeButtons;
    }
    updateScreen(projectIndex) {
        this.projectsList.forEach((e, i) => {
            e.classList.toggle("current", i == projectIndex);
            let isActive = false;
            const maxProjects = 5;
            const halfMaxProjects = Math.ceil(maxProjects / 2);
            if (projectIndex <= halfMaxProjects) {
                isActive = i < maxProjects;
            } else if (projectIndex > this.projectsList.length - halfMaxProjects - 1) {
                isActive = i > this.projectsList.length - maxProjects - 1;
            } else {
                isActive = Math.abs(i - projectIndex) < halfMaxProjects;
            }
            e.classList.toggle("active", isActive);
        });
        this.screenImg.src = this.projectsData[projectIndex].imgSrc;
        this.playBtn.href = this.projectsData[projectIndex].href;
    }
}
