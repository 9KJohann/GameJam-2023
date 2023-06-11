const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({ width: 1280, height: 1024, fullscreen: true, });
    win.maximize();

    win.loadFile('index.html');
    win.show();

    return win;
}

app.on('keydown', (e) => {
    if (e.key == "Escape") {
        win.quit();
        win.close();
    }
});

app.whenReady().then(() => createWindow());