import Image from "next/image";
import { Suspense } from "react";
// components
import Hero from "@/components/features/Home/Hero";
import Loading from "@/app/loading";
import Ticket from "@/components/features/Home/Tickets";

export default function Home() {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>

      <div className="max-w-[1080px] mx-auto px-4 ">
        <Ticket />
      </div>
    </section>
  );
}
