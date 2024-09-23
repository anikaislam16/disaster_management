import React, { useState } from "react";

const DonationList = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [donations, setDonations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchDonations = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/donation/?startDate=${startDate}&endDate=${endDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDonations(data.donations);
        setTotalAmount(data.totalAmount);
      })
      .catch((error) => console.error("Error fetching donations:", error));
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold my-8">Money Donation List</h1>

      <div className="date-picker">
        <label className="ml-4">Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input input-bordered"
        />
        <label className="ml-4">End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input input-bordered"
        />
        <button
          onClick={fetchDonations}
          className="btn btn-primary ml-4 bg-blue-700"
        >
          Get Donations
        </button>
      </div>

      <div className="overflow-x-auto mt-6 ml-20">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations?.length > 0 ? (
              donations.map((donation, index) => (
                <tr key={donation.id}>
                  <td>{donation.name}</td>
                  <td>{donation.amount}</td>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No donations found for the selected dates.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mt-6 text-lg font-bold">Total Amount: {totalAmount}</h2>
    </div>
  );
};

export default DonationList;
