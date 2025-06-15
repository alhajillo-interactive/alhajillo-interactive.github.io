import { Scene } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * Loads the scene GBL from blender
 * @param {Scene} scene
 */
export function LoadModels(scene) {
    const loader = new GLTFLoader();
    loader.load(
        "/models/arcade-machine.glb",
        function (gltf) {
            gltf.scene.traverse((children) => {
                children.receiveShadow = true;
                if (children.name == "Scene" || children.name == "Plane") return;
                children.castShadow = true;
            });
            scene.add(gltf.scene);
            const s = 50;
            gltf.scene.scale.set(s, s, s);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
}
function processShadow(obj) {
    obj.receiveShadow = true;
    if (children.name == "Scene" || children.name == "Plane") return;
    obj.castShadow = true;
}
