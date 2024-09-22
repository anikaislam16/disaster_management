const db = require("../../db/db");
const { v4: uuidv4 } = require("uuid"); // If you want to use UUIDs

const addCrisis = (req, res) => {
  const { name, severity, date, location, description } = req.body;
  const pictures = req.files; // Handle uploaded files

  // Validate input
  if (!name || !severity || !date || !location || !description) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const validSeverities = ["Low", "Moderate", "High", "Critical"];
  if (!validSeverities.includes(severity)) {
    return res.status(400).json({ error: "Invalid severity value." });
  }

  const crisisId = uuidv4();
  const crisisSql =
    "INSERT INTO crisis (id, name, severity, date, location, description) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    crisisSql,
    [crisisId, name, severity, date, location, description],
    (err) => {
      if (err) {
        console.error("Error inserting crisis data:", err);
        return res.status(500).json({ error: "Internal server error." });
      }

      if (pictures && pictures.length > 0) {
        const pictureInsertSql =
          "INSERT INTO crisispictures (crisis_id, picture_data) VALUES ?";
        const pictureValues = pictures.map((picture) => [
          crisisId,
          picture.buffer,
        ]); // Use picture.buffer to store binary data

        db.query(pictureInsertSql, [pictureValues], (err) => {
          if (err) {
            console.error("Error inserting crisis pictures:", err);
            return res
              .status(500)
              .json({ error: "Failed to insert pictures." });
          }
          return res.status(201).json({
            message: "Crisis and pictures added successfully!",
            id: crisisId,
          });
        });
      } else {
        return res
          .status(201)
          .json({ message: "Crisis added successfully!", id: crisisId });
      }
    }
  );
};

const updateCrisis = (req, res) => {
  const id = req.params.id;  
  const updates = req.body; 

  const fields = [];
  const values = [];

  // Check for severity update
  if (updates.severity) {
    if (["Low", "Moderate", "High", "Critical"].includes(updates.severity)) {
      fields.push("severity = ?");
      values.push(updates.severity);
    } else {
      return res.status(400).json({ error: "Invalid severity value." });
    }
  }

  // Check for status update
  if (updates.status) {
    if (["Pending", "Ongoing", "Resolved", "Closed"].includes(updates.status)) {
      fields.push("status = ?");
      values.push(updates.status);
    } else {
      return res.status(400).json({ error: "Invalid status value." });
    }
  }

  // Check for isApproved update
  if (typeof updates.isApproved === "boolean") {
    fields.push("isApproved = ?");
    values.push(updates.isApproved);
  }

  // Ensure at least one field is being updated
  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update." });
  }

  // Adding the ID to the values array
  values.push(id);

  const sql = `UPDATE crisis SET ${fields.join(", ")} WHERE id = ?`;

  // Execute the update query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating crisis:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    res.json({ message: "Crisis updated successfully!", result });
  });
};

const getApprovedCrises = (req, res) => {
  
  const crisisSql = `
    SELECT id, name, severity, status, date, location, description
    FROM crisis
    WHERE isApproved = '1'
  `;

  db.query(crisisSql, (err, crisisResults) => {
    if (err) {
      console.error("Error fetching approved crises:", err);
      return res.status(500).json({ error: "Internal server error." });
    }

   
    if (crisisResults.length === 0) {
      return res.status(200).json([]);
    }


    const crisisIds = crisisResults.map((crisis) => crisis.id);

    // Query to get pictures for the crises
    const pictureSql = `
      SELECT crisis_id, picture_data
      FROM crisispictures
      WHERE crisis_id IN (?)
    `;

    db.query(pictureSql, [crisisIds], (err, pictureResults) => {
      if (err) {
        console.error("Error fetching crisis pictures:", err);
        return res.status(500).json({ error: "Internal server error." });
      }

   
      const crises = crisisResults.map((crisis) => {
        return {
          ...crisis,
          pictures: pictureResults
            .filter((picture) => picture.crisis_id === crisis.id)
            .map((picture) => ({
              url: `data:image/jpeg;base64,${picture.picture_data.toString(
                "base64"
              )}`, 
            })),
        };
      });

      res.status(200).json(crises);
    });
  });
};


const getNotApprovedCrises = (req, res) => {
  const crisisSql = `
    SELECT id, name, severity, status, date, location, description
    FROM crisis
    WHERE isApproved = '0'
  `;

  db.query(crisisSql, (err, crisisResults) => {
    if (err) {
      console.error("Error fetching approved crises:", err);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (crisisResults.length === 0) {
      return res.status(200).json([]);
    }

    const crisisIds = crisisResults.map((crisis) => crisis.id);

    // Query to get pictures for the crises
    const pictureSql = `
      SELECT crisis_id, picture_data
      FROM crisispictures
      WHERE crisis_id IN (?)
    `;

    db.query(pictureSql, [crisisIds], (err, pictureResults) => {
      if (err) {
        console.error("Error fetching crisis pictures:", err);
        return res.status(500).json({ error: "Internal server error." });
      }

      const crises = crisisResults.map((crisis) => {
        return {
          ...crisis,
          pictures: pictureResults
            .filter((picture) => picture.crisis_id === crisis.id)
            .map((picture) => ({
              url: `data:image/jpeg;base64,${picture.picture_data.toString(
                "base64"
              )}`,
            })),
        };
      });

      res.status(200).json(crises);
    });
  });
};





module.exports = {
  addCrisis,
  updateCrisis,
  getApprovedCrises,
  getNotApprovedCrises,
};
