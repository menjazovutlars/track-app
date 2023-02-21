function getPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(async (position, err) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const alt = position.coords.altitude;

      const data = { lat, lon, alt };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch("/api", options);
      const json = await response.json();
      console.log(json);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

getPosition();
