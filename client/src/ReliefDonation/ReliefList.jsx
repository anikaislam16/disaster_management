import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert for feedback
import EditDonationModal from "./EditDonationModal"; // Import modal

const ReliefList = () => {
  const [reliefDonations, setReliefDonations] = useState([]); // Full list
  const [filteredDonations, setFilteredDonations] = useState([]); // Filtered list
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedDonation, setSelectedDonation] = useState(null); // Track selected donation

  // Fetch all relief donations initially
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/relief`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.donations) {
          setReliefDonations(data.donations);
          setFilteredDonations(data.donations); // Initially set both lists
        } else {
          console.error("Donations data is undefined:", data);
          setReliefDonations([]); // Ensure it is an empty array if no data
          setFilteredDonations([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching relief donations:", error);
        setReliefDonations([]); // Handle error case
        setFilteredDonations([]);
      });
  }, []);

  // Function to filter donations based on date and type
  const applyFilters = () => {
    let filtered = reliefDonations;

    if (startDate) {
      filtered = filtered.filter(
        (donation) => new Date(donation.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (donation) => new Date(donation.date) <= new Date(endDate)
      );
    }
    if (type) {
      filtered = filtered.filter(
        (donation) => donation.type.toLowerCase() === type.toLowerCase()
      );
    }

    setFilteredDonations(filtered); // Update the list to display filtered results
  };

  // Function to open modal
  const openModal = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  // Function to delete donation
  const handleDelete = (donationId) => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/relief/${donationId}`, {
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
            text: "Donation deleted successfully",
            confirmButtonText: "OK",
          });
          setFilteredDonations(
            filteredDonations.filter((donation) => donation.id !== donationId)
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: data.error || "Error deleting donation",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting donation:", error);
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
      <h1 className="text-3xl font-bold my-8">Relief Donation List</h1>

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
        <label className="ml-4 mr-4">Type: </label>
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

      {/* Donation list table */}
      <div className="overflow-x-auto ml-28">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations && filteredDonations.length > 0 ? (
              filteredDonations.map((donation, index) => (
                <tr key={index}>
                  <td>{donation.type}</td>
                  <td>{donation.amount}</td>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                  <td>{donation.location}</td>
                  <td>
                    <button
                      onClick={() => openModal(donation)}
                      className="btn btn-sm bg-blue-700 text-white  "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(donation.id)}
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
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render modal if open */}
      {isModalOpen && (
        <EditDonationModal
          donation={selectedDonation}
          closeModal={closeModal}
          refreshList={() => setFilteredDonations(reliefDonations)} // Refresh list after edit
        />
      )}
    </div>
  );
};

export default ReliefList;
