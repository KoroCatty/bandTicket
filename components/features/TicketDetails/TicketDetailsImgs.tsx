import Image from "next/image";

// photo swipe gallery
import { Gallery, Item } from "react-photoswipe-gallery";

interface TicketDetailsImgsProps {
  images: string[];
}

// Dynamic Image Grid
const TicketDetailsImgs = ({ images }: TicketDetailsImgsProps) => {
  return (
    <Gallery>
      <section className="p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1024"
              height="650"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt={images[0]}
                  width={1000}
                  height={1000}
                  priority={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 1000px) 100vw, 50vw"
                  className="object-cover mx-auto rounded-xl hover:cursor-pointer"
                />
              )}
            </Item>
          ) : (
            // more than 1 and loop through them
            <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1  max-[768px]:px-6 ">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`
                ${images.length === 3 && index === 2 ? "col-span-2" : "col-span-1"}
              `}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1024"
                    height="650"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt={image}
                        width={1000}
                        height={1000}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1000px) 100vw, 50vw"
                        className="object-cover mx-auto rounded-xl hover:cursor-pointer hover:brightness-50 ease-in duration-100 "
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default TicketDetailsImgs;
