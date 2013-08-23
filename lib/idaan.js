var _ = require('underscore'),
  $ = require('cheerio'),
  request = require('request'),
  MAIN_URL = 'http://www.idaan.gob.pa/cliente.php',
  BILLING_URL ='http://www.idaan.gob.pa/clientes.php';


var IdaanModel = function(accountId) {
  this.accountId = accountId;
};

IdaanModel.prototype.parse = function(html) {
  // Get TH cells
  var tables = $.load(html)('table');
  var cells = $.load(html)('table').find('th');
  var info = $(tables).find('strong');
  var nicLabel = $(info[1]).text();
  var nicDescription = $(info[1]).parent().text().replace(nicLabel, "").trim();
  var nameLabel = $(info[2]).text();
  var nameDescription = $(info[2]).parent().text().replace(nameLabel, "").trim();
  var updated = $(info[3]).text().replace('Saldo a la Fecha:', "").trim();
  var lastPaymentAmount = $(info[5]).text();
  var lastPaymentDate = $(info[6]).text().replace(".", "").trim();
  // Water
  var waterAmount = parseFloat($(cells[1]).text().substring(2), 10);
  // Garbage
  var garbageAmount = parseFloat($(cells[3]).text().substring(2), 10);
  // Total
  var total = waterAmount + garbageAmount;
  var result = "Agua: " + waterAmount + " Basura: " + garbageAmount + " Total: " + total.toFixed(2);
  console.log(result);
  return {
    agua: waterAmount,
    basura: garbageAmount,
    total: total,
    owner: nameDescription,
    nic: nicDescription,
    updatedAt: updated,
    lastPaymentAt: lastPaymentDate,
    lastPaymentAmount: lastPaymentAmount,
    dateFormatISO: 'es-pa'
  };
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