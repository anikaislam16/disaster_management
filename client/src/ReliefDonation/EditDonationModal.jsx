import React, { useState } from "react";
import Swal from "sweetalert2";

const EditDonationModal = ({ donation, closeModal, refreshList }) => {
  const [type, setType] = useState(donation.type);
  const [amount, setAmount] = useState(donation.amount);
  const [date, setDate] = useState(donation.date);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    const updates = { type, amount, date };

    fetch(`${process.env.REACT_APP_API_URL}/relief/${donation.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Donation updated successfully",
            confirmButtonText: "OK",
          });
          refreshList();
          closeModal();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: data.error || "Error updating donation",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating donation:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An unexpected error occurred. Please try again.",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box bg-white p-6 rounded-md shadow-lg">
        <h2 className="font-bold text-lg">Edit Donation</h2>
        <div className="py-4">
          <label className="block">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input input-bordered w-full"
          />

          <label className="block mt-4">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full"
          />

          <label className="block mt-4">Date</label>
          <input
            type="date"
            value={new Date(date).toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="btn bg-blue-700 text-white mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="btn bg-blue-700 text-white "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDonationModal;
