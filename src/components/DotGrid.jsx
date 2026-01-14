import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './DotGrid.css';

const DotGrid = ({
    dotSize = 10,
    gap = 20,
    baseColor = '#5227FF',
    activeColor = '#FFFFFF',
    proximity = 200,
    shockRadius = 250
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const dotsRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = containerRef.current;

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            initDots();
        };

        const initDots = () => {
            dotsRef.current = [];
            const cols = Math.ceil(canvas.width / gap);
            const rows = Math.ceil(canvas.height / gap);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dotsRef.current.push({
                        x: i * gap + gap / 2,
                        y: j * gap + gap / 2,
                        baseX: i * gap + gap / 2,
                        baseY: j * gap + gap / 2,
                        size: dotSize,
                        color: baseColor,
                        scale: 1
                    });
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            dotsRef.current.forEach(dot => {
                // Calculate distance to mouse
                const dx = mouseRef.current.x - dot.x;
                const dy = mouseRef.current.y - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Interaction logic
                if (dist < proximity) {
                    const force = (proximity - dist) / proximity;
                    dot.scale = 1 + force * 1.5; // Scale up
                    dot.color = activeColor;
                } else {
                    dot.scale = gsap.utils.interpolate(dot.scale, 1, 0.1); // Return to normal
                    dot.color = baseColor;
                }

                ctx.fillStyle = dot.color;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, (dot.size / 2) * dot.scale, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(draw);
        };

        const handleMouseMove = (e) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        // window.addEventListener('mouseleave', handleMouseLeave); // Optional for window

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            // window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [dotSize, gap, baseColor, activeColor, proximity]);

    return (
        <div ref={containerRef} className="dot-grid">
            <div className="dot-grid__wrap">
                <canvas ref={canvasRef} className="dot-grid__canvas" />
            </div>
        </div>
    );
};

export default DotGrid;
