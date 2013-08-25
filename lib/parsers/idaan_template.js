var IdaanTemplate =  {
  agua: function() {
    return parseFloat(this.el('th').eq(1).text().substring(2), 10);
  },
  basura: function() {
    return parseFloat(this.el('th').eq(3).text().substring(2), 10);
  },
  total: function() {
    return this.agua() + this.basura();
  },
  owner: function() {
    var infoBox = this.el('strong');
    return infoBox.eq(2).parent().text().replace(infoBox.eq(2).text(), "").trim();
  },
  nic: function() {
    var infoBox = this.el('strong');
    return infoBox.eq(1).parent().text().replace(infoBox.eq(1).text(), "").trim();
  },
  updatedAt: function() {
    return this.el('strong').eq(3).text().replace('Saldo a la Fecha:', "").trim();
  },
  lastPaymentAt: function() {
    return this.el('strong').eq(6).text().replace(".", "").trim();
  },
  lastPaymentAmount: function() {
    console.log(this.el('strong').eq(5).text());
    return parseFloat(this.el('strong').eq(5).text().substring(3), 10);
  },
  dateFormatISO: function() {
    return 'es-pa';
  }

};
module.exports=IdaanTemplate;