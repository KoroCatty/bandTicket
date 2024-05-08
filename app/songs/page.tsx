"use client";

import { useState, useRef } from "react";
import Image from "next/image";

// components
import HeroSongs from "@/components/features/Songs/HeroSongs";

// songs MP3
import song1 from "/public/songs/music1.mp3";
import song2 from "/public/songs/music2.mp3";
import song3 from "/public/songs/music3.mp3";
import song4 from "/public/songs/music4.mp3";
import song5 from "/public/songs/music5.mp3";

const songs = [song1, song2, song3, song4, song5];

type SongRef = HTMLAudioElement | null;

const SongsPage = () => {
  // <audio>要素の配列を参照するためのaudioRefsというオブジェクト定義
  const audioRefs = useRef<SongRef[]>([]);

  // 曲ごとの再生状態を管理するisPlayingの状態変数
  // 曲の数だけ要素を持ち、すべての曲の再生状態が初期値falseで設定
  const [isPlaying, setIsPlaying] = useState<boolean[]>(
    Array(songs.length).fill(false),
  );

  const handlePlay = (index: number) => {
    // audioRefs.current[index]を使用することで特定の曲の<audio>要素にアクセス
    const audioRef = audioRefs.current[index];
    if (audioRef) {
      // 一時停止中の場合は一時停止を解除してから再生する
      if (audioRef.paused) {
        audioRef.play();
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

  //停止ボタンがクリックされた時に実行されるhandlePause関数を定義
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

  return (
    <>
      <HeroSongs />

      <section className="max-w-[1080px] mx-auto px-4 py-8 ">
        <h2 className="text-3xl font-bold text-center mb-10">Music List</h2>

        <div className="flex justify-center items-center gap-10 max-[480px]:flex-wrap max-[768px]:gap-5">
          {songs.map((song, index) => (
            <div
              key={index}
              className="hover:scale-110 hover:opacity-75 transition-all duration-300 cursor-pointer"
            >
              <audio
                // 式を使い、取得した <audio> 要素の参照を audioRefs.current 配列の適切な位置に格納
                ref={(audioRef) => {
                  audioRefs.current[index] = audioRef;
                }}
                src={song}
              />
              {!isPlaying[index] && (
                <>
                  <Image
                    onClick={() => handlePlay(index)}
                    src="/images/cd_colored.png"
                    className="cdImg"
                    alt="CD image"
                    width={100}
                    height={100}
                  />
                </>
              )}
              {isPlaying[index] && (
                <Image
                  onClick={() => handlePause(index)}
                  src="/images/stop_music.png"
                  className="cdImg"
                  alt="CD image"
                  width={100}
                  height={100}
                />
              )}
              {/* 常に表示されるタイトル */}
              <h2 className="cdCaption">{`Music ${index + 1}`}</h2>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SongsPage;
