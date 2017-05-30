var electron = require('electron');
var {app, BrowserWindow} = electron;

var http = require('http');

app.on('ready', function() {

    var windowOptions = {
        width: 800,
        height: 600,
        frame: false,
        resizable: false,
        devTools: true
    }

    let mainWin = new BrowserWindow(windowOptions);

    mainWin.loadURL(`file://${__dirname}/index.html`);
    mainWin.toggleDevTools();
});