'use client'

import React, { useRef } from 'react'
import DeveloperCard from '../DeveloperCard'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from '@/components/ui/button'
import { UsersRound } from 'lucide-react'


const devData = [
    {
        title: 'Fullstack Developer',
        rate: 60,
        stack: ['React', 'Next', 'Gatsby'],
        description: 'Ambitious front-end developer with 5 years of React experience under my belt. I love building intuitive and highly performant UI/UX.',
        terms: ['Full-time', 'Part-time', 'Remote', 'On-site'],
    },
    {
        title: 'UI/UX Designer',
        rate: 70,
        stack: ['Figma', 'Sketch', 'Adobe XD'],
        description: 'Creative UI/UX designer with a keen eye for detail and 4 years of experience in designing engaging and user-friendly interfaces. Proficient in industry-standard design tools and passionate about creating memorable user experiences.',
        terms: ['Full-time', 'Remote', 'On-site'],
    },
    {
        title: 'Backend Engineer',
        rate: 75,
        stack: ['Node.js', 'Express', 'MongoDB'],
        description: 'Seasoned backend engineer specializing in Node.js and relational databases. Proficient in designing and implementing scalable and efficient server-side architectures. Committed to delivering high-quality, maintainable code.',
        terms: ['Full-time', 'Remote'],
    },
    {
        title: 'Mobile App Developer',
        rate: 80,
        stack: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        description: 'Skilled mobile app developer with expertise in iOS and Android development. Experienced in building native and cross-platform applications using React Native and Flutter. Passionate about crafting seamless user experiences across mobile platforms.',
        terms: ['Full-time', 'Part-time', 'Remote'],
    },
    {
        title: 'Data Scientist',
        rate: 85,
        stack: ['Python', 'TensorFlow', 'Scikit-learn'],
        description: 'Experienced data scientist proficient in Python and machine learning algorithms. Skilled in data analysis, visualization, and predictive modeling. Passionate about extracting actionable insights from complex datasets.',
        terms: ['Full-time', 'Remote'],
    },
    {
        title: 'Frontend Developer',
        rate: 65,
        stack: ['HTML', 'CSS', 'JavaScript'],
        description: 'Creative frontend developer with a passion for crafting responsive and visually appealing web interfaces. Proficient in modern web technologies including HTML, CSS, and JavaScript. Dedicated to delivering high-quality code and user experiences.',
        terms: ['Full-time', 'Remote', 'On-site'],
    },
    {
        title: 'DevOps Engineer',
        rate: 75,
        stack: ['Docker', 'Kubernetes', 'AWS'],
        description: 'Experienced DevOps engineer with expertise in containerization, orchestration, and cloud technologies. Skilled in automating infrastructure deployment and optimizing CI/CD pipelines. Committed to streamlining development processes and enhancing system reliability.',
        terms: ['Full-time', 'Remote'],
    },
    {
        title: 'Game Developer',
        rate: 70,
        stack: ['Unity', 'C#', 'Unreal Engine'],
        description: 'Passionate game developer with a knack for creating immersive gaming experiences. Experienced in game design, development, and optimization. Proficient in Unity and C#, with a strong understanding of game mechanics and physics.',
        terms: ['Full-time', 'Part-time', 'Remote'],
    },
    {
        title: 'Blockchain Developer',
        rate: 80,
        stack: ['Solidity', 'Web3.js', 'Ethereum'],
        description: 'Blockchain enthusiast with expertise in Solidity smart contract development and decentralized application (DApp) deployment. Skilled in Ethereum development and web3.js integration. Passionate about exploring the potential of blockchain technology.',
        terms: ['Full-time', 'Remote'],
    },
    {
        title: 'Machine Learning Engineer',
        rate: 85,
        stack: ['Python', 'TensorFlow', 'PyTorch'],
        description: 'Machine learning enthusiast with a strong background in Python programming and deep learning frameworks. Experienced in building and deploying machine learning models for various applications. Passionate about leveraging AI to solve complex problems.',
        terms: ['Full-time', 'Remote'],
    }
];

const OurDevs = () => {
    const plugin = useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true })
    )

    return (
        <section className='py-24'>
            <main className='w-full flex flex-col '>
                <div className="flex justify-between">
                    <h2 className='scroll-m-20 text-3xl font-bold  tracking-tight mb-4'>Our developers</h2>
                    <Button size='sm' variant='outline' className='rounded-full drop-shadow-sm hover:drop-shadow-none'><UsersRound size='16px' className='mr-2' /> View all</Button>
                </div>


                <Carousel className="w-full relative"
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        
                            {devData.map((dev, index) => (
                                <CarouselItem key={index} className='flex justify-center basis-1/3'>
                                    <DeveloperCard {...dev} />
                                </CarouselItem>
                            ))}
                        
                    </CarouselContent>
                    <div className='absolute top-0 w-full h-full z-50 from-white via-transparent to-white bg-gradient-to-r' ></div>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </main>
        </section>
    )
}

export default OurDevs