import React, { useState } from "react";
import Swal from "sweetalert2";

const DonationForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!amount || amount <= 0 || !Number.isInteger(Number(amount))) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Please enter a valid positive integer for the amount.",
      });
      return;
    }

    const donationData = {
      name: name || "Anonymous",
      amount: Number(amount),
    };

    // Send the data to the backend
    fetch(`${process.env.REACT_APP_API_URL}/donation`, {
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
            text: "Thank you for your generous donation!",
          });
          // Clear the form fields
          setName("");
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
      <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name (Optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your name (or leave empty for anonymous)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Donation Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter donation amount"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Donation
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
