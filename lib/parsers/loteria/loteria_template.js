var Cheeriot = require('./../../cheeriot');
var LoteriaTemplate = {
  tipo: function() {
    return this.$el.eq(0).text();
  },
  fecha: function() {
    return this.$el.eq(1).text();
  },
  primero: function() {
    return {
      numero: this.$el.eq(2).text(),
      serie: this.$el.eq(4).text(),
      folio: this.$el.eq(5).text(),
      verificacion: this.$el.eq(6).text(),
      letras: this.$el.eq(3).text()
    };
  },
  segundo: function() {
    return {
      numero: this.$el.eq(7).text()
    };
  },
  tercero: function() {
    return {
      numero: this.$el.eq(8).text()
    };  
  },
  dateFormatISO: function() {
    return 'es-pa';
  }
};
module.exports= new Cheeriot(LoteriaTemplate);
