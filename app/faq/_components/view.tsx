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
            answer: "We decided that it would be better and clearer for both employers and developers if we focus this platform specifically on React developers. Many other platforms become cluttered with developers who possess varying skillsets, making it harder for employers to find the right candidates."
        },
        {
            question: "What do I have to do as a developer?",
            answer: "Simply sign up and tell us more about yourself. If any employers become interested in you, they will reach out to you."
        },
        {
            question: "How is this better than traditional job boards?",
            answer: `Traditional job boards consume more money and time for employers, and more time and effort for developers. According to research conducted by the Society for Human Resource Management (SHRM), the average cost per hire for companies in the United States was around $4,129 in 2020. This includes expenses related to sourcing, recruiting, interviewing, hiring, and onboarding a new employee.
    
    However, for specialized or executive-level positions, the cost per hire can be much higher, potentially exceeding $10,000 or more. Additionally, if a company relies on external recruiters or staffing agencies, they may incur additional fees or commissions, further increasing the overall cost of hiring.
    `
        },
        {
            question: "Can I cancel the subscription?",
            answer: `Canceling the subscription is a simple process. Simply go to the billing section in your dashboard => Manage subscriptions => Cancel plan. Your subscription features will be revoked once the subscription period ends. You can also renew the subscription before the period ends.`
        },
        {
            question: "Can I register as a non-ReactJS developer?",
            answer: `Technically, you can, but you won't be sought after by employers.`
        },
        {
            question: "Do I have to pass a test to register?",
            answer: `No. Registration itself does not require passing any tests. However, we plan to add certain verification tests to check your React proficiency. Passing this verification will give you a badge that demonstrates your proficiency to employers.`
        },
    ];

    return (
        <div className='h-screen min-h-screen flex justify-center items-start py-32 relative'>
            <main className="max-w-7xl container flex flex-col relative z-10">
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