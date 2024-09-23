import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert for feedback
import EditPurchaseModal from "./EditPurchaseModal"; // Import modal

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]); // Full list
  const [filteredPurchases, setFilteredPurchases] = useState([]); // Filtered list
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedPurchase, setSelectedPurchase] = useState(null); // Track selected purchase

  // Fetch all purchases initially
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/purchase`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.purchases) {
          setPurchases(data.purchases);
          setFilteredPurchases(data.purchases); // Initially set both lists
        } else {
          console.error("Purchases data is undefined:", data);
          setPurchases([]); // Ensure it is an empty array if no data
          setFilteredPurchases([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
        setPurchases([]); // Handle error case
        setFilteredPurchases([]);
      });
  }, []);

  // Function to filter purchases based on date and type
  const applyFilters = () => {
    let filtered = purchases;

    if (startDate) {
      filtered = filtered.filter(
        (purchase) => new Date(purchase.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (purchase) => new Date(purchase.date) <= new Date(endDate)
      );
    }
    if (type) {
      filtered = filtered.filter((purchase) =>
        purchase.name.toLowerCase().includes(type.toLowerCase())
      );
    }

    setFilteredPurchases(filtered); // Update the list to display filtered results
  };

  // Function to open modal
  const openModal = (purchase) => {
    setSelectedPurchase(purchase);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPurchase(null);
  };

  // Function to delete purchase
  const handleDelete = (purchaseId) => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/purchase/${purchaseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Purchase deleted successfully",
            confirmButtonText: "OK",
          });
          setFilteredPurchases(
            filteredPurchases.filter((purchase) => purchase.id !== purchaseId)
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: data.error || "Error deleting purchase",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting purchase:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An unexpected error occurred. Please try again.",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold my-8">Purchase List</h1>

      {/* Filter inputs */}
      <div className="filter-section mb-6">
        <label className="mr-4">Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input input-bordered"
        />
        <label className="ml-4 mr-4">End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input input-bordered"
        />
        <label className="ml-4 mr-4">Name: </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input input-bordered"
        />
        <button
          onClick={applyFilters}
          className="btn btn-primary ml-4 bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Purchase list table */}
      <div className="overflow-x-auto ml-28">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases && filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase, index) => (
                <tr key={index}>
                  <td>{purchase.name}</td>
                  <td>{purchase.amount}</td>
                  <td>{purchase.cost}</td>
                  <td>{new Date(purchase.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => openModal(purchase)}
                      className="btn btn-sm bg-blue-700 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(purchase.id)}
                      className="btn btn-sm bg-red-700 ml-2 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No purchases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render modal if open */}
      {isModalOpen && (
        <EditPurchaseModal
          purchase={selectedPurchase}
          closeModal={closeModal}
          // Refresh list after edit
        />
      )}
    </div>
  );
};

export default PurchaseList;
