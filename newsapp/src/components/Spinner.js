import React from "react";
import loading from "./loading.svg";

const Spinner = () => {
  return (
    <div
      className="text-center"
      style={{ marginTop: "100px", marginBottom: "100px" }}
    >
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
