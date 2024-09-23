import React from "react";
import DonationList from "../Donation/DonationList";
import ReliefDonationForm from "./ReliefDonation/ReliefDonationForm";
import ReliefList from "./ReliefDonation/ReliefList";
import PurchaseForm from "./Purchase/PurchaseForm";
import Purchase from "./Purchase/Purchase";

const Inventory = () => {
  return (
    <div className="mx-28">
      <DonationList />
      <ReliefList />
      <ReliefDonationForm />
      <Purchase />
    </div>
  );
};

export default Inventory;
