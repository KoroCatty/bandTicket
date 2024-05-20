// components
import HeroSongs from "@/components/features/Songs/HeroSongs";
import SongList from "@/components/features/Songs/SongList";
import { Suspense } from "react";
const SongsPage = () => {
  return (
    <>
      <HeroSongs />
      <Suspense fallback={<div>Loading...</div>}>
        <SongList />
      </Suspense>
    </>
  );
};

export default SongsPage;
