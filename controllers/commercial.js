var _ = require('underscore');
var Idaan = require('../lib/parsers/idaan');
var RegPub = require('../lib/parsers/regpub.js');

var CommercialController = function(app) {

  // Main index page
  app.get("/com", function(req, res) {
    res.send("Hi Panamen.io");
  });

  // Registro Publico - SA Info
  app.get("/com/registropublico/:query", function(req, res) {
   if (!req.param('query')) {
      res.send('Missing query');
      return;
   }
   var regpubModel = new RegPub(res);
   regpubModel.fetch(req.param('query'));
  });

  // Idaan - Billing Info
  app.get("/com/idaan/:id", function(req, res) {
    if (!req.param('id')) {
      res.send('Missing id');
      return;
    }
    var idaanModel = new Idaan(req.param('id'), res);
    idaanModel.fetch();
  });
};
exports.init = function(app) {
	var commercialController = new CommercialController(app);
};
