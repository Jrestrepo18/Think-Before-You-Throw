import React, { useEffect, useRef, memo } from 'react';

export default memo(function ThreeBackground({ mountRef, threeRefs, onLoaded, isAppLoading }) {
  const isAppLoadingRef = useRef(isAppLoading);
  
  useEffect(() => {
    isAppLoadingRef.current = isAppLoading;
  }, [isAppLoading]);

  useEffect(() => {
    let animationFrameId;
    let renderer;
    let scene;
    let camera;
    let handleMouseMove;
    let handleResize;

    const initThreeJS = () => {
      if (!window.THREE || !mountRef.current) return;
      
      const THREE = window.THREE;
      const width = window.innerWidth;
      const height = window.innerHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 12;

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      mountRef.current.appendChild(renderer.domElement);
      threeRefs.current.container = mountRef.current;

      const sceneWrapper = new THREE.Group();
      scene.add(sceneWrapper);

      const earthGroup = new THREE.Group();
      earthGroup.rotation.z = 23.5 * Math.PI / 180;
      sceneWrapper.add(earthGroup);
      threeRefs.current.earthGroup = sceneWrapper; 

      const manager = new THREE.LoadingManager();
      manager.onLoad = function () {
        if (onLoaded) onLoaded();
      };

      const textureLoader = new THREE.TextureLoader(manager);
      textureLoader.setCrossOrigin('Anonymous');

      // Reduced sphere segments from 64 to 32
      const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
        bumpMap: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
        bumpScale: 0.03, 
        specularMap: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-water.png'),
        specular: new THREE.Color(0x222222),
        shininess: 12 
      });
      const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      earthGroup.add(earthMesh);

      const cloudGeometry = new THREE.SphereGeometry(1.015, 32, 32);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg'),
        alphaMap: textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg'),
        transparent: true,
        opacity: 0.6, 
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
      earthGroup.add(cloudMesh);

      const atmosphereGeometry = new THREE.SphereGeometry(1.15, 32, 32);
      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
            gl_FragColor = vec4(0.1, 0.8, 0.5, 1.0) * intensity; 
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
      });
      const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      sceneWrapper.add(atmosphereMesh);
      threeRefs.current.atmosphereMesh = atmosphereMesh;

      // --- Particle textures (unchanged look, created once) ---
      const createWaterDropTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(16, 5);
        ctx.bezierCurveTo(16, 5, 8, 18, 8, 22);
        ctx.arc(16, 22, 8, Math.PI, 0, false);
        ctx.bezierCurveTo(24, 18, 16, 5, 16, 5);
        ctx.fill();
        return new THREE.CanvasTexture(canvas);
      };

      const createLightningTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff'; 
        ctx.beginPath();
        ctx.moveTo(18, 3);
        ctx.lineTo(8, 18);
        ctx.lineTo(16, 18);
        ctx.lineTo(13, 29);
        ctx.lineTo(24, 13);
        ctx.lineTo(16, 13);
        ctx.closePath();
        ctx.fill();
        return new THREE.CanvasTexture(canvas);
      };

      const createBinTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(10, 11); ctx.lineTo(22, 11);
        ctx.lineTo(20, 26); ctx.lineTo(12, 26);
        ctx.closePath();
        ctx.fill();
        ctx.fillRect(8, 8, 16, 2);
        ctx.fillRect(14, 6, 4, 2);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(13, 13); ctx.lineTo(14, 24);
        ctx.moveTo(16, 13); ctx.lineTo(16, 24);
        ctx.moveTo(19, 13); ctx.lineTo(18, 24);
        ctx.stroke();
        return new THREE.CanvasTexture(canvas);
      };

      const createRecycleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(16, 6); ctx.lineTo(8, 20); ctx.lineTo(24, 20); ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(16, 6); ctx.lineTo(19, 10); ctx.moveTo(16, 6); ctx.lineTo(13, 10);
        ctx.moveTo(8, 20); ctx.lineTo(5, 16); ctx.moveTo(8, 20); ctx.lineTo(12, 17);
        ctx.moveTo(24, 20); ctx.lineTo(27, 16); ctx.moveTo(24, 20); ctx.lineTo(20, 17);
        ctx.stroke();
        return new THREE.CanvasTexture(canvas);
      };

      // Reduced particle counts (was 90+70+60+80 = 300, now 50+40+35+45 = 170)
      const createParticles = (texture, count, size, colorHex) => {
        const geo = new THREE.BufferGeometry();
        const mat = new THREE.PointsMaterial({
          color: colorHex,
          size: size,
          transparent: true,
          opacity: 0.8,
          map: texture,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const verts = [];
        const phases = [];
        for(let i=0; i<count; i++) {
          verts.push((Math.random() - 0.5)*25, (Math.random() - 0.5)*25, (Math.random() - 0.5)*15 - 5);
          phases.push(Math.random() * Math.PI * 2);
        }
        geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
        geo.setAttribute('phase', new THREE.Float32BufferAttribute(phases, 1));
        return new THREE.Points(geo, mat);
      };

      const waterDrops = createParticles(createWaterDropTexture(), 50, 0.55, 0x3b82f6);
      const bins = createParticles(createBinTexture(), 40, 0.60, 0x94a3b8);
      const lightnings = createParticles(createLightningTexture(), 35, 0.55, 0xeab308);
      const recycles = createParticles(createRecycleTexture(), 45, 0.65, 0x22c55e);
      
      scene.add(waterDrops);
      scene.add(bins);
      scene.add(lightnings);
      scene.add(recycles);

      scene.add(new THREE.AmbientLight(0xffffff, 0.05)); 
      
      const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
      mainLight.position.set(5, 3, 5); 
      scene.add(mainLight);

      const rimLight = new THREE.PointLight(0x4ade80, 2.5, 50);
      rimLight.position.set(-5, -3, -5); 
      scene.add(rimLight);

      let targetRotationY = 0;
      let targetRotationX = 0;
      let currentRotationY = 0;
      let currentRotationX = 0;
      let baseEarthRotation = 0;

      // Throttled mouse handler
      let mouseMoveThrottle = false;
      handleMouseMove = (e) => {
        if (mouseMoveThrottle) return;
        mouseMoveThrottle = true;
        requestAnimationFrame(() => {
          targetRotationY = (e.clientX / window.innerWidth) * 2 - 1;
          targetRotationX = (e.clientY / window.innerHeight) * 2 - 1;
          mouseMoveThrottle = false;
        });
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      const animateParticles = (particles, speed) => {
        const positions = particles.geometry.attributes.position.array;
        const phases = particles.geometry.attributes.phase.array;
        for(let i=0; i<positions.length; i+=3) {
          const idx = i/3;
          phases[idx] += 0.01;
          positions[i] += Math.cos(phases[idx]*0.8)*0.005;
          positions[i+1] += Math.sin(phases[idx])*0.005;
          positions[i+2] += speed;
          if(positions[i+2] > 5) positions[i+2] = -10;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y -= 0.0003;
        particles.rotation.x -= 0.0001;
      };

      // Cache scroll/height to avoid layout thrashing
      let cachedScrollY = 0;
      let cachedHeight = window.innerHeight;
      const handleScroll = () => { cachedScrollY = window.scrollY; };
      window.addEventListener('scroll', handleScroll, { passive: true });

      const animate = () => {
        if (!isAppLoadingRef.current) {
          if (camera.position.z > 3.5) {
            camera.position.z += (3.5 - camera.position.z) * 0.03; // cinematic slow zoom
          }
        } else {
          camera.position.z = 15; // keep far away initially
        }

        baseEarthRotation += 0.0005;
        earthMesh.rotation.y = baseEarthRotation;
        cloudMesh.rotation.y = baseEarthRotation * 1.2;

        animateParticles(waterDrops, 0.005);
        animateParticles(bins, 0.004);
        animateParticles(lightnings, 0.006);
        animateParticles(recycles, 0.005);

        currentRotationY += (targetRotationY * 0.3 - currentRotationY) * 0.08;
        currentRotationX += (targetRotationX * 0.2 - currentRotationX) * 0.08;
        
        sceneWrapper.rotation.y = currentRotationY;
        sceneWrapper.rotation.x = currentRotationX;

        if (cachedScrollY < cachedHeight * 4) { 
          const scale = 1 + (cachedScrollY * 0.0015); 
          earthGroup.scale.set(scale, scale, scale);
          atmosphereMesh.scale.set(scale, scale, scale);
          
          if (mountRef.current) {
            mountRef.current.style.opacity = Math.max(0, 1 - (cachedScrollY / (cachedHeight * 1.8)));
          }
        }

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      handleResize = () => {
        cachedHeight = window.innerHeight;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize, { passive: true });
    };

    if (!window.THREE) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = initThreeJS;
      document.head.appendChild(script);
    } else {
      initThreeJS();
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
    };
  }, [mountRef, threeRefs]);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none will-change-[opacity]" />;
});
