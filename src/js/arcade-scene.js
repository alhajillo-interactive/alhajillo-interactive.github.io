import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement;
document.body.appendChild(canvas);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enablePan = false;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 8;
controls.maxPolarAngle = Math.PI / 2;

// LIGHTS

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(0, 10, 0);
dirLight.target.position.set(-5, 0, 0);
scene.add(dirLight);
scene.add(dirLight.target);

// add cube
const geometry = new THREE.BoxGeometry(2, 3, 2);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.5;
scene.add(cube);
// add plane

const planeG = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeG, planeMaterial);
plane.position.y = -1;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

camera.position.z = 6;
camera.position.y = 4;
camera.position.x = 4;
controls.update();

setup();
function setup() {}
function loop() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(loop);
