import React, { useState } from "react";
import Swal from "sweetalert2";

const PurchaseForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const purchaseData = {
      name: name,
      amount: amount,
      cost: Number(cost),
    };
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(purchaseData),
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
            title: "Purchase Added",
            text: "Purchase has been successfully added.",
          });
          // Clear the form fields
          setName("");
          setAmount("");
          setCost("");
        }
      })
      .catch((error) => {
        console.error("Error adding purchase:", error);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an error submitting your purchase. Please try again later.",
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a Purchase</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Purchase Name (Optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter the purchase name (optional)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Cost</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter cost"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary bg-blue-700">
          Submit Purchase
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;
