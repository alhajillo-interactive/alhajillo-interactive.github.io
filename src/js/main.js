import { initCarousels } from "./carousels";
import { SceneManager } from "./SceneManager";

initCarousels();

const canvas = document.getElementById("c");
const dom3D = document.getElementById("dom-3D");
const threeJSScene = new SceneManager(canvas, dom3D);

// bind events
document.addEventListener("keydown", (e) => {
    threeJSScene.onKeyDown(e.key);
});
window.addEventListener("hashchange", (e) => {
    threeJSScene.onHashChange(location.hash);
});
