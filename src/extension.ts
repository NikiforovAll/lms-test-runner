import * as vscode from 'vscode';
import { RunTestsCommand } from './commands/run-tests.command';
import { ICommand } from './commands/command.interface';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('lmsTestRunner.runForCurrentFile', () => {
		const command: ICommand = new RunTestsCommand();
		command.run();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
