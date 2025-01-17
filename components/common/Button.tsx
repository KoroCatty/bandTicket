import Link from "next/link";
import { ReactNode } from "react";

type ButtonComponentProps = {
  children: ReactNode;
  href: string;
};

const ButtonComponent = ({ href, children }: ButtonComponentProps) => {
  return (
    <Link
      href={href}
      className="bg-slate-800 max-w-[600px] mx-auto text-xl text-white py-6 mt-20 block text-center tracking-wide
      hover:scale-105 hover:textShadow_wt transition-all duration-300 
       max-[480px]:w-[70%] max-[480px]:mx-auto max-[480px]:py-4"
    >
      {children}
    </Link>
  );
};

export default ButtonComponent;
