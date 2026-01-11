import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Sphere } from 'ogl';
import './Orb.css';

const Orb = ({
    hoverIntensity = 0.5,
    rotateOnHover = true,
    hue = 0,
    forceHoverState = false
}) => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const meshRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationIdRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
        const gl = renderer.gl;
        containerRef.current.appendChild(gl.canvas);
        rendererRef.current = renderer;

        const geometry = new Sphere(gl, { radius: 1, widthSegments: 64, heightSegments: 64 });

        const vertex = `
      attribute vec3 position;
      attribute vec3 normal;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uHover;
      varying vec2 vUv;
      varying vec3 vNormal;

      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute( permute( permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vUv = uv;
        vNormal = normal;
        
        // Displace vertices based on noise
        float noise = snoise(position * 2.0 + uTime * 0.5);
        vec3 newPos = position + normal * noise * (0.1 + uHover * 0.2);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
      }
    `;

        const fragment = `
      precision highp float;
      uniform float uHue;
      varying vec2 vUv;
      varying vec3 vNormal;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        // Simple iridescent look
        vec3 normal = normalize(vNormal);
        float fresnel = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 3.0);
        
        vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.8, 0.8));
        vec3 color = mix(baseColor, vec3(1.0), fresnel);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uHover: { value: 0 },
                uHue: { value: hue }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });
        meshRef.current = mesh;

        const resize = () => {
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', resize);
        resize();

        const update = (t) => {
            program.uniforms.uTime.value = t * 0.001;

            // Hover logic
            const targetHover = forceHoverState ? 1.0 : (Math.abs(mouseRef.current.x) + Math.abs(mouseRef.current.y)) * hoverIntensity;
            program.uniforms.uHover.value += (targetHover - program.uniforms.uHover.value) * 0.1;

            if (rotateOnHover) {
                mesh.rotation.y += 0.005 + program.uniforms.uHover.value * 0.01;
                mesh.rotation.x += 0.002;
            }

            renderer.render({ scene: mesh });
            animationIdRef.current = requestAnimationFrame(update);
        };
        animationIdRef.current = requestAnimationFrame(update);

        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouseRef.current = { x, y };
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationIdRef.current);
        };
    }, [hoverIntensity, rotateOnHover, hue, forceHoverState]);

    return <div ref={containerRef} className="orb-container" />;
};

export default Orb;
