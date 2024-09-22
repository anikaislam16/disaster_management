import React from "react";

const CrisisModal = ({ crisis, onClose }) => {
  if (!crisis) return null; // If no crisis is selected, return null

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">{crisis.name}</h2>
        <p>
          <strong>Severity:</strong> {crisis.severity}
        </p>
        <p>
          <strong>Status:</strong> {crisis.status}
        </p>
        <p>
          <strong>Date:</strong> {new Date(crisis.date).toLocaleString()}
        </p>
        <p>
          <strong>Location:</strong> {crisis.location}
        </p>
        <p>
          <strong>Description:</strong> {crisis.description}
        </p>

        {/* Display images */}
        {crisis.pictures.length > 0 ? (
          <div className="flex flex-col gap-4 mt-4">
            {crisis.pictures.map((picture, index) => (
              <div key={index} className="w-full h-auto">
                <img
                  src={picture.url} // Use the base64 image string directly
                  className="object-cover w-full h-full rounded-md"
                  alt={`Crisis Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No pictures available for this crisis.</p>
        )}

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrisisModal;
