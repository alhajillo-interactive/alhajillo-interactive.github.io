import { BoxGeometry, Mesh, MeshBasicMaterial, Raycaster, Vector2 } from "three";

export class SceneButton {
    constructor(scene, camera, canvas, buttonInfo) {
        this.pointer = new Vector2();
        this.raycaster = new Raycaster();

        this.callback = buttonInfo.callback;
        this.camera = camera;
        this.canvas = canvas;
        this.object = new Mesh(
            new BoxGeometry(...buttonInfo.size),
            new MeshBasicMaterial({ color: "#ff0000", transparent: true, opacity: 0 })
        );
        this.object.position.set(...buttonInfo.position);
        this.object.rotation.set(...buttonInfo.rotation);
        scene.add(this.object);

        this.canvas.addEventListener("click", this.onClick.bind(this));
    }
    onClick(event) {
        // update pointer pos
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        // raycast
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersects = this.raycaster.intersectObject(this.object);
        if (intersects.length > 0) {
            this.callback();
        }
    }
}
