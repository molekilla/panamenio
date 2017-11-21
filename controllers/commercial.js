const Metrobus = require('../lib/parsers/metrobus');

const CommercialController = function(app) {

  // Main index page
  app.get("/api/com", function(req, res) {
    res.send("Hi Panamen.io");
  });

  // Metrobus - Card Info
  app.get("/api/com/metrobus/:id", function(req, res) {
    if (!req.param('id')) {
      res.send('Missing card id');
      return;
    }
    const metrobusModel = new Metrobus(req.param('id'));
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
	const commercialController = new CommercialController(app);
};
