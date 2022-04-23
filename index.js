const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ipAddress) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("IP address is: ", ipAddress);
});

fetchCoordsByIP('142.112.253.232', (error, coordinates) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("Coordinates are: ", coordinates);
});


