import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const EditUserModal = ({ user, closeModal, refreshList }) => {
  const [location, setLocation] = useState(user.location);
  const [status, setStatus] = useState(user.status);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    const updates = { location, status };

    fetch(`${process.env.REACT_APP_API_URL}/users/update/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
      body: JSON.stringify(updates),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "User updated successfully",
            confirmButtonText: "OK",
          });
          refreshList(); // Refresh the list in parent component
          closeModal(); // Close the modal
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: data.error || "Error updating user",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
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
        <h2 className="font-bold text-lg">Edit User: {user.name}</h2>
        <div className="py-4">
          <label className="block">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full"
          />
          <label className="block mt-4">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="Approved">Approved</option>
            <option value="Not Approved">Not Approved</option>
          </select>
        </div>
        <div className="modal-action">
          <button onClick={handleUpdate} className="btn bg-blue-700 text-white">
            Save Changes
          </button>
          <button onClick={closeModal} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
