import React from "react";
import CrisisForm from "./CrisisForm";
import CrisisInformation from "./CrisisInfrormations";

const Crisis = () => {
  return (
    <div className="mt-4">
      <CrisisInformation />
      <CrisisForm />
    </div>
  );
};

export default Crisis;
