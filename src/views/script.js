// script.js

// Three.js ni HTML faylingizda ulagan bo'lishingiz kerak
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

let scene, camera, renderer, cube; // Global o'zgaruvchilar

function init() {
  // Sahna (Scene) yaratish: Bu bizning 3D dunyomiz
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e); // Fon rangini CSS'dagi fon rangiga moslash

  // Kamera (Camera) yaratish: Bu bizning 3D dunyoga nazarimiz
  // PerspectiveCamera(FOV, Aspect Ratio, Near, Far)
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5; // Kamerani Z o'qida 5 birlik oldinga surish

  // Renderer (Renderer) yaratish: Bu 3D sahnani ekranga chizadi
  renderer = new THREE.WebGLRenderer({ antialias: true }); // Silliq chiziqlar uchun antialias yoqilgan
  renderer.setSize(window.innerWidth, window.innerHeight); // Renderer o'lchamini oynaga moslash
  // HTML'dagi 'three-container' diviga rendererni qo'shish
  document.getElementById('three-container').appendChild(renderer.domElement);

  // Geometriya (Geometry) yaratish: Kub shakli
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 1x1x1 o'lchamli kub

  // Material (Material) yaratish: Obyektning ko'rinishi (rangi, teksturasi va h.k.)
  // MeshPhongMaterial yorug'likka reaktiv (nur tushganda ko'rinadi)
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }); // Yashil rang

  // Mesh (Mesh) yaratish: Geometriya va materialni birlashtiradi - bu bizning obyektimiz
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube); // Kubni sahnaga qo'shish

  // Yoritish (Lighting) qo'shish: 3D obyektlar ko'rinishi uchun yorug'lik kerak
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Yumshoq atrof yorug'lik
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Yo'nalishli yorug'lik
  directionalLight.position.set(1, 1, 1).normalize(); // Yorug'lik yo'nalishini belgilash
  scene.add(directionalLight);

  // Oyna o'lchami o'zgarganda rendererni yangilash
  window.addEventListener('resize', onWindowResize, false);

  // Animatsiya siklini boshlash
  animate();
}

function onWindowResize() {
  // Kamera nisbatini yangilash
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Renderer o'lchamini yangilash
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animatsiya funksiyasi: Har bir kadrda ishlaydi
function animate() {
  requestAnimationFrame(animate); // Keyingi kadr uchun o'zini yana chaqirish

  // Kubni aylantirish
  if (cube) {
    // Kub mavjudligini tekshirish
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  // Sahnani kamera orqali chizish
  renderer.render(scene, camera);
}

// Ilovani ishga tushirish
init();
