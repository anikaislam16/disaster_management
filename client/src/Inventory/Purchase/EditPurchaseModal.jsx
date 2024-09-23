import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditPurchaseModal = ({ purchase, closeModal }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    if (purchase) {
      setName(purchase.name);
      setAmount(purchase.amount);
      setCost(purchase.cost);
    }
  }, [purchase]);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/purchase/${purchase.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, amount, cost }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Purchase updated successfully",
            confirmButtonText: "OK",
          });

          closeModal();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: data.error || "Error updating purchase",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating purchase:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An unexpected error occurred. Please try again.",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="font-bold text-xl mb-4">Edit Purchase</h2>
        <div className="form-group mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block mb-1">Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block mb-1">Cost:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="modal-action">
          <button onClick={handleUpdate} className="btn btn-primary">
            Save
          </button>
          <button onClick={closeModal} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPurchaseModal;
