var webhookproc = require('./hookproc');

exports.webhookhandler = function(req,res){
  webhookproc.process(req.body,function(err){
    if(err)
    {
      return console.log(err);
    }
    console.log("command exec successfully.");
  });
}
