import CameraControls from "camera-controls";
// used by camera controls
import { Vector2, Vector3, Vector4, Quaternion, Matrix4, Spherical, Box3, Sphere, Raycaster } from "three";

const subsetOfTHREE = {
    Vector2: Vector2,
    Vector3: Vector3,
    Vector4: Vector4,
    Quaternion: Quaternion,
    Matrix4: Matrix4,
    Spherical: Spherical,
    Box3: Box3,
    Sphere: Sphere,
    Raycaster: Raycaster,
};
CameraControls.install({ THREE: subsetOfTHREE });

export class CameraMovement {
    constructor(camera, domElement) {
        this.orbitTarget = { x: 0, y: 3 * 50, z: 0 };
        this.orbitDistance = 700;

        this.controls = new CameraControls(camera, domElement);
        // setup input
        this.controls.mouseButtons.wheel = CameraControls.ACTION.NONE;
        this.controls.mouseButtons.middle = CameraControls.ACTION.NONE;
        this.controls.mouseButtons.right = CameraControls.ACTION.NONE;
        this.controls.touches.two = CameraControls.ACTION.NONE;
        this.controls.touches.three = CameraControls.ACTION.NONE;
        // set orbit limits
        this.controls.minPolarAngle = Math.PI / 8;
        this.controls.maxPolarAngle = Math.PI / 2;

        this.controls.setPosition(0, 200, 500);
        this.controls.setTarget(this.orbitTarget.x, this.orbitTarget.y, this.orbitTarget.y);
        this.controls.dollyTo(this.orbitDistance);
    }
    update(deltaTime) {
        this.controls.update(deltaTime);
    }
    focusOnArcadeMachine() {
        const s = 50;
        this.controls.setLookAt(-6 * s, 4.88 * s, 4 * s, -3.5 * s, 3.38 * s, 1.53 * s, true);
        this.controls.enabled = false;
    }
    activateFreeOrbit() {
        this.controls.setTarget(this.orbitTarget.x, this.orbitTarget.y, this.orbitTarget.y, true);
        this.controls.dollyTo(this.orbitDistance, true);
        this.controls.enabled = true;
    }
}
