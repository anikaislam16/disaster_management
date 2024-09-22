import React, { useContext, useEffect } from "react";
import CrisisForm from "./CrisisForm";
import CrisisInformation from "./CrisisInfrormations";
import { UserContext } from "../context/UserProvider";

const Crisis = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="mt-4">
      <CrisisInformation type="notApproved" />
      <CrisisForm />
    </div>
  );
};

export default Crisis;
