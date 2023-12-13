import { RefObject, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const useRender = (action: boolean, canvasRef: RefObject<HTMLCanvasElement>, imgUrl: string) => {
  const animateRef = useRef<number>();

  useEffect(() => {
    if (!action) return;
    if (!canvasRef.current) return;
    const scenc = new THREE.Scene();
    scenc.background = new THREE.Color('#F8FAFC');
    const camera = new THREE.PerspectiveCamera(10, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    const light = new THREE.DirectionalLight(0xffffff, 3);
    scenc.add(light);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    })
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const controls = new OrbitControls(camera, renderer.domElement)
    camera.position.set(0.1, 0, 1);
    controls.target.set(0, 0, 0);
    controls.minDistance = 0.5;
    controls.maxDistance = 1;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    }
    controls.update();

    const loader = new GLTFLoader();
    loader.load(`/threeD/${imgUrl}`, (gltf) => {
      scenc.add(gltf.scene)
      if (!animateRef.current) {
        const animate = () => {
          animateRef.current = requestAnimationFrame(animate);
          controls.update();
          light.position.copy(camera.position);
          renderer.render(scenc, camera);
        }
        animate();
      }
    })
    return () => {
      if (animateRef.current) {
        cancelAnimationFrame(animateRef.current);
        animateRef.current = undefined;
      }
      controls.dispose();
      renderer.dispose();
    }
  }, [imgUrl, action, canvasRef])
}
