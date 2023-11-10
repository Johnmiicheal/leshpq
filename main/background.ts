import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
const { fork } = require("child_process");

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
	serve({ directory: "app" });
} else {
	app.setPath("userData", `${app.getPath("userData")} (development)`);

	const apiModule = path.join(__dirname, "../api/index.js");
	const apiWorker = fork(apiModule, [], { detached: false });
	process.once("exit", () => apiWorker.kill());
}

(async () => {
	await app.whenReady();

	const mainWindow = createWindow("main", {
		width: 1000,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
		(details, callback) => {
			callback({ requestHeaders: { Origin: "*", ...details.requestHeaders } });
		}
	);

	mainWindow.webContents.session.webRequest.onHeadersReceived(
		(details, callback) => {
			callback({
				responseHeaders: {
					"Access-Control-Allow-Origin": ["*"],
					...details.responseHeaders,
				},
			});
		}
	);

	if (isProd) {
		await mainWindow.loadURL("app://./home");
	} else {
		const port = process.argv[2];
		await mainWindow.loadURL(`http://localhost:${port}/home`);
		mainWindow.webContents.openDevTools();
	}
})();

app.on("window-all-closed", () => {
	app.quit();
});

ipcMain.on("message", async (event, arg) => {
	event.reply("message", `${arg} World!`);
});
