'use client';
import {
    memo,
    useState,
    useEffect,
    useRef,
    forwardRef,
} from 'react';
import {
    motion,
    useAnimation,
    useInView,
    useMotionTemplate,
    useMotionValue,
} from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User, Activity, Map, Timer, Zap, Trophy, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// ==================== Input Component ====================

const Input = memo(
    forwardRef(function Input(
        { className, type, ...props },
        ref
    ) {
        const radius = 100;
        const [visible, setVisible] = useState(false);

        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({
            currentTarget,
            clientX,
            clientY,
        }) {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          #f97316,
          transparent 80%
        )
      `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className='group/input rounded-lg p-[2px] transition duration-300'
            >
                <input
                    type={type}
                    className={cn(
                        `shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-zinc-900/80 px-3 py-2 text-sm text-white transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:ring-[2px] focus-visible:ring-orange-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 shadow-[0px_0px_1px_1px_#27272a]`,
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </motion.div>
        );
    })
);

Input.displayName = 'Input';

// ==================== BoxReveal Component ====================

const BoxReveal = memo(function BoxReveal({
    children,
    width = 'fit-content',
    boxColor,
    duration,
    overflow = 'hidden',
    position = 'relative',
    className,
}) {
    const mainControls = useAnimation();
    const slideControls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            slideControls.start('visible');
            mainControls.start('visible');
        } else {
            slideControls.start('hidden');
            mainControls.start('hidden');
        }
    }, [isInView, mainControls, slideControls]);

    return (
        <section
            ref={ref}
            style={{
                position: position,
                width,
                overflow,
            }}
            className={className}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial='hidden'
                animate={mainControls}
                transition={{ duration: duration ?? 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
            <motion.div
                variants={{ hidden: { left: 0 }, visible: { left: '100%' } }}
                initial='hidden'
                animate={slideControls}
                transition={{ duration: duration ?? 0.5, ease: 'easeIn' }}
                style={{
                    position: 'absolute',
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    background: boxColor ?? '#f97316',
                    borderRadius: 4,
                }}
            />
        </section>
    );
});

// ==================== OrbitingCircles Component ====================

const OrbitingCircles = memo(function OrbitingCircles({
    className,
    children,
    reverse = false,
    duration = 20,
    delay = 10,
    radius = 50,
    path = true,
}) {
    return (
        <>
            {path && (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    version='1.1'
                    className='pointer-events-none absolute inset-0 size-full'
                >
                    <circle
                        className='stroke-white/5 stroke-1'
                        cx='50%'
                        cy='50%'
                        r={radius}
                        fill='none'
                    />
                </svg>
            )}
            <div
                style={{
                    '--duration': duration,
                    '--radius': radius,
                    '--delay': -delay,
                }}
                className={cn(
                    'absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1000ms)]',
                    { '[animation-direction:reverse]': reverse },
                    className
                )}
            >
                {children}
            </div>
        </>
    );
});

// ==================== TechOrbitDisplay Component ====================

const TechOrbitDisplay = memo(function TechOrbitDisplay({
    iconsArray,
    text = 'RHYTHM',
}) {
    return (
        <section className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden'>
            <span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-gray-500 bg-clip-text text-center text-8xl font-black leading-none text-transparent tracking-tighter opacity-100 mix-blend-difference z-10'>
                {text}
            </span>

            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full"></div>

            {iconsArray.map((icon, index) => (
                <OrbitingCircles
                    key={index}
                    className={icon.className}
                    duration={icon.duration}
                    delay={icon.delay}
                    radius={icon.radius}
                    path={icon.path}
                    reverse={icon.reverse}
                >
                    <div className="bg-black/50 border border-white/10 p-3 rounded-full backdrop-blur-md text-white hover:text-orange-500 hover:scale-110 transition-all duration-300 hover:border-orange-500/50">
                        {icon.component()}
                    </div>
                </OrbitingCircles>
            ))}
        </section>
    );
});

// ==================== AnimatedForm Component ====================

