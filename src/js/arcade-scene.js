import CameraControls from "camera-controls";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

//setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#1f2426");
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.getElementById("c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

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
    }
    const delta = clock.getDelta();
    controls.update(delta);
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
    controls.dollyTo(10, true);
    controls.enabled = true;
}
document.addEventListener("keydown", (e) => {
    if (e.key == "w") {
        returnToFreeOrbit();
    }
    if (e.key == "e") {
        focusArcadeMachine();
    }
});
controls.addEventListener("controlstart", (e) => {
    console.log(e);
});
