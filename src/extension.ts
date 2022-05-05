// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec } from 'child_process';
import * as vscode from 'vscode';

// async function getProcessInfo(pid: number) {
// 	return new Promise((acc, rej) => {
// 		exec(`tasklist /FI "pid eq ${pid}"`, (err, stdout, stderr) => {
// 			if (err) {
// 				console.log(`Error`, err)
// 				return;
// 			}
// 			if (stderr) {
// 				console.log(`STDERR`, stderr)
// 				return;
// 			}
// 			let lines = stdout.split('\n');
// 			if(lines.length < 4){
// 				console.log(`Bad response from exec`,JSON.stringify(lines));
// 				return;
// 			}
// 			let interesting = lines[3];
// 			let
// 			console.log('got',JSON.stringify(lines));
// 		});
// 		acc("Test")
// 	})
// }
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "raskelll" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('raskelll.reloadHS', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		let abs = vscode.window.activeTextEditor?.document.fileName
		if (!abs) {
			vscode.window.showInformationMessage(`No open .hs file`);
			return;
		}

		let relative = vscode.workspace.asRelativePath(abs);
		if (!relative.endsWith('.hs')) {

			vscode.window.showInformationMessage(`Not a haskell file ${relative}`);
			return;
		}
		let terminal = vscode.window.activeTerminal;
		if (!terminal) {

			vscode.window.showInformationMessage(`No active terminal`);
			terminal = vscode.window.createTerminal('Haskell');
			terminal.show(true);
			terminal.sendText('ghci', true);
		}
		let pid = await terminal.processId;
		if (!pid) {
			vscode.window.showInformationMessage(`Error: No PID for active terminal`);
			return;
		}
		// let processData = await getProcessInfo(pid);
		vscode.window.showInformationMessage(`Reloading ${relative} in ${pid}`);
		terminal.show(true)
		terminal.sendText(`:l ${relative}`, true);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
