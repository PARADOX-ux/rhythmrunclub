import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
    {
        question: "Where do we meet?",
        answer: "We meet at the main GKVK entrance gate (University of Agricultural Sciences). Look for the group in black/orange gear near the security check."
    },
    {
        question: "Is there a bag drop?",
        answer: "Yes! Several members bring cars and we coordinate a secure bag drop before the run starts. Just arrive 10 mins early."
    },
    {
        question: "What is the pace?",
        answer: "No ego, just vibes. We usually have groups ranging from 5:30/km to 7:30/km, plus a run/walk group. You will never run alone."
    },
    {
        question: "Do I need to register?",
        answer: "Nope. Just show up. We do have a WhatsApp group for coordination, but there are no fees or sign-up forms."
    }
]

export default function NewJoinerFAQ() {
    return (
        <section className="py-24 px-6 max-w-4xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-4">
                    FIRST TIME? <span className="text-orange-500">READ THIS.</span>
                </h2>
                <p className="text-zinc-400">Everything you need to know before your first Sunday.</p>
            </motion.div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} index={index} />
                ))}
            </div>
        </section>
    )
}

function FAQItem({ faq, index }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-white/10"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className={`text-xl font-medium transition-colors ${isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                    {faq.question}
                </span>
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <Minus className="text-orange-500" /> : <Plus className="text-zinc-600 group-hover:text-white" />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-zinc-400 leading-relaxed max-w-2xl px-1">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
