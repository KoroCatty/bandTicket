"use client";
// react-spinners
import ClipLoader from "react-spinners/ClipLoader";

// css
const override = {
  display: "block",
  margin: "0 auto",
};

const loading = ({ loading }: any) => {
  return (
    <ClipLoader
      color="#ffffff"
      size={60}
      loading={loading}
      cssOverride={override}
      aria-label="Loading..."
    />
  );
};

export default loading;
