    
    
    // Injected Code
    mainWindow.webContents.on('did-finish-load', function() {
      require('./inject')({
        mainWindow: mainWindow,
        app: app,
        BrowserWindow: BrowserWindow,
        crashReporter: crashReporter,
        ipcMain: ipcMain,
        Menu: Menu,
        shell: shell
      });
    });
    // End Injected Code