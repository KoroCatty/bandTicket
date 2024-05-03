import Link from "next/link";

// react icons
import { FaArrowLeft } from "react-icons/fa";

const GoBackBtn = ({ href = "", text = "" }) => {
  return (
    <div className="container m-auto py-6 px-6">
      <Link
        href={href}
        className="text-blue-500 hover:text-blue-600 flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        {text}
      </Link>
    </div>
  );
};

export default GoBackBtn;
