import { Suspense } from "react";
// components
import Hero from "@/components/features/Home/Hero";
import Loading from "@/app/loading";
import FeaturedTickets from "@/components/features/Home/FeaturedTickets";
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
        <Suspense fallback={<Loading />}>
          <FeaturedTickets />
          <Gallery />
        </Suspense>
        <SNS />
        <Suspense fallback={<Loading />}>
          <Merch />
        </Suspense>
      </div>
    </section>
  );
}
