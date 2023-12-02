const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3281",
  database: "food_tracker",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL server.");
  // http://localhost:3000
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// GET REQUESTS ---------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/getGuardian", (req, res) => {
  const query = "SELECT * FROM Guardian";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching guardians:", err);
      res.status(500).send("Error fetching guardians");
    } else {
      res.json(results);
    }
  });
});

app.get("/getChild", (req, res) => {
  const query = "SELECT * FROM Child";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching children:", err);
      res.status(500).send("Error fetching children");
    } else {
      res.json(results);
    }
  });
});

app.get("/getDriver", (req, res) => {
  const query = "SELECT * FROM Driver";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching drivers:", err);
      res.status(500).send("Error fetching drivers");
    } else {
      res.json(results);
    }
  });
});

app.get("/getPet", (req, res) => {
  const query = "SELECT * FROM Pet";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching pets:", err);
      res.status(500).send("Error fetching pets");
    } else {
      res.json(results);
    }
  });
});

app.get("/getAssist", (req, res) => {
  const query = "SELECT * FROM Assist";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching assist:", err);
      res.status(500).send("Error fetching assist");
    } else {
      res.json(results);
    }
  });
});

// POST REQUESTS -------------------------------------------------------------
app.post("/addGuardian", (req, res) => {
  const { name, groupRoleID, groupRole, foodRestriction } = req.body;
  console.log(name, groupRoleID, groupRole, foodRestriction);
  let query = `INSERT INTO Guardian (name, groupRoleID, groupRole, foodRestriction) VALUES (?, ?, ?, ?)`;

  connection.query(
    query,
    [name, groupRoleID, groupRole, foodRestriction],
    (err, results) => {
      if (err) throw err;
      res.send(`Guardian added with ID: ${results.insertId}`);
    }
  );
});

app.post("/addChild", (req, res) => {
  const { name, groupRoleID, groupRole, foodRestriction } = req.body;
  console.log(name, groupRoleID, groupRole, foodRestriction);
  let query = `INSERT INTO Child (name, groupRoleID, groupRole, foodRestriction) VALUES (?, ?, ?, ?)`;

  connection.query(
    query,
    [name, groupRoleID, groupRole, foodRestriction],
    (err, results) => {
      if (err) throw err;
      res.send(`Child added with ID: ${results.insertId}`);
    }
  );
});

app.post("/addDriver", (req, res) => {
  const { name, groupRoleID, groupRole, foodRestriction } = req.body;
  console.log(name, groupRoleID, groupRole, foodRestriction);
  let query = `INSERT INTO Driver (name, groupRoleID, groupRole, foodRestriction) VALUES (?, ?, ?, ?)`;

  connection.query(
    query,
    [name, groupRoleID, groupRole, foodRestriction],
    (err, results) => {
      if (err) throw err;
      res.send(`Driver added with ID: ${results.insertId}`);
    }
  );
});

app.post("/addPet", (req, res) => {
  const { name, groupRole, foodRestriction } = req.body;
  console.log(name, groupRole, foodRestriction);
  let query = `INSERT INTO Pet (name, groupRole, foodRestriction) VALUES (?, ?, ?)`;

  connection.query(
    query,
    [name, groupRole, foodRestriction],
    (err, results) => {
      if (err) throw err;
      res.send(`Pet added with ID: ${results.insertId}`);
    }
  );
});

app.post("/addAssist", (req, res) => {
  const { petID, name, groupRole, foodRestriction } = req.body;
  const query = `INSERT INTO Assist (petID, name, groupRole, foodRestriction) VALUES (?, ?, ?, ?)`;

  connection.query(
    query,
    [petID, name, groupRole, foodRestriction],
    (err, results) => {
      if (err) {
        console.error("Error adding to Assist:", err);
        res.status(500).send("Error adding to Assist");
      } else {
        res.send(`Assist entry added with ID: ${results.insertId}`);
      }
    }
  );
});

// UPDATE REQUESTS
app.put("/updateGuardian/:id", (req, res) => {
  const { id } = req.params;
  const { groupRole, foodRestriction } = req.body;
  const query =
    "UPDATE Guardian SET groupRole = ?, foodRestriction = ? WHERE id = ?";

  connection.query(query, [groupRole, foodRestriction, id], (err, results) => {
    if (err) {
      console.error("Error updating guardian:", err);
      res.status(500).send("Error updating guardian");
    } else {
      res.send(`Guardian with ID: ${id} updated successfully`);
    }
  });
});

app.put("/updateChild/:id", (req, res) => {
  const { id } = req.params;
  const { groupRole, foodRestriction } = req.body;
  const query =
    "UPDATE Child SET groupRole = ?, foodRestriction = ? WHERE id = ?";

  connection.query(query, [groupRole, foodRestriction, id], (err, results) => {
    if (err) {
      console.error("Error updating child:", err);
      res.status(500).send("Error updating child");
    } else {
      res.send(`Child with ID: ${id} updated successfully`);
    }
  });
});

app.put("/updateDriver/:id", (req, res) => {
  const { id } = req.params;
  const { groupRole, foodRestriction } = req.body;
  const query =
    "UPDATE Driver SET groupRole = ?, foodRestriction = ? WHERE id = ?";

  connection.query(query, [groupRole, foodRestriction, id], (err, results) => {
    if (err) {
      console.error("Error updating driver:", err);
      res.status(500).send("Error updating driver");
    } else {
      res.send(`Driver with ID: ${id} updated successfully`);
    }
  });
});

app.put("/updatePet/:id", (req, res) => {
  const { id } = req.params;
  const { groupRole, foodRestriction } = req.body;
  const query =
    "UPDATE Pet SET groupRole = ?, foodRestriction = ? WHERE id = ?";

  connection.query(query, [groupRole, foodRestriction, id], (err, results) => {
    if (err) {
      console.error("Error updating pet:", err);
      res.status(500).send("Error updating pet");
    } else {
      res.send(`Pet with ID: ${id} updated successfully`);
    }
  });
});

app.put("/updateAssist/:id", (req, res) => {
  const { id } = req.params;
  const { groupRole, foodRestriction } = req.body;
  const query =
    "UPDATE Assist SET groupRole = ?, foodRestriction = ? WHERE id = ?";

  connection.query(query, [groupRole, foodRestriction, id], (err, results) => {
    if (err) {
      console.error("Error updating assist:", err);
      res.status(500).send("Error updating assist");
    } else {
      res.send(`Assist with ID: ${id} updated successfully`);
    }
  });
});

// DELETE REQUESTS
app.delete("/deleteGuardian/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Guardian WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting guardian:", err);
      res.status(500).send("Error deleting guardian");
    } else {
      res.send(`Guardian with ID: ${id} deleted successfully`);
    }
  });
});

app.delete("/deleteChild/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Child WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting child:", err);
      res.status(500).send("Error deleting child");
    } else {
      res.send(`Child with ID: ${id} deleted successfully`);
    }
  });
});

app.delete("/deleteDriver/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Driver WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting driver:", err);
      res.status(500).send("Error deleting driver");
    } else {
      res.send(`Driver with ID: ${id} deleted successfully`);
    }
  });
});

app.delete("/deletePet/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Pet WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting pet:", err);
      res.status(500).send("Error deleting pet");
    } else {
      res.send(`Pet with ID: ${id} deleted successfully`);
    }
  });
});

app.delete("/deleteAssist/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Assist WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting assist:", err);
      res.status(500).send("Error deleting assist");
    } else {
      res.send(`Assist with ID: ${id} deleted successfully`);
    }
  });
});
