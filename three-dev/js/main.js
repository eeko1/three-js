import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let container, camera, scene, renderer, cube, controls;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00
    });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.set(2, 2, 2);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    camera.lookAt(axesHelper.position);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directionalLight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.update();

    function animate() {
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
        controls.update();

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', resize, false);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
