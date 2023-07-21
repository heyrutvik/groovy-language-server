/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import 'monaco-editor/esm/vs/editor/editor.all.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';
import React, { createRef, useEffect, useMemo, useRef } from 'react';
import { createJsonEditor, createUrl, createWebSocket } from '../common.js';
import { buildWorkerDefinition } from 'monaco-editor-workers';
buildWorkerDefinition('../../../node_modules/monaco-editor-workers/dist/workers/', new URL('', window.location.href).href, false);
let init = true;
export const ReactMonacoEditor = ({ defaultCode, hostname, path, port, className }) => {
    const editorRef = useRef();
    const ref = createRef();
    const url = useMemo(() => createUrl(hostname, port, path), [hostname, port, path]);
    let lspWebSocket;
    useEffect(() => {
        const currentEditor = editorRef.current;
        if (ref.current != null) {
            const start = async () => {
                await createJsonEditor({
                    htmlElement: ref.current,
                    content: defaultCode,
                    init
                });
                if (init) {
                    init = false;
                }
                lspWebSocket = createWebSocket(url);
            };
            start();
            return () => {
                currentEditor?.dispose();
            };
        }
        window.onbeforeunload = () => {
            // On page reload/exit, close web socket connection
            lspWebSocket?.close();
        };
        return () => {
            // On component unmount, close web socket connection
            lspWebSocket?.close();
        };
    }, []);
    return (React.createElement("div", { ref: ref, style: { height: '50vh' }, className: className }));
};
//# sourceMappingURL=app.js.map