var _ = require('underscore'),
  $ = require('cheerio'),
  MenioScraper = require('./../../menioscraper'),
  util = require('util'),
  template = require('./regpubsa_template'),
  request = require('request');

var MAIN_URL = 'https://www.registro-publico.gob.pa/';
var SA_QUERY_ITEM = 'MESAMENU?TODO=SHOW&FROM=&TO=&START=1&USUARIO=testtest&CONTRASENA=74303732303330313365737474657374&MENSAJE=Error&ID=';

var generateIndexQuery = function(query) {
  return function(callback) {
    var url = MAIN_URL + 'scripts/nwwisapi.dll/conweb/MESAMENU?TODO=MER4&FROM=' + 
    query + '&TO=&START=1&ID=$ID&USUARIO=testtest&CONTRASENA=74303732303330313365737474657374&MENSAJE=';
    console.log(url);
    return request.get(url, callback);
  };
};

var generateItemQuery = function(id) {
  return function(callback) {
    var url = MAIN_URL + 'scripts/nwwisapi.dll/conweb/' +
    SA_QUERY_ITEM + id;
    return request.get(url, callback);
  } 
};

// Use MenioScraper base code
var RegPubModel = function() {
  RegPubModel.super_.call(this);
};
util.inherits(RegPubModel, MenioScraper);

RegPubModel.prototype.parse = function(html) {
  var self = this;
  var tables = $.load(html)('table');
  var rows = $(tables.last()).find('tr');
  var data = _.map(_.rest(rows, 1), function(row) {
    var cells = $(row).find('td');
    return self.cheeriot.render(cells, template);
  });

  return { sociedades: data };
};

RegPubModel.prototype.fetch = function(query, options) {
  var self = this;
  var fetchQuery = generateIndexQuery(query);
  fetchQuery(function(err, resp, html) {
    if (err) {
      options.error(err);
      return;
    }
    options.success(html, self.parse(html));
  });
};
module.exports = RegPubModel;
