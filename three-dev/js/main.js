import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 10);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffaa00, 1);
    directionalLight.position.set(-5, 5, 5).normalize();
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0x00ff00, 1);
    spotLight.position.set(0, 5, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    scene.add(body);

    const noseGeometry = new THREE.ConeGeometry(0.5, 1, 32);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.y = 2;
    scene.add(nose);

    const finGeometry = new THREE.BoxGeometry(0.1, 0.5, 1);
    const finMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    const fin1 = new THREE.Mesh(finGeometry, finMaterial);
    fin1.position.set(0.3, -1, 0);
    scene.add(fin1);

    const fin2 = fin1.clone();
    fin2.position.set(-0.3, -1, 0);
    scene.add(fin2);

    const wireframeBody = new THREE.LineSegments(
        new THREE.EdgesGeometry(bodyGeometry),
        new THREE.LineBasicMaterial({ color: 0xff0000 })
    );
    body.add(wireframeBody);

    const wireframeNose = new THREE.LineSegments(
        new THREE.EdgesGeometry(noseGeometry),
        new THREE.LineBasicMaterial({ color: 0x0000ff })
    );
    nose.add(wireframeNose);

    const wireframeFin1 = new THREE.LineSegments(
        new THREE.EdgesGeometry(finGeometry),
        new THREE.LineBasicMaterial({ color: 0x00ff00 })
    );
    fin1.add(wireframeFin1);

    const wireframeFin2 = wireframeFin1.clone();
    fin2.add(wireframeFin2);

    renderer.setAnimationLoop(() => {
        controls.update();
        renderer.render(scene, camera);
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

init();
