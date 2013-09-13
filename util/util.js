var fs = require('fs');
var exec = require('child_process').exec;

function mkdir(dirpath, mode, callback) {
  if(dirpath == null || mode == null) {
    callback('Invalid Arguments.');
  }
  fs.exists(dirpath, function(exists) {
    if (exists) {
      callback(null);
    } else {
      var param = 'mkdir ' + '-m=' + mode + ' -p ' + dirpath;
      exec(param, function(error, stdout, stderr) {
        callback(error);
      });
    }
  });
};

function rmdir(dirpath, callback) {
  if(dirpath == null) {
    callback('Invalid Arguments.');
  }
  fs.exists(dirpath, function(exists) {
    if (!exists) {
      callback(null);
    } else {
      var param = 'rm ' + dirpath + ' -r';
      exec(param, function(error, stdout, stderr) {
        callback(error);
      });
    }
  });
}

function getProcessor(callback) {
  exec('uname -p', function(error, stdout, stderr) {
    if(error) {
      callback(error);
    } else {
      var result = stdout.substring(0, stdout.length - 1); 
      callback(null,result);
    }
  });
}

exports.rmdir = rmdir;
exports.mkdir = mkdir;
exports.getProcessor = getProcessor;
