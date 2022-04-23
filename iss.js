const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP, response ${body}`;
      callback(Error(msg), null);
      return;
    }

    body = JSON.parse(body);
    const ipAddress = body.ip;
    callback(error, ipAddress);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const path = `https://freegeoip.app/json/${ip}`;
  request(path, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP, response ${body}`;
      callback(Error(msg), null);
      return;
    }

    body = JSON.parse(body);
    const { latitude, longitude } = body;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = ({ latitude, longitude }, callback) => {
  const path = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request(path, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode}, when fetching pass times, response ${body}`;
      callback(Error(msg), null);
      return;
    }

    body = JSON.parse(body);
    callback(null, body);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ipAddress) => {
    if (error) {
      callback(error, null);
      return;
    }
    // console.log("IP address is: ", ipAddress);

    fetchCoordsByIP(ipAddress, (error, coordinates) => {
      if (error) {
        callback(error, null);
        return;
      }
      // console.log("Coordinates are: ", coordinates);

      fetchISSFlyOverTimes(coordinates, (error, data) => {
        if (error) {
          callback(error, null);
          return;
        }
        // console.log("It worked! :) Returned times: ", data);
        callback(error, data.response);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
