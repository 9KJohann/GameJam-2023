const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({ width: 1280, height: 1024, fullscreen: true, });
    win.maximize();

    win.loadFile('index.html');
    win.show();

    win.addEventListener('keydown', (e) => {
        if (e.key == "Escape") {
            win.quit();
        }
    }, true)
    return win;
}

app.whenReady().then(() => createWindow());