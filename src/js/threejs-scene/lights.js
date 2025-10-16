import { AmbientLight, CameraHelper, DirectionalLight, Scene } from "three";

export function SetupLights(scene) {
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const dirLight = ConfigureDirectionalLight();
    scene.add(dirLight);
}
function ConfigureDirectionalLight() {
    const light = new DirectionalLight(0xffffff, 5);
    const s = 50;
    light.position.set(3 * s, 5 * s, 5 * s);
    light.castShadow = true;
    // configure shadow
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 25 * s;
    light.shadow.camera.left = -5 * s;
    light.shadow.camera.right = 5 * s;
    light.shadow.camera.top = 6 * s;
    light.shadow.camera.bottom = -2 * s;
    light.shadow.radius = 4;
    light.shadow.blurSamples = 3;
    return light;
}
