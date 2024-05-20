import Image from "next/image";
import Link from "next/link";

// img
import FB from "/public/icons/Fb_w.svg";
import Insta from "/public/icons/Insta_w.svg";
import Spotify from "/public/icons/Spotify_w.svg";
import Twitter from "/public/icons/Twitter_w.svg";
import YT from "/public/icons/YouTube_w.svg";

const images = [
  {
    src: FB,
    alt: "Facebook Icon",
    link: "https://icons8.com",
  },
  {
    src: Insta,
    alt: "Instagram Icon",
    link: "https://icons8.com",
  },
  {
    src: Spotify,
    alt: "Spotify Icon",
    link: "https://icons8.com",
  },
  {
    src: Twitter,
    alt: "Twitter Icon",
    link: "https://icons8.com",
  },
  {
    src: YT,
    alt: "YouTube Icon",
    link: "https://icons8.com",
  },
];

// components
import NavLinks from "./NavLinks";

const Footer = () => {
  return (
    // md:flex-col-reverse
    <footer className="font-Freight  bg-[rgb(40,40,40)] pt-20 pb-20 sm:py-10 text-white px-4">
      <div className="mx-auto px-4 max-w-[860px]">
        <div className="flex flex-col md:flex-row  justify-between ">
          <div className="flex flex-col ">
            <h3 className="text-4xl mb-10 sm:text-3xl sm:mt-15">
              LATEST ON <span className="textShadow_wt text-4xl ml-3">X</span>
            </h3>

            <div className="flex mt-4 ml-4">
              {images.map((image, index) => (
                <a
                  href={image.link}
                  key={index}
                  className={index === 0 ? "first:ml-0 ml-4" : "ml-6"}
                >
                  <Image
                    width={120}
                    height={120}
                    src={image.src}
                    alt={image.alt}
                    className="w-8 h-8 sm:w-6 sm:h-6"
                  />
                </a>
              ))}
            </div>

            <h3 className="font-thin text-[3rem] mt-[6rem] mb-10 sm:mt-15 max-[768px]:mt-[4rem] textShadow_wt">
              NO NAME
            </h3>

            <p className="text-sm mt-2 mb-5">
              &copy; {new Date().getFullYear()} Band Tickets. All rights
              reserved.
              <br className="sm:hidden" /> | KZ-DEV
            </p>
          </div>

          <div className="mt-10 md:mt-0  mr-[4rem] max-[768px]:mr-0 ">
            <NavLinks propClass="flex-col" />
          </div>
        </div>

        <div className="underline tracking-wide flex center justify-center gap-8 mt-10 text-xl ">
          <Link href="/privacy" className="hover:text-slate-300">
            {" "}
            Privacy Policy{" "}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
