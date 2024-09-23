import React from "react";
import DonationList from "../Donation/DonationList";
import ReliefDonationForm from "../ReliefDonation/ReliefDonationForm";
import ReliefList from "../ReliefDonation/ReliefList";

const Inventory = () => {
  return (
    <div>
      <DonationList />
      <ReliefList />
      <ReliefDonationForm />
    </div>
  );
};

export default Inventory;
