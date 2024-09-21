import React, { useState } from "react";
import Swal from "sweetalert2";

const CrisisForm = () => {
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState(""); // Add location state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!name || !severity || !date || !location) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all the fields.",
      });
      return;
    }

    // Create the payload to send to the backend
    const crisisData = {
      name,
      severity,
      date,
      location, // Include location in payload
    };

    // Send the data to the backend
    fetch(`${process.env.REACT_APP_API_URL}/crisis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Optional JWT token
      },
      body: JSON.stringify(crisisData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.error,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Crisis added successfully!",
          });

          // Clear form fields after successful submission
          setName("");
          setSeverity("Low");
          setDate("");
          setLocation(""); // Reset location
        }
      })
      .catch((error) => {
        console.error("Error adding crisis:", error);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Could not add the crisis. Try again later.",
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a Crisis</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Crisis Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter crisis name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Severity</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full"
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
            placeholder="Enter location"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Crisis
        </button>
      </form>
    </div>
  );
};

export default CrisisForm;
