import Image from "next/image";
import { Suspense } from "react";
// components
import Hero from "@/components/features/Home/Hero";
import Loading from "@/app/loading";

export default function Home() {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>
    </section>
  );
}
