"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const Server_1 = require("./Server");
let server;
function activate(context) {
    const subscriptions = context.subscriptions;
    subscriptions.push(vscode.commands.registerCommand("extension.serveProject", function () {
        if (server && server.isRunning()) {
            vscode.window.showErrorMessage("Server is already running!");
            return;
        }
        createServer(context.extensionPath);
    }));
    subscriptions.push(vscode.commands.registerCommand("extension.reloadServer", function () {
        if (server) {
            server.shutDown();
        }
        createServer(context.extensionPath);
    }));
    subscriptions.push(vscode.commands.registerCommand("extension.stopServer", deactivate));
}
exports.activate = activate;
function deactivate() {
    if (server) {
        server.shutDown();
    }
}
exports.deactivate = deactivate;
function createServer(extensionPath) {
    const config = vscode.workspace.getConfiguration("phpserver");
    const relativePath = config.get("relativePath");
    const router = config.get("router");
    const phpPath = config.get("phpPath");
    const port = config.get("port");
    const ip = config.get("ip");
    server = new Server_1.default(ip, port, relativePath, extensionPath);
    server.setRouter(router);
    server.setPhpPath(phpPath);
    server.execBrowser(config.get('browser'), vscode.window.activeTextEditor ?
        vscode.window.activeTextEditor.document.fileName : null);
}
//# sourceMappingURL=extension.js.map