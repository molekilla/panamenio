var $ = require('cheerio'),
    _ = require('underscore');

var BaseCheerioTemplate = function(el, elements, template) {

  this.el = function(selector, at) {
    return $($(el).find(selector));
  };

  this.get = function(index) {
    return this.$el.eq(index);
  };

  this.getTextAt = function(index) {
    return this.$el.eq(index).text();
  };

  _.extend(this, template);
  this.$el = $(elements);
};

var CheerioTemplate = function(root) {
  this.root = root;
};

CheerioTemplate.prototype.render = function(elements, template) {
  var keys =_.keys(template);
  var mappings = _.values(template);
  var extendedTemplate = new BaseCheerioTemplate(this.root, elements, template);

  var model = {};
  for (var i=0;i<keys.length;i++) {
    var name = keys[i];
    // Args: none
    model[name] = mappings[i].call(extendedTemplate);
  }
  return model;
};
module.exports = CheerioTemplate;


