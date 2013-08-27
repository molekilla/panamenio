var _ = require('underscore'),
  $ = require('cheerio'),
  CheerioTemplate = require('../cheerio_helper'),
  template = require('./metrobus_template'),
  request = require('request'),
  MAIN_URL = 'http://200.46.245.230:8080/PortalCAE-WAR-MODULE/SesionPortalServlet';


var MetrobusModel = function(cardId) {
  this.cardId = cardId;
};

MetrobusModel.prototype.parse = function(html) {
  var table = $.load(html)('table[border=0][align=center][cellpadding=3][cellspacing=1]');
  var templateManager = new CheerioTemplate(table);
  return templateManager.render(null, template);
};

MetrobusModel.prototype.fetch = function(options) {
    console.log(this.cardId);
    var self = this;
    request.get(MAIN_URL+'?accion=6&NumDistribuidor=99&NomUsuario=usuInternet&NomHost=AFT&NomDominio=aft.cl&Trx=&RutUsuario=0&NumTarjeta='+self.cardId+'&bloqueable=', function(err, resp, html){
      if (err) {
        options.error(err);
        return;
      }
      options.success(html, self.parse(html));
    });
};

module.exports = MetrobusModel;