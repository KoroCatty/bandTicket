// components
import HeroSongs from "@/components/features/Songs/HeroSongs";
import SongsList from "@/components/features/Songs/SongsList";
import { Suspense } from "react";
const SongsPage = () => {
  return (
    <>
      <HeroSongs />
      <Suspense fallback={<div>Loading...</div>}>
        <SongsList />
      </Suspense>
    </>
  );
};

export default SongsPage;
