var _ = require('underscore'),
  $ = require('cheerio'),
  MenioScraper = require('./../../menioscraper'),
  util = require('util'),
  template = require('./regpubsa_template'),
  request = require('request');

var MAIN_URL = 'https://www.registro-publico.gob.pa/';
var SA_QUERY_ITEM = 'MESAMENU?TODO=SHOW&FROM=&TO=&START=1&USUARIO=testtest&CONTRASENA=74303732303330313365737474657374&ID=';
var generateItemQuery = function(id) {
  return function(callback) {
    var url = MAIN_URL + 'scripts/nwwisapi.dll/conweb/' +
    SA_QUERY_ITEM + id;
    return request.get(url, callback); 
  } 
};

// Use MenioScraper base code
var RegPubItemModel = function() {
  RegPubItemModel.super_.call(this);
};
util.inherits(RegPubItemModel, MenioScraper);

RegPubItemModel.prototype.parse = function(html) {
  var self = this;
  var tables = $.load(html)('table');
  // var rows = $(tables.last()).find('tr');
  // var data = _.map(_.rest(rows, 1), function(row) {
  //   var cells = $(row).find('td');
  //   return self.cheeriot.render(cells, template);
  // });

  return { sociedades: html };
};

RegPubItemModel.prototype.fetch = function(query, options) {
  var self = this;
  var fetchQuery = generateItemQuery(query);
  fetchQuery(function(err, resp, html) {
    if (err) {
      options.error(err);
      return;
    }
    options.success(html, self.parse(html));
  });
};
module.exports = RegPubItemModel;
