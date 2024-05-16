import { ReactNode } from "react";
import React from "react";

const TitleComponent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative text-[5rem] max-[1000px]:text-[4.8rem]  max-[768px]:text-[5rem] max-[650px]:text-[4rem] max-[480px]:text-[3rem]">
      <h2 className="text-center mb-6  font-bold leading-[1.2]">{children}</h2>
      <span className=" absolute top-[-30%] left-[18%] opacity-10 mb-6 font-bold leading-[1.2] max-[1000px]:left-[20%] max-[768px]:left-[10%] max-[480px]:left-[10%]">
        {children}
      </span>
    </div>
  );
};

export default TitleComponent;
