const { fetchMyIP } = require("./iss");

fetchMyIP((error, idAddress) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("IP address is: ", idAddress);
});
