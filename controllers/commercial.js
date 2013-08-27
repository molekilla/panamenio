var _ = require('underscore');
var Metrobus = require('../lib/parsers/metrobus');

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
    var metrobusModel = new Metrobus(req.param('id'));
    metrobusModel.fetch({
      success: function(html, model) {
        res.json(200, model);
      },
      error: function(error) {
        res.json(400, { error: error });
      }
    });
  });
};
exports.init = function(app) {
	var commercialController = new CommercialController(app);
};
