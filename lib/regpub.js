// TODO: Not ready for prime time. Needs specs and testing.
var _ = require('underscore'),
  $ = require('cheerio'),
  request = require('request');

var generateQuery = function(query) {
  var MAIN_URL = 'https://www.registro-publico.gob.pa/';
  return function(callback) {
    var url = MAIN_URL + 'scripts/nwwisapi.dll/conweb/MESAMENU?TODO=MER4&FROM=' + query + '&TO=&START=1&ID=$ID&USUARIO=testtest&CONTRASENA=74303732303330313365737474657374&MENSAJE=';
    console.log(url);
    return request.get(url, callback);
  };
};

var RegPubModel = function(res) {
  this.res = res;
};

RegPubModel.prototype.parse = function(err, resp, html) {
  if (err) {
    console.error(err);
  }

  var tables = $.load(html)('table');
  var rows = $(tables.last()).find('tr:gt(1)');
  var data = _.map(rows, function(row) {
    var cells = $(row).find('td');
    return {
    };
  });
  this.res.send($(tables).html());
};

RegPubModel.prototype.fetch = function(query, pageOptions) {
  var fetchQuery = generateQuery(query);
  fetchQuery(this.parse.bind(this));
};

module.exports = RegPubModel;
