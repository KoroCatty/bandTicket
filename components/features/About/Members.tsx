import Image from "next/image";

const members = [
  {
    name: "John Doe",
    role: "Vocalist",
    image: "/images/members/member4.jpg",
    desc: "John Doe, the charismatic lead vocalist of the band, has captivated audiences with his powerful and emotive voice. With a range that spans multiple octaves, John's performances are both intense and heartfelt. Off stage, he is known for his songwriting skills, crafting lyrics that resonate deeply with the band’s fans. His dedication to music and his ability to connect with listeners have made him a beloved figure in the music community.",
  },
  {
    name: "Jane Smith",
    role: "Guitarist",
    image: "/images/members/member3.jpg",
    desc: "Jane Smith is the dynamic lead guitarist of the band, renowned for her technical prowess and innovative playing style. She blends classical guitar techniques with modern rock elements, creating a unique sound that defines the band’s musical identity. Jane is also a mentor to young musicians, sharing her knowledge and passion for music through workshops and online tutorials. Her energetic performances and musical versatility make her a standout performer.",
  },
  {
    name: "Jim Brown",
    role: "Bassist",
    image: "/images/members/member1.jpg",
    desc: "Jim Brown, the band's bassist, is the backbone of their sound, providing rich, rhythmic bass lines that complement the ensemble’s melodies. His deep understanding of music theory allows him to weave complex patterns that enhance the band’s overall sound. Off stage, Jim is an avid collector of vintage bass guitars and is involved in various music production projects. His steady demeanor and solid musical foundation make him a pivotal member of the band.",
  },
  {
    name: "Jack Taylor",
    role: "Drummer",
    image: "/images/members/member2.jpg",
    desc: "Jack Taylor, the drummer, is celebrated for his impeccable timing and explosive energy behind the drum kit. His ability to switch between different drumming styles seamlessly is a testament to his versatility and extensive training. Jack is not only the driving force during performances but also contributes to the band's arrangements and production. Known for his collaborative spirit and engaging personality, he often leads community drum circles and music therapy sessions.",
  },
];

const Members = () => {
  return (
    <section className="max-w-[1080px] mx-auto ">
      {members.map((member, idx) => (
        <div
          key={idx}
          className={`flex justify-center gap-8 my-14 ${(idx + 1) % 2 === 0 ? "flex-row-reverse" : ""}
        max-[767px]:flex-col max-[767px]:items-center max-[767px]:text-center max-[767px]:my-8 max-[767px]:px-4 max-[767px]:gap-4 max-[767px]:mt-8 max-[767px]:mb-8
        `}
        >
          <div
            className={`${(idx + 1) % 2 === 0 ? "w-[40%]" : "w-[45%] "} max-[767px]:w-[100%] `}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={300}
              height={300}
              className="w-[100%]"
            />
          </div>
          <div
            className={`mt-[-20px] ${(idx + 1) % 2 === 0 ? "w-[45%]" : "w-[40%] "} max-[767px]:w-[100%] `}
          >
            <h3 className="text-[3rem] leading-11">{member.name}</h3>
            <p className="text-[1.4rem] font-bold">{member.role}</p>
            <p className="text-[1rem] max-[480px]:text-start max-[480px]:mt-2 max-[480px]:mb-6 max-[480px]:text-[0.9rem] ">
              {member.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Members;
