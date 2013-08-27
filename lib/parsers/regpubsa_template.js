var RegpubSociedadesIndexTemplate =  {
  sociedad: function() {
    return this.get(0).text();
  },
  ficha: function() {
    return this.getTextAt(1);
  },
  estado: function() {
    return this.getTextAt(2);
  },
  tomo: function() {
    return this.getTextAt(3);
  },
  folio: function() {
    return this.getTextAt(4);
  },
  links: function() {
    return {
      ficha: {
        href: "/item/" + this.$el.eq(1).text()
      }
    };
  }
};
module.exports=RegpubSociedadesIndexTemplate;