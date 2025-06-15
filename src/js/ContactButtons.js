import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";

export class ContactButtons {
    constructor(scene) {
        const contactButtons = this._createButtons([
            { text: "instagram", href: "https://www.instagram.com/alhajillo.interactive/" },
            { text: "mail", href: "mailto:alhajillo.interactivo@gmail.com" },
        ]);

        const btnsObj = new CSS3DObject(contactButtons);
        btnsObj.position.set(-2.567 * 50, 2.473 * 50, 0.449 * 50);
        btnsObj.rotation.set(0, 137 * (Math.PI / 180), 0);
        scene.add(btnsObj);
    }

    _createButtons(buttons) {
        const contactButtons = document.createElement("div");
        contactButtons.classList.add("wrapper", "contact-buttons");

        // add label

        // add buttons
        buttons.forEach((btnInfo) => {
            const btn = document.createElement("a");
            btn.textContent = btnInfo.text;
            btn.href = btnInfo.href;
            btn.target = "_blank";
            contactButtons.appendChild(btn);
        });

        return contactButtons;
    }
}
