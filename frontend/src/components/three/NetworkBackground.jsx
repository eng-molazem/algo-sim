import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Lightweight animated 3D graph: a cluster of nodes connected by edges,
 * slowly rotating in space. Purely decorative — echoes the platform's
 * subject matter (graphs / trees / linked structures) instead of a
 * generic particle effect.
 */
export default function NetworkBackground({ className = '', nodeCount = 42, color = '#7c9bff', linkColor = '#a855f7' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const radius = 11;
    const points = Array.from({ length: nodeCount }, () => {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = radius * (0.55 + Math.random() * 0.45);
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    });

    const nodeGeometry = new THREE.SphereGeometry(0.16, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color });
    points.forEach((p) => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      mesh.position.copy(p);
      group.add(mesh);
    });

    const linePositions = [];
    points.forEach((p, i) => {
      let linked = 0;
      for (let j = 0; j < points.length && linked < 2; j += 1) {
        if (i === j) continue;
        if (p.distanceTo(points[j]) < radius * 0.55) {
          linePositions.push(p.x, p.y, p.z, points[j].x, points[j].y, points[j].z);
          linked += 1;
        }
      }
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: linkColor, transparent: true, opacity: 0.35 });
    group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    function resize() {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    let raf;
    function animate() {
      group.rotation.y += 0.0022;
      group.rotation.x += 0.0007;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [nodeCount, color, linkColor]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
