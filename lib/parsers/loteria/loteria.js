var _ = require('underscore'),
  $ = require('cheerio'),
  MenioScraper = require('./../../menioscraper'),
  util = require('util'),
  template = require('./loteria_template'),
  request = require('request');

var MAIN_URL = 'http://www.lnb.gob.pa/LNB/numerosjugados.php';

// Use MenioScraper base code
var LoteriaModel = function() {
  LoteriaModel.super_.call(this);
};
util.inherits(LoteriaModel, MenioScraper);

LoteriaModel.prototype.parse = function(html) {
  var self = this;
  var items = $.load(html)('table > tr');
  var numerosjugados = $($(items)[4]).find('tr');
  var data = _.map(_.rest(numerosjugados,3), function(row) {
     var cells = $(row).find('td');
     return self.cheeriot.render(cells, template);
   });

  return { sorteos: data };
};

LoteriaModel.prototype.fetch = function(query, options) {
  var self = this;
  // Query
  request.get(MAIN_URL, function(err, resp, html) {
    if (err) {
      options.error(err);
      return;
    }
    options.success(html, self.parse(html));
  });
};
module.exports = LoteriaModel;
