"use client";

// react-spinners
import ClipLoader from "react-spinners/ClipLoader";

// css
const override = {
  display: "block",
  margin: "0 auto",
};

const SpinnerClient = ({ loading }: any) => {
  return (
    <ClipLoader
      color="#3B82F6"
      size={150}
      loading={loading}
      cssOverride={override}
      aria-label="Loading..."
    />
  );
};

export default SpinnerClient;
