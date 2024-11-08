import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 28, 45);
const controls = new OrbitControls(camera, renderer.domElement);

const terrainGeom = new THREE.PlaneGeometry(100, 100);
const terrainMat = new THREE.MeshBasicMaterial({
  color: 0x4f6e1d,
  side: THREE.DoubleSide,
});
const ground = new THREE.Mesh(terrainGeom, terrainMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

function createStructure(w, h, d, color, pos, rotY = 0) {
  const structureGeom = new THREE.BoxGeometry(w, h, d);
  const structureMat = new THREE.MeshBasicMaterial({ color });
  const structure = new THREE.Mesh(structureGeom, structureMat);
  structure.position.set(...pos);
  structure.rotation.y = rotY;
  return structure;
}

function addCircularPath(r, color, pos) {
  const pathGeom = new THREE.CircleGeometry(r, 64);
  const pathMat = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
  });
  const path = new THREE.Mesh(pathGeom, pathMat);
  path.rotation.x = -Math.PI / 2;
  path.position.set(...pos);
  return path;
}

function addRoadSection(w, l, color, pos, rotZ = 0) {
  const roadGeom = new THREE.PlaneGeometry(w, l);
  const roadMat = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
  });
  const road = new THREE.Mesh(roadGeom, roadMat);
  road.position.set(...pos);
  road.rotation.x = -Math.PI / 2;
  road.rotation.z = rotZ;
  return road;
}

const buildings = [
  createStructure(5, 6, 20, 0xffffff, [15, 3, 25]),
  createStructure(5, 6, 20, 0xffffff, [-15, 3, 25]),
  createStructure(5, 6, 20, 0xffffff, [20, 3, -10], Math.PI / 2),
  createStructure(5, 6, 20, 0xffffff, [-20, 3, -10], -Math.PI / 2),
];

buildings.forEach((building) => scene.add(building));

scene.add(
  addCircularPath(7, 0x333333, [0, 0.01, 0]),
  addRoadSection(4, 50, 0x333333, [0, 0.01, 20]),
  addRoadSection(4, 50, 0x333333, [0, 0.01, -20]),
  addRoadSection(4, 40, 0x333333, [20, 0.01, 0], Math.PI / 2),
  addRoadSection(4, 40, 0x333333, [-20, 0.01, 0], Math.PI / 2)
);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.1);
pointLight.position.set(0, 20, 8);
scene.add(pointLight);

const sphereGeom = new THREE.SphereGeometry(1.2, 32, 32);
const sphereMat = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const sphere = new THREE.Mesh(sphereGeom, sphereMat);
sphere.position.set(6.5, 1, 0);
scene.add(sphere);

const animateSphere = () => {
  gsap
    .timeline({ repeat: -1 })
    .to(sphere.position, {
      duration: 4,
      onUpdate: function () {
        const time = this.progress() * Math.PI * 2;
        sphere.position.x = 6.5 * Math.cos(time);
        sphere.position.z = 6.5 * Math.sin(time) + 1.5;
      },
      ease: "linear",
    })
    .to(sphere.position, {
      duration: 3,
      x: 0,
      z: 4,
      ease: "power1.inOut",
    })
    .to(sphere.position, {
      duration: 2.5,
      x: 6.5,
      z: 5.5,
      ease: "power1.inOut",
    });
};

animateSphere();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
