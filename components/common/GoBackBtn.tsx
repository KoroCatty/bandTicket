// react icons
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const GoBackBtn = ({ text = "" }) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      // ブラウザの履歴のエントリー数を返す
      router.back();
    } else {
      router.push("/admin"); // ブラウザの履歴がない場合は "/admin" に戻る
    }
  };

  return (
    <div className="container m-auto py-6 px-6">
      <button
        onClick={handleGoBack}
        className="text-blue-500 hover:text-blue-600 flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        {text}
      </button>
    </div>
  );
};

export default GoBackBtn;
