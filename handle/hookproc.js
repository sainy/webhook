var setting = require('./config');
var exec = require('child_process').exec;

var status_before = "0";
var status_after = "0";

preCheck = function(post_info){
    var receive_commit_count = post_info.total_commits_count;
    var receive_url = post_info.repository.url;
    var receive_before = post_info.before;
    var receive_after = post_info.after;
    var receive_ref = post_info.ref;
    if(setting.gl.repository.url != receive_url){
        return false;
    }
    if(receive_commit_count <= 0){
        return false;
    }
    if(status_after != "0" && status_after != receive_before){
        return false;
    }
    if(setting.gl.ref_listen != receive_ref){
        return false;
    }
    return true;
}

exports.process = function(post_info,callback){
    if(preCheck(post_info) == false){
        return callback("no need to exec.");
    }
    var git_branch = post_info.ref.split("/")[2];
    var cmd = "cd "+setting.gl.proj_path+";";
    cmd += "git checkout "+git_branch+";";
    cmd += setting.gl.cmd_exec;
    exec(cmd, function(error, stdout, stderr) {
        if(error) {
            return callback("command exec error.");
        } else if(stdout.indexOf("error") >= 0) {
            return callback("command exec error:" + stdout);
        }
    });
    status_before = post_info.before;
    status_after = post_info.after;
    return callback(null);
}


