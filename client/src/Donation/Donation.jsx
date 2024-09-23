import React from "react";
import DonationForm from "./DonationForm";
import DonationCostGraph from "./DonationCostGraph";
import TotalDonations from "./TotalDonations";

const Donation = () => {
  return (
    <div>
      <div className="w-full my-24 text-center">
        <TotalDonations />
      </div>
      <DonationForm />
      <DonationCostGraph />
    </div>
  );
};

export default Donation;
