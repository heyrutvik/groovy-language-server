/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactMonacoEditor } from './app.js';

const defaultCode = `package com.example\n\nimport java.lang.StringBuilder;\n\nStringBuilder s = new StringBuil`;

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<ReactMonacoEditor
    defaultCode={defaultCode}
    hostname={'localhost'}
    path={'/groovy-language-server'}
    port={9000} />);
