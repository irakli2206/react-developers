import Image from "next/image";
import { Button } from "@/components/ui/button"
import Hero from "@/components/sections/home/Hero";
import OurDevs from "@/components/sections/home/OurDevs";
import Features from "@/components/sections/home/Features";
import Reinforcement from "@/components/sections/home/Reinforcement";
import Summary from "@/components/sections/home/Summary";

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col gap-8 py-24 px-4 justify-between overflow-hidden">
      <Hero />
      <OurDevs />
      <Summary />
      <Reinforcement />
      <Features />
    </main>
  );
}
