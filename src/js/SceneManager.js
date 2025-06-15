import { Scene, Color, PerspectiveCamera, WebGLRenderer, Clock } from "three";
import { LoadModels } from "./models";
import { SetupLights } from "./lights";
import { CameraMovement } from "./CameraMovement";
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";
import { ArcadeScreen } from "./ArcadeScreen";
import { ContactButtons } from "./ContactButtons";

export class SceneManager {
    constructor(canvas, dom3dElement) {
        this.scene = new Scene();
        this.scene.background = new Color("#1f2426");
        // camera
        const fov = 45;
        this.camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
        // renderer
        this.renderer = new WebGLRenderer({ antialias: true, canvas: canvas });
        this.renderer.shadowMap.enabled = true;
        this.domRenderer = new CSS3DRenderer({ element: dom3dElement });
        // run scene
        this._setup();
        this.renderer.setAnimationLoop(this._loop.bind(this));
        this.clock = new Clock();
    }

    _setup() {
        SetupLights(this.scene);
        LoadModels(this.scene);
        this.cameraMovement = new CameraMovement(this.camera, this.renderer.domElement);
        this.arcadeScreen = new ArcadeScreen(this.scene);
        this.contactButtons = new ContactButtons(this.scene);
    }
    _loop() {
        const deltaTime = this.clock.getDelta();
        if (this._resizeRendererToDisplaySize(this.renderer)) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
            this.domRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
        }
        this.cameraMovement.update(deltaTime);
        this.domRenderer.render(this.scene, this.camera);
        this.renderer.render(this.scene, this.camera);
    }
    _resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
    onKeyDown(key) {
        if (key == "w") {
            this.cameraMovement.activateFreeOrbit();
        }
        if (key == "e") {
            this.cameraMovement.focusOnArcadeMachine();
        }
    }
    onHashChange(hash) {
        if (hash == "#portfolio") {
            this.cameraMovement.focusOnArcadeMachine();
        } else {
            this.cameraMovement.activateFreeOrbit();
        }
    }
}
