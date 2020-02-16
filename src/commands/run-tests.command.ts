import * as vscode from 'vscode';

import { LMSTestExplorerTreeViewProvider, LMSTestResult } from '../lms-test-explorer.treeview-provider';
import { ICommand } from './command.interface';

const axios = require('axios').default;

export class RunTestsCommand implements ICommand {

  capturedTextEditor: vscode.TextEditor | undefined;
  hostEndpoint: vscode.Uri;

  constructor() {
    this.capturedTextEditor = vscode.window.activeTextEditor;
    const config = vscode.workspace
      .getConfiguration('lmsTestRunner')?.get('endpoint') as string;
    this.hostEndpoint = vscode.Uri.parse(config);
  }

  /**
   * command to be executed
   */
  public async run(): Promise<void> {
    const filePath = this.capturedTextEditor?.document.fileName;
    if (!filePath) {
      return;
    }
    axios.get(this.hostEndpoint.toString())
      .then((res: any) => {
        vscode.window.showInformationMessage('Test Run has been activated!');
        // //TODO: populate tree view based on test result
        //this.registerTestExplorerDataProvider();

      })
      .catch((err: any) => {
        console.log(err);
        vscode.window.showErrorMessage(`Error: ${err}`);
      })
      //TODO: remove this when hostEndpoint is implemented
      .then(() => {
        this.registerTestExplorerDataProvider();
      });
  }

  private registerTestExplorerDataProvider() {
    //TODO: consider whether this should be disposed on vscode level
    vscode.window.registerTreeDataProvider(
      'lmsTestRunner', new LMSTestExplorerTreeViewProvider(
        [
          new LMSTestResult('TestResult1'),
          new LMSTestResult('TestResult2'),
        ]
      ));
  }
}
