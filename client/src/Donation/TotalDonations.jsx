import React, { useEffect, useState } from "react";

const TotalDonations = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/donation/total`
        );
        const data = await response.json();
        setTotalDonations(data.total_donations);
      } catch (error) {
        console.error("Error fetching total donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalDonations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="  ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Total Donations
      </h2>
      <p className="text-3xl font-bold text-blue-600">
        {totalDonations.toLocaleString()} BDT
      </p>
      <p className="text-sm text-gray-500 mt-1">Thank you for your support!</p>
    </div>
  );
};

export default TotalDonations;
