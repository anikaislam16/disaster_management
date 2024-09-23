import React, { useState } from "react";
import Swal from "sweetalert2";

const CrisisForm = () => {
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);

  const fileInputRef = React.createRef();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      percent: 0,
    }));
    setPictures((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setPictures(pictures.filter((f) => f.file !== fileToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !severity || !date || !location || !description) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all the fields.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("severity", severity);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("description", description);

    pictures.forEach((fileObj, index) => {
      formData.append("pictures", fileObj.file);
    });

    pictures.forEach((fileObj, index) => {
      const interval = setInterval(() => {}, 100);
    });

    fetch(`${process.env.REACT_APP_API_URL}/crisis`, {
      method: "POST",
      body: formData,
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

          setName("");
          setSeverity("Low");
          setDate("");
          setLocation("");
          setDescription("");
          setPictures([]);

          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
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
        {/* Crisis Details */}
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Enter crisis description"
            required
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Pictures</label>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />

          <div className="mt-4">
            {pictures.map((fileObj, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center">
                  <img
                    src={fileObj.preview}
                    alt="Preview"
                    className="w-12 h-12 mr-2 object-cover"
                  />
                  <span>{fileObj.file.name}</span>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(fileObj.file)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Crisis
        </button>
      </form>
    </div>
  );
};

export default CrisisForm;
