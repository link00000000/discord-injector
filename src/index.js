var fs = require('fs');
var path = require('path');

module.exports = function(discord) {
    // load all javascript files in /javascript
    fs.readdir(__dirname + '/javascript/', function(err, files) {
        files.forEach(function(file) {
            var script = fs.readFileSync(__dirname + '/javascript/' + file).toString();
            discord.mainWindow.webContents.executeJavaScript(script);
        });
    });
    
    // load all css files in /css
    fs.readdir(__dirname + '/css/', function(err, files) {
        files.forEach(function(file) {
            var style = fs.readFileSync(__dirname + '/css/' + file).toString();
            discord.mainWindow.webContents.insertCSS(style);
        });
    });

    // load all plugins in /plugins
    fs.readdirSync(__dirname + '/plugins')
    .filter(file => fs.lstatSync(path.join(__dirname + '/plugins', file)).isDirectory())
    .forEach(function(folder) {
        require(path.join(__dirname +'/plugins', folder))(discord);

        // load all javascript files in /plugins/<plugin>/javascript
        try {
            fs.readdirSync(path.join(__dirname +'/plugins', folder) + '/inject/javascript')
            .forEach(file => {
                var script = fs.readFileSync(path.join(__dirname +'/plugins', folder) + '/inject/javascript/' + file).toString();
                discord.mainWindow.webContents.executeJavaScript(script);
            });
        } catch(e) {}

        // load all javascript files in /plugins/<plugin>/css
        try {
            fs.readdirSync(path.join(__dirname +'/plugins', folder) + '/inject/css')
            .forEach(file => {
                var style = fs.readFileSync(path.join(__dirname +'/plugins', folder) + '/inject/css/' + file).toString();
                discord.mainWindow.webContents.insertCSS(style);
            });
        } catch(e) {}
    });
}