// https://electronjs.org/docs/api/browser-window
const { app, Menu, MenuItem, BrowserWindow } = require('electron');

let browserWindow = null;

function createWindow() {
	browserWindow = new BrowserWindow({ width: 800, height: 600 });
	browserWindow.setMenu(null);
	browserWindow.loadURL("https://kissanime.ru");
	browserWindow.maximize();

	// Emitted when the window is closed.
	browserWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		browserWindow = null
	});

	browserWindow.webContents.on('new-window', function (e, url) {
		console.log('new-window prevented', url);
		e.preventDefault();
	});

	browserWindow.webContents.on('context-menu', (e) => {
		e.preventDefault()
		const menu = new Menu();
		const menuItem = new MenuItem({
			label: 'Open Dev Tools',
			click: () => {
				browserWindow.openDevTools();
			}
		})
		menu.append(menuItem);
		menu.popup(browserWindow);
	}, false)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (browserWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.