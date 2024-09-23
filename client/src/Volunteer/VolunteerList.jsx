import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import EditUserModal from "./EditUserModal"; // Import your modal component

const VolunteerList = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    location: "",
    status: "",
    address: "",
  });
  const { user } = useContext(UserContext); // Assuming user contains role info
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user

  useEffect(() => {
    fetchUsersByType();
  }, [type]);

  const fetchUsersByType = () => {
    const apiUrl =
      type === "Approved"
        ? `${process.env.REACT_APP_API_URL}/users/approved`
        : `${process.env.REACT_APP_API_URL}/users`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchQuery))
    .filter((user) =>
      filter.location ? user.location.includes(filter.location) : true
    )
    .filter((user) => (filter.status ? user.status === filter.status : true))
    .filter((user) =>
      filter.address
        ? user.address.toLowerCase().includes(filter.address)
        : true
    );

  const openModal = (user) => {
    console.log(user);

    setSelectedUser(user); // Set selected user data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedUser(null); // Clear selected user
  };

  return (
    <div className="">
      {/* Search and Filters */}
      <div className="mt-14 ml-28 mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={filter.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Filter by address..."
          value={filter.address}
          onChange={(e) => handleFilterChange("address", e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <select
          value={filter.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="select select-bordered"
        >
          <option value="">Filter by status</option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
        </select>
      </div>

      {/* Table of Users */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.phone}
                  className={index % 2 === 0 ? "bg-base-200" : ""}
                  onClick={() => openModal(user)}
                  style={{ cursor: "pointer" }}
                >
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>
                    {user.phone.includes("+") ? "" : "+"}
                    {user.phone}
                  </td>
                  <td>{user.address}</td>
                  <td>{user.location}</td>
                  <td>{user.status}</td>
                  {user.role === "admin" && (
                    <td>
                      <button className="btn btn-sm">Edit</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No {type === "Approved" ? "approved" : "not approved"} users
                  found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render modal if open */}
      {isModalOpen && user?.role === "admin" && (
        <EditUserModal
          user={selectedUser}
          closeModal={closeModal}
          refreshList={fetchUsersByType}
        />
      )}
    </div>
  );
};

export default VolunteerList;
