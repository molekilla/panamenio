const Idaan = require('../lib/parsers/idaan');
const RegPub = require('../lib/parsers/regpub/regpub');
const RegPubItem = require('../lib/parsers/regpub/regpubitem');
const LoteriaModel = require('../lib/parsers/loteria/loteria');
const GovtController = function(app) {

  const responseHandler = function(req, res) {
    return {
      success: function(html, model) {
        res.jsonp(200, model);
      },
      error: function(error) {
        res.jsonp(400, { error: error });
      }
    };
  };
  // Main index page
  app.get("/api/gob", function(req, res) {
    res.send("Hi Panamen.io");
  });
  // Loteria Nacional
  // ?m(mes)&a(anio)
  app.get("/api/gob/loteria/numeros", function(req, res) {
    const loteriaModel = new LoteriaModel();
    loteriaModel.fetch(req.query, responseHandler(req, res));
  });

  app.get("/api/gob/registropublico/sociedades/:id", function(req, res) {
    if (!req.param('id')) {
      res.send('Missing id');
      return;
    }

    const regpubitemModel = new RegPubItem();
    regpubitemModel.fetch(req.param('id'), responseHandler(req, res));
  });

  // Registro Publico - SA Info
  app.get("/api/gob/registropublico/:query", function(req, res) {
   if (!req.param('query')) {
      res.send('Missing query');
      return;
   }
   const regpubModel = new RegPub();
   regpubModel.fetch(req.param('query'), responseHandler(req, res));
  });

  // Idaan - Billing Info
  app.get("/api/gob/idaan/:id", function(req, res) {
    if (!req.param('id')) {
      res.send('Missing id');
      return;
    }
    const idaanModel = new Idaan(req.param('id'));
    idaanModel.fetch(responseHandler(req, res));
  });
};
exports.init = function(app) {
	const govtController = new GovtController(app);
};
