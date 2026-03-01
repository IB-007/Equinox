/**
 * StarField.js — Standalone lightweight starfield
 * Used as a background layer that can be reused across sections
 */
import * as THREE from 'three';

export default class StarField {
    constructor(container, options = {}) {
        this.container = container;
        this.count = options.count || 300;
        this.depth = options.depth || 10;
        this.speed = options.speed || 0.05;
        this.frameId = null;

        this.init();
        this.animate();

        window.addEventListener('resize', this.onResize.bind(this));
    }

    init() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        // Stars
        const positions = new Float32Array(this.count * 3);
        for (let i = 0; i < this.count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * this.depth;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xE7E2DE,
            size: 0.075,
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: true,
        });

        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);
    }

    onResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        this.frameId = requestAnimationFrame(this.animate.bind(this));
        if (this.points) {
            this.points.rotation.y += this.speed * 0.01;
            this.points.rotation.x += this.speed * 0.003;
        }
        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        if (this.frameId) cancelAnimationFrame(this.frameId);
        window.removeEventListener('resize', this.onResize.bind(this));
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
