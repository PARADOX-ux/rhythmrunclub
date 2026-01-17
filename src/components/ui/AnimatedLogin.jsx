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
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
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
                        `shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900/50 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-orange-500`,
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

// ==================== Ripple Component ====================

const Ripple = memo(function Ripple({
    mainCircleSize = 210,
    mainCircleOpacity = 0.24,
    numCircles = 11,
    className = '',
}) {
    return (
        <section
            className={`absolute inset-0 flex items-center justify-center
        bg-transparent
        [mask-image:linear-gradient(to_bottom,black,transparent)]
        dark:[mask-image:linear-gradient(to_bottom,white,transparent)] ${className}`}
        >
            {Array.from({ length: numCircles }, (_, i) => {
                const size = mainCircleSize + i * 70;
                const opacity = mainCircleOpacity - i * 0.03;
                const animationDelay = `${i * 0.06}s`;
                const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';
                const borderOpacity = 5 + i * 5;

                return (
                    <span
                        key={i}
                        className='absolute animate-ripple rounded-full bg-orange-500/10 border'
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            opacity: opacity,
                            animationDelay: animationDelay,
                            borderStyle: borderStyle,
                            borderWidth: '1px',
                            borderColor: `rgba(249, 115, 22, ${borderOpacity / 100})`, // Orange border
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                );
            })}
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
        <section className='flex flex-col gap-4 w-full max-w-sm mx-auto z-20 relative'>
            <BoxReveal boxColor='#f97316' duration={0.3}>
                <h2 className='font-bold text-3xl text-neutral-800 dark:text-neutral-200'>
                    {header}
                </h2>
            </BoxReveal>

            {subHeader && (
                <BoxReveal boxColor='#f97316' duration={0.3} className='pb-2'>
                    <p className='text-neutral-600 text-sm max-w-sm dark:text-neutral-300'>
                        {subHeader}
                    </p>
                </BoxReveal>
            )}

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
                            className='group/btn relative bg-zinc-900 w-full rounded-md border border-zinc-800 h-10 font-medium hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center gap-3'
                            type='button'
                            onClick={signInWithGoogle}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span className="text-white text-sm">Continue with Google</span>
                            {bottomGradient}
                        </button>
                    </BoxReveal>

                    <BoxReveal boxColor='#f97316' duration={0.3} width='100%'>
                        <section className='flex items-center gap-4 py-4'>
                            <hr className='flex-1 border-dashed border-zinc-700' />
                            <p className='text-zinc-500 text-xs uppercase'>or with email</p>
                            <hr className='flex-1 border-dashed border-zinc-700' />
                        </section>
                    </BoxReveal>
                </>
            )}

            {/* EMAIL FORM */}
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                {fields.map((field) => (
                    <section key={field.label} className='flex flex-col gap-2'>
                        <BoxReveal
                            width='100%'
                            boxColor='#f97316'
                            duration={0.3}
                            className='flex flex-col space-y-2 w-full'
                        >
                            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">{field.label}</label>
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
                                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition-colors'
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
                        className='relative group/btn bg-gradient-to-br from-orange-400 to-orange-600 block w-full text-white rounded-md h-10 font-bold shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
              transform transition-all active:scale-[0.98]'
                        type='submit'
                    >
                        {submitButton} &rarr;
                        {bottomGradient}
                    </button>
                </BoxReveal>

                {/* TOGGLE LOGIN/SIGNUP */}
                <BoxReveal boxColor='#f97316' duration={0.3}>
                    <section className='mt-4 text-center'>
                        <button
                            type="button"
                            className='text-sm text-zinc-400 hover:text-orange-500 transition-colors'
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
            label: 'Email',
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

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden font-sans">
            {/* Background Ripple & Orbit */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <Ripple mainCircleSize={300} numCircles={8} />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <AnimatedForm
                    header={isLoginMode ? "Welcome Back" : "Join the Club"}
                    subHeader={isLoginMode ? "Sign in to access your dashboard." : "Create an account to start tracking."}
                    fields={formFields}
                    submitButton={isLoginMode ? "LOGIN" : "CREATE ACCOUNT"}
                    googleLogin="Google"
                    onSubmit={handleSubmit}
                    isLoginMode={isLoginMode}
                    toggleMode={() => setIsLoginMode(!isLoginMode)}
                />
            </div>

            {/* Corner Decor */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-transparent"></div>
        </div>
    );
}
