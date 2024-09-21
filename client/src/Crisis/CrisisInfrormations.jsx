import React, { useEffect, useState } from "react";

const CrisisInformation = () => {
  const [crises, setCrises] = useState([]);
  const [filteredCrises, setFilteredCrises] = useState([]);
  const [severityFilter, setSeverityFilter] = useState(""); // Empty means no filter
  const [statusFilter, setStatusFilter] = useState(""); // Empty means no filter

  // Function to fetch approved crises from the backend
  const fetchApprovedCrises = () => {
    fetch(`${process.env.REACT_APP_API_URL}/crisis/approved`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCrises(data);
        setFilteredCrises(data);
      })
      .catch((error) => {
        console.error("Error fetching approved crises:", error);
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

  useEffect(() => {
    fetchApprovedCrises();
  }, []);

  useEffect(() => {
    filterCrises();
  }, [severityFilter, statusFilter, crises]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crisis Information</h2>

      {/* Filter Options */}
      <div className="flex justify-start mb-4">
        {/* Severity Filter */}
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

        {/* Status Filter */}
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
            </tr>
          </thead>
          <tbody>
            {filteredCrises.length > 0 ? (
              filteredCrises.map((crisis, index) => (
                <tr
                  key={crisis.id}
                  className={index % 2 === 0 ? "bg-base-200" : ""}
                >
                  <th>{index + 1}</th>
                  <td>{crisis.name}</td>
                  <td>{crisis.severity}</td>
                  <td>{crisis.status}</td>
                  <td>{new Date(crisis.date).toLocaleString()}</td>
                  <td>{crisis.location}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No crises found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrisisInformation;
