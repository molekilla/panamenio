var $ = require('cheerio'),
  request = require('request');

var MetrobusModel = function(cardId, res) {
  this.cardId = cardId;
  this.res = res;
};

MetrobusModel.prototype.parse = function(err, resp, html) {
  if (err) {
    console.error(err);
  }

  var table, cells, cardId, contractStatus, balance, lastTransactionDate;

  table = $.load(html)('table[border=0][align=center][cellpadding=3][cellspacing=1]');
  cells = $(table).find('td');
  _cardId = $(cells[1]).text();
  _status = $(cells[3]).text();
  
  if(_status === ' --- '){
    _status = 'Sin contrato';
    _balance = '0.00';
    _lastTransactionDate = '00/00/0000 00:00';
  }
  else{
    _balance = $(cells[5]).text();
    _lastTransactionDate = $(cells[7]).text();
  }

  this.res.json(200, {
    cardId: _cardId,
   status: _status,
    balance: _balance,
    lastTransactionDate: _lastTransactionDate
  });
};

MetrobusModel.prototype.fetch = function() {
    var self = this;
    request.get('http://200.46.245.230:8080/PortalCAE-WAR-MODULE/SesionPortalServlet?accion=6&NumDistribuidor=99&NomUsuario=usuInternet&NomHost=AFT&NomDominio=aft.cl&Trx=&RutUsuario=0&NumTarjeta='+self.cardId+'&bloqueable=', self.parse.bind(self));
};

module.exports = MetrobusModel;