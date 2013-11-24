var _ = require('underscore');
var Idaan = require('../lib/parsers/idaan');
var config = require('../config/scheduler');

var ScheduleController = function(app) {
  var job;

  // health check
  app.get("/sched", function(req, res) {
    res.send("Hi Panamen.io");
  });

  // Schedule
  app.get("/sched/idaan/:id", function(req, res) {
    var responseHandler = function(req, res) {
      return {
        success: function(html, model) {
          //res.jsonp(200, model);
        },
        error: function(error) {
          console.log(error)
        }
      };
    };
  var cronJob = require('cron').CronJob;
  // Every x min: */x * * * *
  // Every x hour: 0 */x * * *
  job = new cronJob(config.recurrence, 
    function(){

      console.log("ran at " + (new Date()).toString());
      var idaanModel = new Idaan(req.param('id'));
      idaanModel.fetch(responseHandler(req, res));
    },
    function () {
      // This function is executed when the job stops
      console.log("ran at " + (new Date()).toString());
    },
    true /* Start the job right now */);
  res.send("scheduled");
  console.log("scheduled...");
  });
};
exports.init = function(app) {
	var scheduleController = new ScheduleController(app);
};
