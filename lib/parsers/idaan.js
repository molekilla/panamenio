var _ = require('underscore'),
  $ = require('cheerio'),
  CheerioTemplate = require('../cheerio_helper'),
  template = require('./idaan_template'),
  request = require('request'),
  MAIN_URL = 'http://www.idaan.gob.pa/cliente.php',
  BILLING_URL ='http://www.idaan.gob.pa/clientes.php';


var IdaanModel = function(accountId) {
  this.accountId = accountId;
};

IdaanModel.prototype.parse = function(html) {
  var tables = $.load(html)('table');
  var templateManager = new CheerioTemplate(tables);
  return templateManager.render(null, template);
};

IdaanModel.prototype.fetch = function(options) {
    var self = this;
    // Query
    request.get(MAIN_URL, function() {
      var data = {
                  headers: {
                    referer: MAIN_URL
                  },
                  form: {
                    consulta: self.accountId,
                    submit: 'Consultar'
                  }
                };
      request.post(BILLING_URL, data, function(err, resp, html) {
        if (err) {
          options.error(err);
          return;
        }
        options.success(html, self.parse(html));
      });
    });
};

module.exports = IdaanModel;