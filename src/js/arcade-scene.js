import CameraControls from "camera-controls";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CSS3DRenderer, CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";

//setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#1f2426");
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.getElementById("c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.shadowMap.enabled = true;

// dom renderer
const dom3D = document.getElementById("dom-3D");
const domRenderer = new CSS3DRenderer({ element: dom3D });
domRenderer.setSize(canvas.clientWidth, canvas.clientHeight);

const arcadeScreen = document.createElement("div");
// arcadeScreen.style.height = "1px";
// arcadeScreen.style.width = "1.5px";
// arcadeScreen.style.background = "red";
// arcadeScreen.style.display = "flex";
// arcadeScreen.style.fontSize = "0.1px";
const nextBtn = document.createElement("button");
nextBtn.textContent = "next";
nextBtn.addEventListener("click", () => {
    window.portfolioCarousel.slideNext();
});
const prevBtn = document.createElement("button");
prevBtn.textContent = "prev";
prevBtn.addEventListener("click", () => {
    window.portfolioCarousel.slidePrev();
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
test3dObject.position.set(-3.6, 4, 1.6);
test3dObject.rotation.set(0, -Math.PI * 0.25, 0);
// test3dObject.scale.set(1);

// controls
camera.position.set(0, 4, 10);

CameraControls.install({ THREE: THREE });
const clock = new THREE.Clock();

const controls = new CameraControls(camera, renderer.domElement);
controls.mouseButtons.wheel = CameraControls.ACTION.NONE;
controls.mouseButtons.middle = CameraControls.ACTION.NONE;
controls.mouseButtons.right = CameraControls.ACTION.NONE;
controls.touches.two = CameraControls.ACTION.NONE;
controls.touches.three = CameraControls.ACTION.NONE;
controls.minPolarAngle = Math.PI / 8;
controls.maxPolarAngle = Math.PI / 2;
controls.setOrbitPoint(0, 6, 0);

// LIGHTS

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(3, 5, 5);
dirLight.castShadow = true;
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 25;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -5;
dirLight.shadow.radius = 4;
dirLight.shadow.blurSamples = 25;
scene.add(dirLight);
scene.add(dirLight.target);

// add test model
const loader = new GLTFLoader();
loader.load(
    "/models/arcade-machine.glb",
    function (gltf) {
        gltf.scene.traverse((children) => {
            console.log(children);
            children.receiveShadow = true;
            if (children.name == "Scene" || children.name == "Plane") return;
            children.castShadow = true;
        });
        scene.add(gltf.scene);
        // const s = 100;
        // gltf.scene.scale.set(s, s, s);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

setup();
function setup() {}
function loop() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        // domRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    const delta = clock.getDelta();
    controls.update(delta);
    domRenderer.render(scene, camera);
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(loop);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
let isStill = false;
window.addEventListener("hashchange", (e) => {
    if (location.hash == "#portfolio") {
        focusArcadeMachine();
    } else {
        returnToFreeOrbit();
    }
});
function focusArcadeMachine() {
    controls.setLookAt(-6, 9.5, 4, -3, 9.5, 1, true);
    controls.enabled = false;
}
function returnToFreeOrbit() {
    controls.setTarget(0, 6, 0, true);
    controls.dollyTo(100, true);
    controls.enabled = true;
}
document.addEventListener("keydown", (e) => {
    if (e.key == "w") {
        returnToFreeOrbit();
    }
    if (e.key == "e") {
        location.hash = "#portfolio";
        focusArcadeMachine();
    }
});
