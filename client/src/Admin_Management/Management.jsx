import React from "react";
import CrisisInformation from "../Crisis/CrisisInfrormations";
import VolunteerList from "../Volunteer/VolunteerList";

const Management = () => {
  return (
    <div>
      <CrisisInformation type="notApproved" />
      <VolunteerList />
    </div>
  );
};

export default Management;
