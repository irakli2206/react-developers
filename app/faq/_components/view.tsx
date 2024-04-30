'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React from 'react'

const FAQView = () => {

    const accordionData = [
        {
            question: "Why not include other tech besides ReactJS?",
            answer: "We've concluded that refining our platform to cater exclusively to React developers will enhance clarity and effectiveness for both employers and developers alike. Unlike other platforms, which often host a diverse range of skillsets among developers, this focused approach will streamline the process for employers, ensuring they can easily identify the ideal candidates for their needs."
        },
        {
            question: "What do I have to do as a developer?",
            answer: "Just register and share your details with us. If any employers find you intriguing, they'll get in touch with you directly."
        },
        {
            question: "How is this better than traditional job boards?",
            answer: `
            Conventional job boards not only drain more financial resources and time from employers but also demand increased effort from developers. Research from the Society for Human Resource Management (SHRM) reveals that the average cost per hire for U.S. companies hit approximately $4,129 in 2020. This figure encompasses expenses related to sourcing, recruitment, interviews, hiring processes, and new employee onboarding.
            
            For specialized or high-level positions, the cost per hire escalates significantly, potentially surpassing $10,000. Moreover, if a company relies on external recruiters or staffing agencies, they may encounter additional fees or commissions, further inflating the overall hiring costs.
    `
        },
        {
            question: "Can I cancel the subscription?",
            answer: `Ending your subscription is straightforward. Just navigate to the billing section in your dashboard, then select "Manage subscriptions" followed by "Cancel plan." Your subscription benefits will cease once the current period concludes. If you wish, you can also renew your subscription before it expires.`
        },
        {
            question: "Can I register as a non-ReactJS developer?",
            answer: `While technically possible, it's unlikely that employers will actively seek you out.`
        },
        {
            question: "Do I have to pass a test to register?",
            answer: `No, registering does not entail passing any tests initially. However, we intend to incorporate verification tests specifically for assessing your React proficiency. Successfully passing these tests will earn you a badge, showcasing your skills to potential employers.`
        },
    ];

    return (
        <div className='h-screen min-h-screen w-full flex justify-center items-start py-32 relative'>
            <main className="max-w-7xl container flex flex-col relative z-10 mx-auto">
                <p className='text-primary font-medium text-sm mb-2'>Frequently asked questions</p>
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold">Everything you need to know about ReactFind</h1>

                <Accordion type="single" collapsible className="w-full mt-8">
                    {accordionData.map(({ question, answer }) => {

                        return (
                            <AccordionItem value={question}>
                                <AccordionTrigger bigIcon={false} className="text-lg lg:text-xl text-start">{question}</AccordionTrigger>
                                <AccordionContent className="text-base">
                                    {answer}
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}


                </Accordion>
            </main>

            {/* <div className="w-[400px] h-[400px] blur-3xl bg-blue-400 absolute rounded-full left-0 bottom-0 -translate-x-1/2 translate-y-1/2"></div> */}
        </div>
    )
}

export default FAQView