import { AmbientLight, DirectionalLight, Scene } from "three";

export function SetupLights(scene) {
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const dirLight = ConfigureDirectionalLight();
    scene.add(dirLight);
}
function ConfigureDirectionalLight() {
    const light = new DirectionalLight(0xffffff, 5);
    light.position.set(3, 5, 5);
    light.castShadow = true;
    // configure shadow
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 25;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -5;
    light.shadow.radius = 4;
    light.shadow.blurSamples = 25;
    return light;
}
