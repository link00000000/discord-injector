module.exports = function(discord) {
    let newWin = new discord.BrowserWindow({
        title: 'Example Plugin',
        width: 600,
        height: 500,
        frame: false
    });

    newWin.loadURL(`file://${__dirname}/popup.html`);

}