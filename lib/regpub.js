// TODO: Not ready for prime time. Needs specs and testing.
var _ = require('underscore'),
  $ = require('cheerio'),
  request = require('request');

var SA_QUERY_ITEM = '"MESAMENU?TODO=SHOW&FROM=IMAGINAR&TO=&START=1&USUARIO=testtest&CONTRASENA=74303732303330313365737474657374&MENSAJE=Error&ID=';

var generateQuery = function(query) {
  var MAIN_URL = 'https://www.registro-publico.gob.pa/';
  return function(callback) {
    var url = MAIN_URL + 'scripts/nwwisapi.dll/conweb/MESAMENU?TODO=MER4&FROM=' + query + '&TO=&START=1&ID=$ID&USUARIO=testtest&CONTRASENA=74303732303330313365737474657374&MENSAJE=';
    console.log(url);
    return request.get(url, callback);
  };
};

var RegPubModel = function() {
};

RegPubModel.prototype.parse = function(html) {

  var tables = $.load(html)('table');
  var rows = $(tables.last()).find('tr');
  var data = _.map(_.rest(rows, 1), function(row) {
    var cells = $(row).find('td');
    return {
      sociedad: $(cells[0]).text(),
      ficha: $(cells[1]).text(),
      estatus: $(cells[2]).text(),
      tomo: $(cells[3]).text(),
      folio: $(cells[4]).text(),
      links: {
        ficha: {
          href: "/item/" + $(cells[1]).text()
        }
      }
    };
  });

  return { sociedades: data };
};

RegPubModel.prototype.fetch = function(query, options) {
  var self = this;
  var fetchQuery = generateQuery(query);
  fetchQuery(function(err, resp, html) {
    if (err) {
      options.error(err);
      return;
    }
    options.success(html, self.parse(html));
  });
};

module.exports = RegPubModel;
