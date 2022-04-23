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

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};
