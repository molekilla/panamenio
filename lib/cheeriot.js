var $ = require('cheerio'),
    _ = require('underscore');

var Cheeriot = function(template) {
  this._keys =_.keys(template);
  this._mappings = _.values(template);
  _.extend(this, template);
};
Cheeriot.prototype.el = function(selector, at) {
  return $(this.$el.find(selector));
};
Cheeriot.prototype.setElement = function(root) {
  this.$el = $(root);
};
module.exports=Cheeriot;