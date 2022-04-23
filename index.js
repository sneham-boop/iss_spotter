const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ipAddress) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("IP address is: ", ipAddress);
});

fetchCoordsByIP("142.112.253.232", (error, coordinates) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("Coordinates are: ", coordinates);
});

fetchISSFlyOverTimes(
  { latitude: 43.5142, longitude: -79.8845 },
  (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log("It worked! :) Returned times: ", data);
  }
);
