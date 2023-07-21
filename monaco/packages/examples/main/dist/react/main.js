/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactMonacoEditor } from './app.js';
const defaultCode = `"hello world"`;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ReactMonacoEditor, { defaultCode: defaultCode, hostname: 'localhost', path: '/groovy-language-server', port: 9000 }));
//# sourceMappingURL=main.js.map