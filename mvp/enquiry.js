const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("track-database.db");

const audio_streaming = false;

const express = require("express");
const app = express();

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (request, response) => {
  if (audio_streaming === false) {
    const data = request.body;
    response.json({
      status: "success",
      latitude: data.lat,
      longitude: data.lon,
      altitude: data.alt,
    });

    //zum testen anstonsten:
    // current_lon=data.lon;
    // current_lat=data.lat
    const current_lon = 8.48672;
    const current_lat = 50.19263;

    const query =
      "SELECT id, lon_start, lon_end,lat_start,lat_end FROM points_of_interest";
    db.all(query, (err, rows) => {
      rows.forEach((row) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (current_lat - row.lat_start) * (Math.PI / 180); // deg2rad below
        const dLon = (current_lon - row.lon_start) * (Math.PI / 180);

        const distanceCalculation =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(row.lat_start * (Math.PI / 180)) *
            Math.cos(current_lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c =
          2 *
          Math.atan2(
            Math.sqrt(distanceCalculation),
            Math.sqrt(1 - distanceCalculation)
          );

        const distance = R * c; // Distance in km

        if (distance <= 0.002) {
          const play_PoI = row.id;
          console.log(play_PoI);
        }
      });
    });
  } else console.log("Audio is playing.");
});
