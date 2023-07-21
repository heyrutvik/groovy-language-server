import 'monaco-editor/esm/vs/editor/editor.all.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';
import React from 'react';
export type EditorProps = {
    defaultCode: string;
    hostname: string;
    port: number;
    path: string;
    className?: string;
};
export declare const ReactMonacoEditor: React.FC<EditorProps>;
//# sourceMappingURL=app.d.ts.map