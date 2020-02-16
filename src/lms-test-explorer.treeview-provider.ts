import * as vscode from 'vscode';

export class LMSTestExplorerTreeViewProvider  implements vscode.TreeDataProvider<LMSTestResult>{
    constructor(private payload: LMSTestResult[]) {

    }
    onDidChangeTreeData?: vscode.Event<LMSTestResult | null | undefined> | undefined;

    getTreeItem(element: LMSTestResult): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: LMSTestResult | undefined): vscode.ProviderResult<LMSTestResult[]> {
        // throw new Error("Method not implemented.");
        return this.payload;
    }


}

export class LMSTestResult extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		public readonly command?: vscode.Command
	) {
		super(label, vscode.TreeItemCollapsibleState.None);
	}

	get tooltip(): string {
		return `${this.label}`;
	}

	contextValue = 'test';
}
