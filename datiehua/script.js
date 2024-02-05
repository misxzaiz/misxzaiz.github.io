const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#c') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3); // x,y,z for each particle

for(let i = 0; i < particlesCnt * 3; i++) {
    // posArray[i] = Math.random() - 0.5 (for a more spread out effect)
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 'white'
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(particlesMesh);
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the particles to simulate explosion
    particlesMesh.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

animate();
    