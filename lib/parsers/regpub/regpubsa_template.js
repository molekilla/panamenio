var Cheeriot = require('./../../cheeriot');
var RegpubSociedadesIndexTemplate =  {
  sociedad: function() {
    return this.$el.eq(0).text();
  },
  ficha: function() {
    return this.$el.eq(1).text();
  },
  estado: function() {
    return this.$el.eq(2).text();
  },
  tomo: function() {
    return this.$el.eq(3).text();
  },
  folio: function() {
    return this.$el.eq(4).text();
  },
  links: function() {
    return {
      ficha: {
        href: "/item/" + this.$el.eq(1).text()
      }
    };
  }
};
module.exports=new Cheeriot(RegpubSociedadesIndexTemplate);