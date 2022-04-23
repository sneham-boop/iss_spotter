const { nextISSTimesForMyLocation } = require("./iss_promised");

const printTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(
      `Next pass is at ${datetime} for ${duration} seconds!!!! Woohoo. Did you see it??`
    );
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => printTimes(passTimes));
  //.catch((error) => console.log("It didn't work: ", error.message));
