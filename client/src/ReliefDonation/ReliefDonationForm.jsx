import React, { useState } from "react";
import Swal from "sweetalert2";

const ReliefDonationForm = () => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!type || !location) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter both type and location.",
      });
      return;
    }

    const donationData = {
      type,
      location,
      amount,
    };

    // Send the data to the backend
    fetch(`${process.env.REACT_APP_API_URL}/relief`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: data.error,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Donation Added",
            text: "Thank you for your relief donation!",
          });
          // Clear the form fields
          setType("");
          setLocation("");
          setAmount("");
        }
      })
      .catch((error) => {
        console.error("Error adding donation:", error);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an error submitting your donation. Please try again later.",
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold ">Add New Relief goods</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter donation type (e.g., Food, Clothes)"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter relief amount"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter donation location"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary  bg-blue-700">
          Submit Donation
        </button>
      </form>
    </div>
  );
};

export default ReliefDonationForm;
