var fs = require('original-fs');
var path = require('path');
var exec = require('child_process').exec;
const unpacker = path.join(__dirname, 'asarUnpacker', 'unpack.exe');

function install(dir) {
    try {
        var asarDir = path.join(dir, getNewestAppFolder(getDirectories(dir)), 'resources', 'app.asar').toString().replace(/\\/g, "/");
        var destDir = path.join(dir, getNewestAppFolder(getDirectories(dir)), 'resources', 'app').toString().replace(/\\/g, "/");
        console.log(asarDir);
        console.log(destDir);

        exec(unpacker + ' \"' + asarDir + '\" \"' + destDir + '\"', extractionComplete);

    } catch (e) {
        console.error('Invalid Discord install directory.');
        console.error(e);
    }
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
}

function getNewestAppFolder(folders) {
    var appFolders = [];
    for(var i in folders) {
        if(folders[i].match("app")) {
            appFolders.push({
                'folder': folders[i],
                'version': folders[i].substr(folders[i].indexOf('-') + 1)
            });
        }
    }
    return appFolders.sort(function(a, b) {
        return parseFloat(a.version) - parseFloat(b.version);
    }).reverse()[0].folder;
}

function extractionComplete(err, stdout, stderr) {
    if (err) throw err;
    if (stderr) throw stderr;
    if(!err && !stderr) {
        console.log('Extraction Complete!');
    }
}