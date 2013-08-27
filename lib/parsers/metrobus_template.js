var MetrobusTemplate =  {
  cardId: function() {
    return this.el('td').eq(1).text();
  },
  status: function() {
    return this.el('td').eq(3).text();
  },
  balance: function() {
    return this.el('td').eq(5).text();
  },
  lastTransactionAt: function() {
    return this.el('td').eq(7).text();
  }
};
module.exports=MetrobusTemplate;