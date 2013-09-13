var path = require('path');
var fs = require('fs');
var util = require('../util/util');
var async = require('async');

function InitSettings(file, root, callback) {
  async.waterfall([
  function(callback) {
    async.parallel([
    function(callback) {
      fs.readFile(file, function(err, data) {
        if (err || !data) {
          callback("Error Reading Setting File " + file);
        } else {
          callback(null, data);
        }
      });
    },
    function(callback) {
      util.getProcessor(callback);
    }], function(err, results) {
      callback(err, results[0], results[1]);
    })
  },
  function(arg1, arg2, callback) {
    var json = JSON.parse(arg1);
    var settings = {
      repository:json.repository,
      ref_listen:json.ref_listen,
      proj_path:json.proj_path,
      cmd_exec:json.cmd_exec
      }
    callback(null, settings);
  }], function(err, results) {
    callback(err, results);
  });
}

function checkParams(settings) {
  if (fs.existsSync(settings.proj_path) == false) {
    return false;
  }
  if (fs.existsSync(path.join(settings.proj_path,".git/"+settings.ref_listen)) == false) {
    return false;
  }
  return true;
}

// Prerequisites for running CI system:
// 1. Init settings from settings.json.
// 2. Make sure that we don't lose any files.
// 3. Prepare direcotries to be used later.
// If any thing get wrong at this point, we should exit the process
// since there may be unexpected problems if not.
function initialize(callback) {
  InitSettings("./handle/config.json", __dirname, function(err, result) {
    if (err) {
      return callback(err);
    }
    if(checkParams(result) == false) {
      return callback('Some path is not exist.');
    }
    else{
        exports.gl = result;
        return callback(null);
    }
  });
}

exports.initialize = initialize;
exports.checkParams = checkParams;
exports.initSettings = InitSettings;
