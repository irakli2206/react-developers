import Image from "next/image";
import { Button } from "@/components/ui/button"
import Hero from "@/components/sections/home/Hero";
import OurDevs from "@/components/sections/home/OurDevs";

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col gap-12 py-24 px-4 overflow-hidden">
      <Hero />
      <OurDevs />
    </main>
  );
}
