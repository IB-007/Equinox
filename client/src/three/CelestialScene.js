/**
 * CelestialScene.js — Main Three.js scene for the Equinox hero
 * Creates a slowly rotating armillary sphere with constellation lines
 * and the equinox dual-gradient background blending
 */
import * as THREE from 'three';

export default class CelestialScene {
  constructor(container) {
    this.container = container;
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.mouse = { x: 0, y: 0 };
    this.scrollY = 0;
    this.frameId = null;

    this.init();
    this.createArmillarySphere();
    this.createConstellationLines();
    this.createStarField();
    this.animate();

    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);
  }

  createArmillarySphere() {
    this.armillary = new THREE.Group();

    const goldColor = new THREE.Color(0xC9A96E);
    const material = new THREE.LineBasicMaterial({
      color: goldColor,
      transparent: true,
      opacity: 0.3,
    });

    // Main rings at different angles (armillary sphere style)
    const ringAngles = [
      { rx: 0, ry: 0, rz: 0, radius: 2 },
      { rx: Math.PI / 6, ry: 0, rz: 0, radius: 2 },
      { rx: 0, ry: 0, rz: Math.PI / 4, radius: 2 },
      { rx: Math.PI / 3, ry: Math.PI / 6, rz: 0, radius: 2 },
      { rx: 0, ry: Math.PI / 3, rz: Math.PI / 6, radius: 1.8 },
      { rx: Math.PI / 2, ry: 0, rz: 0, radius: 2 },
      { rx: 0, ry: 0, rz: Math.PI / 2.5, radius: 1.6 },
    ];

    ringAngles.forEach(({ rx, ry, rz, radius }) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
      const points = curve.getPoints(80);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, p.y, 0))
      );
      const ring = new THREE.Line(geometry, material);
      ring.rotation.set(rx, ry, rz);
      this.armillary.add(ring);
    });

    // Central axis
    const axisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -2.3, 0),
      new THREE.Vector3(0, 2.3, 0),
    ]);
    const axisMaterial = new THREE.LineBasicMaterial({
      color: goldColor,
      transparent: true,
      opacity: 0.1,
    });
    this.armillary.add(new THREE.Line(axisGeometry, axisMaterial));

    this.scene.add(this.armillary);
  }

  createConstellationLines() {
    this.constellations = new THREE.Group();

    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xC9A96E),
      transparent: true,
      opacity: 0.06,
    });

    // Generate random subtle constellation patterns
    for (let i = 0; i < 8; i++) {
      const points = [];
      let x = (Math.random() - 0.5) * 8;
      let y = (Math.random() - 0.5) * 6;
      let z = (Math.random() - 0.5) * 3 - 2;

      const numSegments = 3 + Math.floor(Math.random() * 4);
      for (let j = 0; j < numSegments; j++) {
        points.push(new THREE.Vector3(x, y, z));
        x += (Math.random() - 0.5) * 1.5;
        y += (Math.random() - 0.5) * 1.5;
        z += (Math.random() - 0.5) * 0.5;
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      this.constellations.add(new THREE.Line(geometry, material));
    }

    this.scene.add(this.constellations);
  }

  createStarField() {
    // Primary star layer — bright, foreground
    const starsCount = 1500;
    const positions = new Float32Array(starsCount * 3);
    const sizes = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 3;
      sizes[i] = Math.random() * 1.8 + 0.2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0xF5F6F3,
      size: 0.02,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);

    // Deep background star layer — dimmer, more distant
    const deepCount = 800;
    const deepPos = new Float32Array(deepCount * 3);
    for (let i = 0; i < deepCount; i++) {
      deepPos[i * 3] = (Math.random() - 0.5) * 40;
      deepPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      deepPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 10;
    }
    const deepGeo = new THREE.BufferGeometry();
    deepGeo.setAttribute('position', new THREE.BufferAttribute(deepPos, 3));
    const deepMat = new THREE.PointsMaterial({
      color: 0xC9A96E,
      size: 0.012,
      transparent: true,
      opacity: 0.2,
      sizeAttenuation: true,
    });
    this.deepStars = new THREE.Points(deepGeo, deepMat);
    this.scene.add(this.deepStars);
  }

  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  onMouseMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onScroll() {
    this.scrollY = window.scrollY;
  }

  animate() {
    this.frameId = requestAnimationFrame(this.animate.bind(this));
    const time = Date.now() * 0.0001;

    // Armillary sphere rotation — very slow and smooth
    if (this.armillary) {
      this.armillary.rotation.y = time * 0.5 + this.mouse.x * 0.1;
      this.armillary.rotation.x = Math.sin(time * 0.3) * 0.15 + this.mouse.y * 0.05;
    }

    // Constellation subtle drift
    if (this.constellations) {
      this.constellations.rotation.y = time * 0.2;
    }

    // Star parallax on scroll
    if (this.stars) {
      this.stars.rotation.y = time * 0.1;
      this.stars.position.y = this.scrollY * 0.0005;
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.onResize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('scroll', this.onScroll.bind(this));

    this.scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.renderer.dispose();
    if (this.renderer.domElement && this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
