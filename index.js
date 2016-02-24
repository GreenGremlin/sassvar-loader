"use strict";

var loaderUtils = require("loader-utils");
var fs = require('fs');
var path = require("path");

function getContentPath(path) {
  var queryString = JSON.stringify(query);
  var varPath = queryString.replace(/["']/g, '');
  return path.resolve(varPath);
}

function jsonToSassVars (obj, indent) {
  // Make object root properties into sass variables
  var sass = "";
  for (var key in obj) {
    sass += "$" + key + ":" + JSON.stringify(obj[key], null, indent) + ";\n";
  }

  // Store string values (so they remain unaffected)
  var storedStrings = [];
  sass = sass.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, function (str) {

    var id = "___JTS" + storedStrings.length;
    storedStrings.push({id: id, value: str});
    return id;
  });

  // Convert js lists and objects into sass lists and maps
  sass = sass.replace(/[{\[]/g, "(").replace(/[}\]]/g, ")");

  // Put string values back (now that we're done converting)
  storedStrings.forEach(function (str) {
    str.value = str.value.replace(/["']/g, '');
    sass = sass.replace(str.id, str.value);
  });

  return sass;
}

module.exports = function(content) {
  var query = loaderUtils.parseQuery(this.query);
  var sassVars;
  var contentPath;

  if (query.path) {
    contentPath = getContentPath(query.path);
    this.cacheable();
    this.addDependency(contentPath);
    sassVars = jsonToSassVars(JSON.parse(fs.readFileSync(contentPath, 'utf8')));
  }
  else if (query.data) {
    sassVars = query.data;
  }
  else {
    sassVars = jsonToSassVars(query);
  }

  return sassVars ? sassVars + '\n ' + content : content;
}

module.exports.jsonToSassVars = jsonToSassVars;
