import React, { useEffect, useState, useContext } from "react";
import CrisisModal from "./CrisisModal"; // Import the CrisisModal component
import { UserContext } from "../context/UserProvider"; // Import the UserContext

const CrisisInformation = ({ type }) => {
  const [crises, setCrises] = useState([]);
  const [filteredCrises, setFilteredCrises] = useState([]);
  const [severityFilter, setSeverityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedCrisis, setSelectedCrisis] = useState(null); // State for selected crisis
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

  const { user } = useContext(UserContext); // Access user info from context
  const isAdmin = user && user.role === "admin"; // Check if user is admin
  useEffect(() => {
    console.log(user);
  }, []);
  const fetchCrisesByType = () => {
    const apiUrl =
      type === "Approved"
        ? `${process.env.REACT_APP_API_URL}/crisis/approved`
        : `${process.env.REACT_APP_API_URL}/crisis/not-approved`;

    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCrises(data);
        setFilteredCrises(data);
      })
      .catch((error) => {
        console.error("Error fetching crises:", error);
      });
  };

  const filterCrises = () => {
    let filtered = crises;

    if (severityFilter) {
      filtered = filtered.filter(
        (crisis) => crisis.severity === severityFilter
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((crisis) => crisis.status === statusFilter);
    }

    setFilteredCrises(filtered);
  };

  const handleRowClick = (crisis) => {
    setSelectedCrisis(crisis);
    setModalOpen(true);
  };

  const handleApprove = (id) => {
    const token = localStorage.getItem("token"); // Assuming you're storing the token in localStorage

    fetch(`${process.env.REACT_APP_API_URL}/crisis/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
      body: JSON.stringify({ isApproved: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error approving crisis:", data.error);
          return;
        }
        console.log("Crisis approved:", data);
        // Remove the approved crisis from the state
        setCrises((prevCrises) =>
          prevCrises.filter((crisis) => crisis.id !== id)
        );
        setFilteredCrises((prevFiltered) =>
          prevFiltered.filter((crisis) => crisis.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error approving crisis:", error);
      });
  };

  useEffect(() => {
    fetchCrisesByType(); // Fetch crises based on the prop type
  }, [type]);

  useEffect(() => {
    filterCrises();
  }, [severityFilter, statusFilter, crises]);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCrisis(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crisis Information</h2>
      <div className="flex justify-start mb-4">
        <div className="mr-4">
          <label className="block text-gray-700 mb-2">Filter by Severity</label>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table to display crises */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Date</th>
              <th>Location</th>
              {type === "notApproved" && isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredCrises.length > 0 ? (
              filteredCrises.map((crisis, index) => (
                <tr
                  key={crisis.id}
                  className={index % 2 === 0 ? "bg-base-200" : ""}
                  onClick={() => handleRowClick(crisis)} // Handle row click
                >
                  <th>{index + 1}</th>
                  <td>{crisis.name}</td>
                  <td>{crisis.severity}</td>
                  <td>{crisis.status}</td>
                  <td>{new Date(crisis.date).toLocaleString()}</td>
                  <td>{crisis.location}</td>
                  {type === "notApproved" && isAdmin && (
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the row click
                          handleApprove(crisis.id);
                        }}
                      >
                        Approve
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No crises found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for crisis details */}
      {modalOpen && (
        <CrisisModal crisis={selectedCrisis} onClose={closeModal} />
      )}
    </div>
  );
};

export default CrisisInformation;
