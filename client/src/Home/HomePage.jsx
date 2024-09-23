import React from "react";
import CrisisInformation from "../Crisis/CrisisInfrormations";
import { Link } from "react-router-dom";
import DonationCostGraph from "../Donation/DonationCostGraph";
import VolunteerList from "../Volunteer/VolunteerList";
import TotalDonations from "../Donation/TotalDonations";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full my-24 text-center">
        <TotalDonations />
      </div>

      <DonationCostGraph />
      <Link
        to="/donation"
        className="mt-20 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Donation Page
      </Link>
      <h1 className="text-3xl font-bold mb-4 mt-10 text-center">
        Crisis Information
      </h1>
      <div className="max-h-[800px] overflow-auto w-full ">
        <CrisisInformation type="Approved" />
      </div>
      <Link
        to="/crisis"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Crisis Page
      </Link>
      <h1 className="text-3xl font-bold mb-4 mt-10 text-center">
        Crisis Information
      </h1>
      <div className="max-h-[800px] overflow-auto w-full ">
        <VolunteerList type="Approved" />
      </div>
      <Link
        to="/volunteer"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Volunteer Page
      </Link>
      <footer className="mt-28"></footer>
    </div>
  );
};

export default HomePage;
