var $ = require('cheerio'),
    _ = require('underscore');

var CheerioHelper = function() {
};

CheerioHelper.prototype.toModel = function(elements, model) {
  // For each element in sequence, execute model attribute
  var keys =_.keys(model);
  var mappings = _.values(model);
  var model = {};
  var func = _.extend(function() {}, model);
  var context = new func();
  context.elements = $(elements);
  for (var i=0;i<keys.length;i++) {
    debugger;
    model[keys[i]] = mappings[i].call(context, $(elements[i]));
  }
  return model;
}
module.exports = CheerioHelper;


