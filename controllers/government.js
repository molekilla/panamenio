var _ = require('underscore');
var Idaan = require('../lib/parsers/idaan');
var RegPub = require('../lib/parsers/regpub/regpub');
var RegPubItem = require('../lib/parsers/regpub/regpubitem');
var LoteriaModel = require('../lib/parsers/loteria/loteria');
var GovtController = function(app) {

  // Main index page
  app.get("/gob", function(req, res) {
    res.send("Hi Panamen.io");
  });
  // Loteria Nacional
  // ?m(mes)&a(anio)
  app.get("/gob/loteria/numeros", function(req, res) {
    var loteriaModel = new LoteriaModel();
    loteriaModel.fetch(req.query, {
      success: function(html, model) {
        res.json(200, model);
      },
      error: function(error) {
        res.json(400, { error: error });
      }
    });
  });

  app.get("/gob/registropublico/sociedades/:id", function(req, res) {
    if (!req.param('id')) {
      res.send('Missing id');
      return;
    }

    var regpubitemModel = new RegPubItem();
    regpubitemModel.fetch(req.param('id'), {
     success: function(html, model) {
       res.json(200, model);
     },
     error: function(error) {
       res.json(400, { error: error });
     }
    });    
  });

  // Registro Publico - SA Info
  app.get("/gob/registropublico/:query", function(req, res) {
   if (!req.param('query')) {
      res.send('Missing query');
      return;
   }
   var regpubModel = new RegPub();
   regpubModel.fetch(req.param('query'), {
    success: function(html, model) {
      res.json(200, model);
    },
    error: function(error) {
      res.json(400, { error: error });
    }
   });
  });

  // Idaan - Billing Info
  app.get("/gob/idaan/:id", function(req, res) {
    if (!req.param('id')) {
      res.send('Missing id');
      return;
    }
    var idaanModel = new Idaan(req.param('id'));
    idaanModel.fetch({
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
	var govtController = new GovtController(app);
};
