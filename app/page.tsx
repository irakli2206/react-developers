import Image from "next/image";
import { Button } from "@/components/ui/button"
import Hero from "@/components/sections/home/Hero";
import OurDevs from "@/components/sections/home/OurDevs";

export default function Home() {
  return (
    <main className=" min-h-screen  p-24">
      <Hero />
      <OurDevs />
    </main>
  );
}
