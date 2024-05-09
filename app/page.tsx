import Image from "next/image";
import { Suspense } from "react";
// components
import Hero from "@/components/features/Home/Hero";
import Loading from "@/app/loading";
import Ticket from "@/components/features/Home/Tickets";
import SNS from "@/components/common/SNS";
import Merch from "@/components/features/Home/Merch";
import Gallery from "@/components/features/Home/Gallery";

export default function Home() {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>

      <div className="max-w-[1080px] mx-auto px-4 ">
        <Ticket />
        <Suspense fallback={<Loading />}>
          <Merch />
        </Suspense>
        <SNS />
        <Suspense fallback={<Loading />}>
          <Gallery />
        </Suspense>
      </div>
    </section>
  );
}
