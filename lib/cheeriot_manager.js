var $ = require('cheerio'),
    _ = require('underscore');

var CheeriotManager = function() {
};

CheeriotManager.prototype.render = function(root, template) {
  template.setElement(root);
  var model = {};
  for (var i=0;i<template._keys.length;i++) {
    var name = template._keys[i];
    // Args: none
    model[name] = template._mappings[i].call(template);
  }
  return model;
};
module.exports = CheeriotManager;


