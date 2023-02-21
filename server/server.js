const sqlite3 = require("sqlite3");
const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/tables", (req, res) => {
  const db = new sqlite3.Database("Wandern Datenbank SQLite.db");
  // console.log("server get req", req);
  const query = "SELECT * FROM hiking_routes";
  // try {
  db.all(query, (err, row) => {
    if (err) {
      console.error("cant get asadas", err);
      return;
    }
    // console.log("row", row);
    res.send(row);
  });
  // res.sendStatus(200);
  // } catch (e) {
  //   console.error("Error: ", e);
  //   res.sendStatus(400);
  // } finally {
  db.close();
  // }
});

server.get("/tables/:table/", (req, res) => {
  const db = new sqlite3.Database("Wandern Datenbank SQLite.db");
  console.log("server get req", req.params.table);
  const query = `SELECT * FROM "${req.params.table}"`;
  // try {
  db.all(query, (err, row) => {
    if (err) {
      console.error("cant get asadas", err);
      return;
    }
    // console.log("row", row);
    res.send(row);
  });
  // res.sendStatus(200);
  // } catch (e) {
  //   console.error("Error: ", e);
  //   res.sendStatus(400);
  // } finally {
  db.close();
  // }
});

server.post("/insert/:table/", (req, res) => {
  const db = new sqlite3.Database("Wandern Datenbank SQLite.db");
  console.log("post body req", req.params.table);
  console.log(req.body);
  let query = "";
  if (req.params.table === "hiking_routes") {
    query = `INSERT INTO ${req.params.table} (name, start_point, end_point, length, duration) VALUES ( "${req.body.name}" , "${req.body.start_point}" , "${req.body.end_point}" , "${req.body.length}" , "${req.body.duration}" )`;
  } else if (req.params.table === "audiotracks") {
    query = `INSERT INTO ${req.params.table} (name, duration) VALUES ( "${req.body.name}" , "${req.body.duration}" )`;
  }
  try {
    db.all(query);
    res.sendStatus(200);
  } catch (e) {
    console.error("Error: ", e);
    res.sendStatus(400);
  } finally {
    db.close();
  }
});

server.listen("3000");

// createEntry();
// document
//   .getElementById("insert-data-button")
//   .addEventListener("click", sayHello2);

// function sayHello2() {
//   console.log("hello-world");
// }

/*
function createEntry() {
  const nameField = document.getElementById("name");
  const startpointField = document.getElementById("start-point");
  const endpointField = document.getElementById("end-point");
  const lengthField = document.getElementById("length");
  const durationField = document.getElementById("duration");
  const statusField = document.getElementById("form-status");

  const entryName = nameField.value;
  const entryStartpoint = startpointField.value;
  const entryEndpoint = endpointField.value;
  const entryLength = lengthField.value;
  const entryDuration = durationField.value;

  if (
    !entryName &&
    entryStartpoint &&
    entryEndpoint &&
    entryLength &&
    entryDuration !== undefined
  ) {
    statusField.innerHTML = "Bitte gib alle Daten ein!";
    return false;
  }

  let data = {
    name: entryName,
    start_point: entryStartpoint,
    end_point: entryEndpoint,
    length: entryLength,
    duration: entryDuration,
  };

  fetch(`http://localhost:3000/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        statusField.innerHTML = "Speichern fehlgeschlagen";
        return;
      }

      updateTable();
      statusField.innerHTML = "";
      entryName.value = "";
      entryStartpoint.value = "";
      entryEndpoint.value = "";
      entryLength.value = "";
      entryDuration.value = "";
      return true;
    })
    .catch((error) => {
      statusField.innerHTML = "Speichern fehlgeschlagen: " + error;
    });
}
*/
