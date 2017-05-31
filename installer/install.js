// Todo
// [ ] Add ability to close discord on install button with warning message
// [ ] Add ability to launch discord and close installer on "Launch Discord" button
// [ ] Disable close while installing
// [ ] Add creation of /Injector in discord install directory

var fs = require('original-fs');
var path = require('path');
var exec = require('child_process').exec;
var rimraf = require('rimraf');
const unpacker = path.join(__dirname, 'asarUnpacker', 'unpack.exe');
const packer = path.join(__dirname, 'asarPacker', 'packer.exe');

var asarDir, destDir;

function install(dir) {
    try {
        asarDir = path.join(dir, getNewestAppFolder(getDirectories(dir)), 'resources', 'app.asar').toString().replace(/\\/g, "/");
        destDir = path.join(dir, getNewestAppFolder(getDirectories(dir)), 'resources', 'app').toString().replace(/\\/g, "/");
        console.log(asarDir);
        console.log(destDir);

        changePage('#pageTwo');

        extract();

    } catch (e) {
        console.error('Invalid Discord install directory.');
        console.error(e);
        $('#selectBtn input').css('border-color', 'indianred');
        $('#invalidDirText').addClass('show');
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

function insertText(mainText, newText, index) {
    var splitText = [mainText.substring(0, index), mainText.substring(index)];
    splitText.splice(1, 0, newText);
    return splitText.join("");
}

function extract() {
    console.log('Beginning Extraction');
    changeInstallText('Extracting Discord');
    exec(unpacker + ' \"' + asarDir + '\" \"' + destDir + '\"', modify);
}

function modify(err, stdout, stderr) {
    if (err) throw err;
    if (stderr) throw stderr;
    if(!err && !stderr) {
        console.log('Extraction Complete!');
    }

    console.log('Beginning File Modification')
    changeInstallText('Modifying Discord Code');

    setTimeout(function() {
        var discordIndex = fs.readFileSync(path.join(destDir, 'index.js')).toString();
        var injectCode = fs.readFileSync(path.join(__dirname, 'hook.js')).toString();
        fs.writeFile(path.join(destDir, 'index.js'), insertText(discordIndex, injectCode, discordIndex.indexOf(';', discordIndex.indexOf(';', discordIndex.indexOf('did-fail-load')) + 1) +1), function() {
            fs.mkdir(path.join(destDir, 'inject'), function() {
                fs.writeFile(path.join(destDir, 'inject', 'index.js'), fs.readFileSync(path.join(__dirname, 'inject.js')), pack);
            });
        }); 
    }, 1000);
}

function pack() {
    console.log('File Modification Complete');
    console.log('Beginning Packing');
    changeInstallText('Repacking Discord');
    setTimeout(function() {
        fs.unlink(asarDir, function() {
            exec(packer + ' \"' + destDir + '\" \"' + asarDir + '\"', cleanUp);
        }); 
    }, 1000);
}

function cleanUp() {
    console.log('Packing Completed');
    console.log('Beginning Clean Up');
    changeInstallText('Cleaning Up');

    setTimeout(function() {
        rimraf(destDir, installationComplete);
    }, 1000);

}

function installationComplete() {
    changePage('#pageThree');
    console.log('Clean Up Completed');
    console.log('Installation Completed');
}