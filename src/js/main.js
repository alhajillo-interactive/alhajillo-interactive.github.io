import { SceneManager } from "./threejs-scene/SceneManager";

const canvas = document.getElementById("c");
const dom3D = document.getElementById("dom-3D");
const threeJSScene = new SceneManager(canvas, dom3D);

// bind events
document.addEventListener("keydown", (e) => {
    threeJSScene.onKeyDown(e.key);
});
threeJSScene.onHashChange(location.hash);
window.addEventListener("hashchange", (e) => {
    threeJSScene.onHashChange(location.hash);
});
console.log("main.js");
