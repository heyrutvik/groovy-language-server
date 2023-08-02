import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
import { LogLevel } from 'vscode/services';
import type { OpenEditor } from 'vscode/service-override/editor';
import { ITerminalBackend, SimpleTerminalBackend } from 'vscode/service-override/terminal';
export type InitializeServiceConfig = {
    enableFilesService?: boolean;
    enableDialogService?: boolean;
    enableNotificationService?: boolean;
    enableModelService?: boolean;
    configureEditorOrViewsServiceConfig?: {
        enableViewsService: boolean;
        useDefaultOpenEditorFunction: boolean;
        openEditorFunc?: OpenEditor;
    };
    configureConfigurationServiceConfig?: {
        defaultWorkspaceUri: string;
    };
    enableThemeService?: boolean;
    enableKeybindingsService?: boolean;
    enableTextmateService?: boolean;
    enableLanguagesService?: boolean;
    enableAudioCueService?: boolean;
    enableDebugService?: boolean;
    enablePreferencesService?: boolean;
    enableSnippetsService?: boolean;
    enableQuickaccessService?: boolean;
    enableOutputService?: boolean;
    configureTerminalServiceConfig?: {
        backendImpl: SimpleTerminalBackend | ITerminalBackend;
    };
    enableSearchService?: boolean;
    enableMarkersService?: boolean;
    userServices?: editor.IEditorOverrideServices;
    debugLogging?: boolean;
    logLevel?: LogLevel;
};
export declare const wasVscodeApiInitialized: () => boolean;
export declare const initServices: (config?: InitializeServiceConfig) => Promise<void>;
//# sourceMappingURL=monaco-vscode-api-services.d.ts.map