const AnimatedForm = memo(function AnimatedForm({
    header,
    subHeader,
    fields,
    submitButton,
    textVariantButton,
    errorField,
    fieldPerRow = 1,
    onSubmit,
    googleLogin,
    goTo,
    isLoginMode,
    toggleMode
}) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleVisibility = () => setVisible(!visible);

    const bottomGradient = (
        <>
            <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent' />
            <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-500 to-transparent' />
        </>
    );

    return (
        <section className='flex flex-col gap-6 w-full max-w-[350px] mx-auto z-20 relative'>
            <div className="space-y-1">
                <BoxReveal boxColor='#f97316' duration={0.3}>
                    <h2 className='font-black italic text-4xl text-white tracking-tighter'>
                        {header}
                    </h2>
                </BoxReveal>

                {subHeader && (
                    <BoxReveal boxColor='#f97316' duration={0.3} className='pb-2'>
                        <p className='text-zinc-500 text-sm font-medium tracking-wide'>
                            {subHeader}
                        </p>
                    </BoxReveal>
                )}
            </div>

            {/* GOOGLE LOGIN */}
            {googleLogin && (
                <>
                    <BoxReveal
                        boxColor='#f97316'
                        duration={0.3}
                        overflow='visible'
                        width='unset'
                    >
                        <button
                            className='group/btn relative bg-zinc-900/50 w-full rounded-lg border border-zinc-800 h-12 font-bold hover:bg-zinc-800 transition-all cursor-pointer flex items-center justify-center gap-3 backdrop-blur-sm hover:border-zinc-700'
                            type='button'
                            onClick={signInWithGoogle}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span className="text-white text-sm">CONTINUE WITH GOOGLE</span>
                            {bottomGradient}
                        </button>
                    </BoxReveal>

                    <div className="flex items-center gap-4 py-2 opacity-50">
                        <hr className='flex-1 border-dashed border-zinc-700' />
                        <p className='text-zinc-500 text-[10px] font-black uppercase tracking-widest'>OR</p>
                        <hr className='flex-1 border-dashed border-zinc-700' />
                    </div>
                </>
            )}

            {/* EMAIL FORM */}
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                {fields.map((field) => (
                    <section key={field.label} className='flex flex-col gap-2'>
                        <BoxReveal
                            width='100%'
                            boxColor='#f97316'
                            duration={0.3}
                            className='flex flex-col space-y-1.5 w-full'
                        >
                            <label className="text-[10px] font-black text-zinc-500 uppercase ml-1 tracking-wider">{field.label}</label>
                            <section className='relative'>
                                <Input
                                    type={
                                        field.type === 'password'
                                            ? visible
                                                ? 'text'
                                                : 'password'
                                            : field.type
                                    }
                                    id={field.label}
                                    placeholder={field.placeholder}
                                    onChange={field.onChange}
                                />

                                {field.type === 'password' && (
                                    <button
                                        type='button'
                                        onClick={toggleVisibility}
                                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-white transition-colors'
                                    >
                                        {visible ? (
                                            <Eye className='h-4 w-4' />
                                        ) : (
                                            <EyeOff className='h-4 w-4' />
                                        )}
                                    </button>
                                )}
                            </section>
                        </BoxReveal>
                    </section>
                ))}

                <BoxReveal
                    width='100%'
                    boxColor='#f97316'
                    duration={0.3}
                    overflow='visible'
                >
                    <button
                        className='relative group/btn bg-white text-black block w-full rounded-lg h-12 font-black italic tracking-wider shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
              transform transition-all active:scale-[0.98] hover:bg-orange-500 hover:text-white hover:scale-[1.02]'
                        type='submit'
                    >
                        {submitButton} &rarr;
                        {bottomGradient}
                    </button>
                </BoxReveal>

                {/* TOGGLE LOGIN/SIGNUP */}
                <BoxReveal boxColor='#f97316' duration={0.3}>
                    <section className='mt-2 text-center'>
                        <button
                            type="button"
                            className='text-xs font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-wide'
                            onClick={toggleMode}
                        >
                            {isLoginMode ? "Need an account? Sign Up" : "Already have an account? Login"}
                        </button>
                    </section>
                </BoxReveal>

            </form>
        </section>
    );
});

// ==================== MAIN EXPORT ====================

export default function AnimatedLogin() {
    const navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id.toLowerCase()]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLoginMode) {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
            } else {
                await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            }
            navigate('/activity');
        } catch (error) {
            console.error("Auth Error:", error);
            alert(error.message);
        }
    };

    const formFields = [
        {
            label: 'Email Address',
            type: 'email',
            placeholder: 'rhythm@runner.com',
            onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value }))
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: '••••••••',
            onChange: (e) => setFormData(prev => ({ ...prev, password: e.target.value }))
        }
    ];

    const iconsArray = [
        {
            component: () => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-full">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                    <line x1="21.17" x2="12" y1="8" y2="8" />
                    <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
                    <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
                </svg>
            ), // Reactish Atom
            className: "size-10",
            duration: 20,
            delay: 0,
            radius: 80,
            path: true
        },
        {
            component: () => (
                <svg viewBox="0 0 24 24" fill="none" className="size-full" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            ), // Stack/Pythonish
            className: "size-12",
            duration: 25,
            delay: 10,
            radius: 170,
            path: true
        },
        {
            component: () => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-full">
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
            ), // Command/NextJS-ish
            className: "size-10",
            duration: 15,
            delay: 5,
            radius: 130,
            path: true,
            reverse: true
        },
        {
            component: () => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-full">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                </svg>
            ), // Code/HTML
            className: "size-14",
            duration: 30,
            delay: 15,
            radius: 240,
            path: true
        },
        {
            component: () => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-full">
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                    <path d="M10 13l-2 2 2 2" />
                    <path d="M14 17l2-2-2-2" />
                </svg>
            ), // File JSON
            className: "size-8",
            duration: 22,
            delay: 8,
            radius: 190,
            path: true,
            reverse: true
        },
    ];

    return (
        <div className="flex min-h-screen w-full bg-black font-sans overflow-hidden">

            {/* Left Side: Orbit Display (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 items-center justify-center relative border-r border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(#333 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>

                <TechOrbitDisplay iconsArray={iconsArray} text="RHYTHM" />
            </div>

            {/* Right Side: Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
                {/* Mobile Background: simplified */}
                <div className="absolute inset-0 lg:hidden opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(#333 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>

                <AnimatedForm
                    header={isLoginMode ? "WELCOME BACK" : "JOIN THE CLUB"}
                    subHeader={isLoginMode ? "Sign in to access your dashboard." : "Create an account to start tracking."}
                    fields={formFields}
                    submitButton={isLoginMode ? "LOG IN" : "CREATE ACCOUNT"}
                    googleLogin="Google"
                    onSubmit={handleSubmit}
                    isLoginMode={isLoginMode}
                    toggleMode={() => setIsLoginMode(!isLoginMode)}
                />

                {/* Corner Decor */}
                <div className="absolute top-0 right-0 p-10 hidden lg:block">
                    <div className="w-20 h-20 border-t-2 border-r-2 border-white/10 rounded-tr-3xl"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-10 hidden lg:block">
                    <div className="w-20 h-20 border-b-2 border-l-2 border-white/10 rounded-bl-3xl"></div>
                </div>
            </div>
        </div>
    );
}
