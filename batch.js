var iteration = require("./iteration");

module.exports = function batch(input_factory, stream_factory, iterations) {
  if(iterations <= 1) {
    return iteration(input_factory(), stream_factory());
  } else {
    return iteration(input_factory(), stream_factory())
      .then(function (time) {
        return batch(input_factory, stream_factory, iterations - 1)
          .then(function (other_time) {
            return time + other_time;
          });
      });
  }
}

