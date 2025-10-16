import { initCarousels } from "./carousels";
import { Navigation } from "./Navigation";
import { SceneManager } from "./threejs-scene/SceneManager";

initCarousels();

const canvas = document.getElementById("c");
const dom3D = document.getElementById("dom-3D");
const threeJSScene = new SceneManager(canvas, dom3D);

const navbar = document.querySelector(".navbar");
const navigation = new Navigation(navbar);

// bind events
document.addEventListener("keydown", (e) => {
    threeJSScene.onKeyDown(e.key);
});
threeJSScene.onHashChange(location.hash);
navigation.update(location.hash);
window.addEventListener("hashchange", (e) => {
    threeJSScene.onHashChange(location.hash);
    navigation.update(location.hash);
});
