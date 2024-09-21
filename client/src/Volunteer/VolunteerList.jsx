import React, { useEffect, useState } from "react";

const VolunteerList = () => {
  const [users, setUsers] = useState([]);

  const fetchApprovedUsers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/approved`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching approved users:", error);
      });
  };

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  return (
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
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user.phone}
                className={index % 2 === 0 ? "bg-base-200" : ""}
              >
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.location}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No approved users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerList;
