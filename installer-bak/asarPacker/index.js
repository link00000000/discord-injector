var inputDir = process.argv[2];
var outputPackage = process.argv[3];

var asar = require('asar');
var path = require('path');

asar.createPackage(inputDir, outputPackage, complete);

function complete() {
    console.log('Complete');
}