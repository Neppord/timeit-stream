var q = require("Q");
var through = require("through2");
var microtime = require("microtime");

var drain = require("./drain");

module.exports = function iteration(input, stream) {
  var defered = q.defer();
  stream.pipe(through.obj(drain, function () {
    var end = microtime.nowStruct();
    var diff =  (end[0] -  start[0]) * 1000000 + (end[1] - start[1]);
    defered.resolve(diff);
  }));
  var start = microtime.nowStruct();
  stream.end(input)
  return defered.promise;
}
