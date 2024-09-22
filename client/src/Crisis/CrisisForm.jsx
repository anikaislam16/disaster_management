import React, { useState } from "react";
import Swal from "sweetalert2";

const CrisisForm = () => {
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]); // Pictures state with file objects
  const [progress, setProgress] = useState({}); // Track upload progress
  const fileInputRef = React.createRef(); // Ref for the file input

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Create preview for the file
      percent: 0, // Start with 0% progress
    }));
    setPictures((prev) => [...prev, ...newFiles]); // Add new files to the list

    // Clear the file input after selecting
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setPictures(pictures.filter((f) => f.file !== fileToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
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

    // Append files to FormData
    pictures.forEach((fileObj, index) => {
      formData.append("pictures", fileObj.file);
    });

    // Simulate progress tracking for each file (can be integrated with real upload API)
    pictures.forEach((fileObj, index) => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newPercent = (prev[fileObj.file.name] || 0) + 10;
          if (newPercent >= 100) {
            clearInterval(interval);
          }
          return { ...prev, [fileObj.file.name]: newPercent };
        });
      }, 100);
    });

    // API call for form submission
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

          // Clear all form fields after submission
          setName("");
          setSeverity("Low");
          setDate("");
          setLocation("");
          setDescription("");
          setPictures([]);
          setProgress({}); // Reset progress
          if (fileInputRef.current) {
            fileInputRef.current.value = null; // Reset the file input
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
            ref={fileInputRef} // Bind the input to the ref
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
          {/* Display selected files */}
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
