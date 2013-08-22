var _ = require('underscore');
var Metrobus = require('../lib/metrobus.js');

var CommercialController = function(app) {

  // Main index page
  app.get("/com", function(req, res) {
    res.send("Hi Panamen.io");
  });

  // Metrobus - Card Info
  app.get("/com/metrobus/:id", function(req, res) {
   if (!req.param('id')) {
      res.send('Missing card id');
      return;
   }
   var metrobusModel = new Metrobus(req.param('id'), res);
   metrobusModel.fetch();
  });

};
exports.init = function(app) {
	var commercialController = new CommercialController(app);
};
