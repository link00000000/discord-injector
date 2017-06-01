var fs = require('fs');
var path = require('path');

module.exports = function(discord) {
        var firstTimeDir = (__dirname + '/firstTime.json').replace(/\\/g, "/");
        fs.readFile(firstTimeDir, function(err, data) {
            if(JSON.parse(data).firstTime) {
                let newWin = new discord.BrowserWindow({
                    title: 'Welcome Text',
                    width: 600,
                    height: 500,
                    frame: false
                });

                newWin.loadURL(`file://${__dirname}/popup.html`);
                fs.writeFileSync(firstTimeDir, '{"firstTime": false}');
            }
        });
        
}