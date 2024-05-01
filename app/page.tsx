import Image from "next/image";
import { Button } from "@/components/ui/button"
import Hero from "@/components/sections/home/Hero";
import OurDevs from "@/components/sections/home/OurDevs";
import Features from "@/components/sections/home/Features";
import Reinforcement from "@/components/sections/home/Reinforcement";
import Summary from "@/components/sections/home/Summary";
import CTA from "@/components/sections/home/CTA";

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col gap-8  px-4 justify-between overflow-hidden">
      <div className="flex flex-col justify-between h-screen gap-8">
        <Hero />
        <OurDevs />

      </div>
      <Summary />
      <Reinforcement />
      <Features />
      <CTA />
    </main>
  );
}
