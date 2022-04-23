const { nextISSTimesForMyLocation } = require("./iss");

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

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printTimes(passTimes);
});
