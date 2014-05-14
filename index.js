var batch = require("./batch");

var timeit = module.exports = function (input_factory, stream_factory, iterations, batches) {
  iterations = iterations !== undefined? iterations : 10;
  batches = batches !== undefined? batches : 10;
  if (batches <= 1) {
    return batch(input_factory, stream_factory, iterations)
      .then(function (time) {
        return [time, time/iterations];
      });
  } else {
    return batch(input_factory, stream_factory, iterations)
      .then(function (time) {
        return timeit(input_factory, stream_factory, iterations, batches - 1)
          .then(function (other_time) {
            var lowest = Math.min(time, other_time[0]);
            return [lowest, lowest/iterations];
          });
      });
  }
}
