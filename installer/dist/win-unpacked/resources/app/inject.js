var fs = require('fs');
var path = require('path');
var rootPath = path.join(__dirname, '../../../..').replace(/\\/g, "/");

module.exports = function(discord) {
    // load all javascript files in /javascript
    fs.readdir(rootPath + '/Injector' + '/javascript/', function(err, files) {
        files.forEach(function(file) {
            var script = fs.readFileSync(rootPath + '/Injector' + '/javascript/' + file).toString();
            discord.mainWindow.webContents.executeJavaScript(script);
        });
    });
    
    // load all css files in /css
    fs.readdir(rootPath + '/Injector' + '/css/', function(err, files) {
        files.forEach(function(file) {
            var style = fs.readFileSync(rootPath + '/Injector' + '/css/' + file).toString();
            discord.mainWindow.webContents.insertCSS(style);
        });
    });

    // load all plugins in /plugins
    fs.readdirSync(rootPath + '/Injector' + '/plugins')
    .filter(file => fs.lstatSync(path.join(rootPath + '/Injector' + '/plugins', file)).isDirectory())
    .forEach(function(folder) {
        require(path.join(rootPath + '/Injector' +'/plugins', folder))(discord);

        // load all javascript files in /plugins/<plugin>/javascript
        try {
            fs.readdirSync(path.join(rootPath + '/Injector' +'/plugins', folder) + '/inject/javascript')
            .forEach(file => {
                var script = fs.readFileSync(path.join(rootPath + '/Injector' +'/plugins', folder) + '/inject/javascript/' + file).toString();
                discord.mainWindow.webContents.executeJavaScript(script);
            });
        } catch(e) {}

        // load all javascript files in /plugins/<plugin>/css
        try {
            fs.readdirSync(path.join(rootPath + '/Injector' +'/plugins', folder) + '/inject/css')
            .forEach(file => {
                var style = fs.readFileSync(path.join(rootPath + '/Injector' +'/plugins', folder) + '/inject/css/' + file).toString();
                discord.mainWindow.webContents.insertCSS(style);
            });
        } catch(e) {}
    });
}