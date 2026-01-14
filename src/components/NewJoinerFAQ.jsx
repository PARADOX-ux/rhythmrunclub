import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from 'framer-motion'

export default function NewJoinerFAQ() {
    const faqs = [
        {
            id: "item-1",
            question: "What is the pace? Will I get left behind?",
            answer: "Absolutely not. We follow a 'No Drop' policy. We have pace groups ranging from 5:00/km (Speedsters) to 7:30+/km (Party Pace). Whether you are walking or sprinting, you have a squad."
        },
        {
            id: "item-2",
            question: "Where exactly do we meet?",
            answer: "We meet at the Yelahanka Main Gate (University of Agricultural Sciences). Look for the group stretching! We start exactly at 6:00 AM, so arrive 10 mins early."
        },
        {
            id: "item-3",
            question: "Is there a bag drop?",
            answer: "Yes! Several members bring cars. You can leave your keys/change of clothes in a designated car trunk before the run starts."
        },
        {
            id: "item-4",
            question: "Do I need to register?",
            answer: "Yes. However, joining our WhatsApp group is recommended for last-minute updates."
        }
    ]

    return (
        <section className="w-full flex justify-center py-12 px-6">
            <div className="w-full max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                        New Here? Everything you need to know.
                    </h2>
                </motion.div>

                <Accordion type="single" collapsible className="w-full space-y-2">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border-b border-slate-800">
                            <AccordionTrigger className="text-lg font-medium text-slate-400 hover:text-white hover:no-underline py-4 transition-colors text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-400 leading-relaxed text-base pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
