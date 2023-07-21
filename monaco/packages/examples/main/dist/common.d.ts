import 'monaco-editor/esm/vs/editor/editor.all.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';
import { editor, Uri } from 'monaco-editor/esm/vs/editor/editor.api.js';
import { IReference, ITextFileEditorModel } from 'vscode/monaco';
import 'vscode/default-extensions/theme-defaults';
import 'vscode/default-extensions/json';
import { MonacoLanguageClient } from 'monaco-languageclient';
import { MessageTransports } from 'vscode-languageclient';
export declare const createLanguageClient: (transports: MessageTransports) => MonacoLanguageClient;
export declare const createUrl: (hostname: string, port: number, path: string) => string;
export declare const createWebSocket: (url: string) => WebSocket;
export declare const createDefaultJsonContent: () => string;
export type ExampleJsonEditor = {
    languageId: string;
    editor: editor.IStandaloneCodeEditor;
    uri: Uri;
    modelRef: IReference<ITextFileEditorModel>;
};
export declare const createJsonEditor: (config: {
    htmlElement: HTMLElement;
    content: string;
    init: boolean;
}) => Promise<ExampleJsonEditor>;
//# sourceMappingURL=common.d.ts.map