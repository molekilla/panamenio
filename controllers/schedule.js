var _ = require('underscore');
//var Metrobus = require('../lib/parsers/metrobus');

var ScheduleController = function(app) {
  var job;

  // health check
  app.get("/sched", function(req, res) {
    res.send("Hi Panamen.io");
  });

  // Schedule
  app.get("/sched/test", function(req, res) {
    // if (!req.param('id')) {
    //   res.send('Missing card id');
    //   return;
    // }
    // var metrobusModel = new Metrobus(req.param('id'));
    // metrobusModel.fetch({
    //   success: function(html, model) {
    //     res.json(200, model);
    //   },
    //   error: function(error) {
    //     res.json(400, { error: error });
    //   }
    // });
  var cronJob = require('cron').CronJob;
  job = new cronJob('*/2 * * * *', 
    function(){
      console.log("ran at " + (new Date()).toString());
    },
    function () {
      // This function is executed when the job stops
      console.log("ran at " + (new Date()).toString());
    },
    true /* Start the job right now */);
  res.send("scheduled");
  });
};
exports.init = function(app) {
	var scheduleController = new ScheduleController(app);
};
