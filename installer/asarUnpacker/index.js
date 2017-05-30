var asarPackage = process.argv[2];
var outputDir = process.argv[3];

var asar = require('asar');
var path = require('path');

asar.extractAll(asarPackage, outputDir);