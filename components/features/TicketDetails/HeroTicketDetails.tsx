import Image from "next/image";

// コンポーネントに渡されるチケットの型を定義
interface HeroTicketDetailsProps {
  image: string;
}

const HeroTicketDetails = ({ image }: HeroTicketDetailsProps) => {
  return (
    <>
      <section>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1 relative">
            <Image
              src={`${image}`}
              alt={image}
              width={0}
              height={0}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1000px) 100vw, 50vw"
              className="object-cover h-[300px] w-full brightness-90 blur-[3px] grayscale-80 opacity-90
              max-[480px]:h-[160px] max-[480px]:object-cover"
            />
            <div className="absolute top-[50%] left-[50%]  transform -translate-x-[50%] -translate-y-1/2 max-[480px]:w-[80%] ">
              <h1 className="text-center text-[3rem] tracking-wider font-bold mt-10 max-[480px]:text-[1.9rem] ">
                Ticket Details
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroTicketDetails;
