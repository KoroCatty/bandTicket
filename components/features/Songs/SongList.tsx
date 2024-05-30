"use client";

import { useState, useRef } from "react";
import Image from "next/image";
// songs MP3
import song1 from "/public/songs/music1.mp3";
import song2 from "/public/songs/music2.mp3";
import song3 from "/public/songs/music3.mp3";
import song4 from "/public/songs/music4.mp3";
import song5 from "/public/songs/music5.mp3";

const songs = [
  {
    id: 1,
    title: "Thunderstruck",
    artist: "Rock Smith",
    album: "Electric Nights",
    duration: "2:16",
    image: "/images/songs/song1.jpg",
    src: song1,
  },
  {
    id: 2,
    title: "Rising Flames",
    artist: "The Rockin' Rebels",
    album: "Rebel Yell",
    duration: "2:28",
    image: "/images/songs/song2.jpg",
    src: song2,
  },
  {
    id: 3,
    title: "Midnight Riot",
    artist: "Vince Rocker Trio",
    album: "Rock Revolution",
    duration: "5:09",
    image: "/images/songs/song3.jpg",
    src: song3,
  },
  {
    id: 4,
    title: "Echoes of Thunder",
    artist: "Carl Rockwin",
    album: "Electric Celebration",
    duration: "2:06",
    image: "/images/songs/song4.jpg",
    src: song4,
  },
  {
    id: 5,
    title: "Ride the Lightning",
    artist: "Ella Rockster",
    album: "Rocking Winter",
    duration: "2:56",
    image: "/images/songs/song5.jpg",
    src: song5,
  },
];

type SongRef = HTMLAudioElement | null;

const SongList = () => {
  const audioRefs = useRef<SongRef[]>([]);

  // 曲の数だけの要素を持つ配列を作成し、全ての要素をfalseで初期化
  const [isPlaying, setIsPlaying] = useState<boolean[]>(
    Array(songs.length).fill(false),
  );
  const [isPlayingImg, setIsPlayingImg] = useState<string>("");
  const [isPlayingTitle, setIsPlayingTitle] = useState<string>("");

  const handlePlay = (index: number, imgSrc: string, songTitle: string) => {
    const audioRef = audioRefs.current[index];
    if (audioRef) {
      if (audioRef.paused) {
        audioRef.play();
        setIsPlayingImg(imgSrc);
        setIsPlayingTitle(songTitle);
      } else {
        audioRef.pause();
        audioRef.currentTime = 0;
        audioRef.play();
      }
      setIsPlaying((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handlePause = (index: number) => {
    const audioRef = audioRefs.current[index];
    if (audioRef) {
      audioRef.pause();
      setIsPlaying((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
  };

  // when the song ends
  const handleEnded = (index: number) => {
    setIsPlaying((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  return (
    <section className="bg-gray-900 text-white min-h-screen pt-4">
      <div className="container mx-auto p-4 max-w-[1080px] max-[480px]:px-2 ">
        <div className="bg-gradient-to-b">
          <div className="flex items-center">
            <div className="w-[120px] h-[120px] flex-shrink-0 rounded-lg ">
              {isPlaying && (
                <Image
                  src={isPlayingImg || "/images/cd_colored.png"}
                  alt="Album Cover"
                  width={100}
                  height={100}
                  className="max-[350px]:w-[80px] rounded-lg"
                  priority
                />
              )}
            </div>
            <div className="ml-4">
              {isPlaying && (
                <h2 className="text-4xl font-bold max-[480px]:text-2xl ">
                  {isPlayingTitle}
                </h2>
              )}
              <p className="text-sm text-gray-300"> {songs.length} songs</p>
            </div>
          </div>

          <div className="flex justify-between items-center border-b border-gray-700 mt-4">
            <div className="flex items-center space-x-4 text-gray-400">
              <p>#</p>
              <p>TITLE</p>
            </div>
            <div className="flex items-center space-x-8 text-gray-400">
              <p>ALBUM</p>
              <p className="max-[480px]:hidden ">DURATION</p>
            </div>
          </div>

          <div className="space-y-4">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center justify-between hover:bg-gray-800 py-2"
              >
                <div className="flex items-center space-x-4">
                  <p className="text-gray-400">{song.id}</p>
                  {!isPlaying[index] && (
                    <>
                      <Image
                        src={song.image}
                        alt="Album Cover"
                        width={60}
                        height={60}
                        className="rounded cursor-pointer max-[480px]:w-[40px] "
                        onClick={() =>
                          handlePlay(index, song.image, song.title)
                        }
                      />
                    </>
                  )}
                  {isPlaying[index] && (
                    <>
                      <Image
                        src="/images/songs/stop.jpg"
                        alt="Stop"
                        width={60}
                        height={60}
                        className="cursor-pointer relative max-[480px]:w-[40px]"
                        onClick={() => handlePause(index)}
                      />
                    </>
                  )}
                  <div>
                    <p className="max-[350px]:text-[0.9rem] ">{song.title}</p>
                    <p className="max-[350px]:text-[0.9rem] text-gray-400">
                      {song.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-8 max-[350px]:text-[0.9rem]">
                  <p className="text-gray-400">{song.album}</p>
                  <p className="text-gray-400 max-[480px]:hidden ">
                    {song.duration}
                  </p>
                </div>
                <audio
                  ref={(audioRef) => {
                    audioRefs.current[index] = audioRef;
                  }}
                  src={song.src}
                  onEnded={() => handleEnded(index)}
                ></audio>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SongList;
