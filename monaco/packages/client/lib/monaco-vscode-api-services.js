/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api.js';
import { ILogService, initialize as initializeMonacoService, StandaloneServices } from 'vscode/services';
import { initialize as initializeVscodeExtensions } from 'vscode/extensions';
export const wasVscodeApiInitialized = () => {
    return window.MonacoEnvironment?.vscodeApiInitialised === true;
};
export const initServices = async (config) => {
    await importAllServices(config);
    if (config?.debugLogging === true) {
        console.log('initializeMonacoService completed successfully');
    }
    await initializeVscodeExtensions();
    if (config?.debugLogging === true) {
        console.log('initializeVscodeExtensions completed successfully');
    }
    if (!window.MonacoEnvironment) {
        window.MonacoEnvironment = {
            createTrustedTypesPolicy: (_policyName) => {
                return undefined;
            }
        };
    }
    window.MonacoEnvironment.vscodeApiInitialised = true;
};
const importAllServices = async (config) => {
    const promises = [];
    const serviceNames = [];
    const lc = config ?? {};
    const userServices = lc.userServices ?? {};
    const addService = (name, promise) => {
        promises.push(promise);
        serviceNames.push(name);
    };
    if (lc.enableFilesService === true) {
        addService('files', import('vscode/service-override/files'));
    }
    if (lc.enableModelService === true) {
        addService('model', import('vscode/service-override/model'));
    }
    if (lc.configureEditorOrViewsServiceConfig !== undefined) {
        if (lc.configureEditorOrViewsServiceConfig.enableViewsService) {
            addService('views', import('vscode/service-override/views'));
        }
        else {
            addService('editor', import('vscode/service-override/editor'));
        }
    }
    if (lc.configureConfigurationServiceConfig !== undefined) {
        addService('configuration', import('vscode/service-override/configuration'));
    }
    if (lc.enableDialogService === true) {
        addService('dialogs', import('vscode/service-override/dialogs'));
    }
    if (lc.enableNotificationService === true) {
        addService('notifications', import('vscode/service-override/notifications'));
    }
    if (lc.enableThemeService === true) {
        addService('theme', import('vscode/service-override/theme'));
    }
    if (lc.enableTextmateService === true) {
        addService('textmate', import('vscode/service-override/textmate'));
    }
    if (lc.enableKeybindingsService === true) {
        addService('keybindings', import('vscode/service-override/keybindings'));
    }
    if (lc.enableLanguagesService === true) {
        addService('languages', import('vscode/service-override/languages'));
    }
    if (lc.enableAudioCueService === true) {
        addService('audioCue', import('vscode/service-override/audioCue'));
    }
    if (lc.enableDebugService === true) {
        addService('debug', import('vscode/service-override/debug'));
    }
    if (lc.enablePreferencesService === true) {
        addService('preferences', import('vscode/service-override/preferences'));
    }
    if (lc.enableSnippetsService === true) {
        addService('snippets', import('vscode/service-override/snippets'));
    }
    if (lc.enableQuickaccessService === true) {
        addService('quickaccess', import('vscode/service-override/quickaccess'));
    }
    if (lc.enableOutputService === true) {
        addService('output', import('vscode/service-override/output'));
    }
    if (lc.configureTerminalServiceConfig !== undefined) {
        addService('terminal', import('vscode/service-override/terminal'));
    }
    if (lc.enableSearchService === true) {
        addService('search', import('vscode/service-override/search'));
    }
    if (lc.enableMarkersService === true) {
        addService('markers', import('vscode/service-override/markers'));
    }
    const reportServiceLoading = (origin, services, debugLogging) => {
        for (const serviceName of Object.keys(services)) {
            if (debugLogging) {
                console.log(`Loading ${origin} service: ${serviceName}`);
            }
        }
    };
    const mergeServices = (services, overrideServices) => {
        for (const [name, service] of Object.entries(services)) {
            overrideServices[name] = service;
        }
    };
    let count = 0;
    const loadedImports = await Promise.all(Object.values(promises));
    const overrideServices = {};
    if (userServices) {
        mergeServices(userServices, overrideServices);
        reportServiceLoading('user', userServices, lc.debugLogging === true);
    }
    // files service is required
    if (!serviceNames.includes('files') && !Object.keys(overrideServices).includes('fileService')) {
        throw new Error('"files" service was not configured, but it is mandatory. Please add it to the "initServices" config.');
    }
    // theme requires textmate
    if ((serviceNames.includes('theme') || Object.keys(overrideServices).includes('themeService')) &&
        !(serviceNames.includes('textmate') || Object.keys(overrideServices).includes('textMateTokenizationFeature'))) {
        throw new Error('"theme" requires "textmate" service. Please add it to the "initServices" config.');
    }
    // quickaccess requires keybindings
    if ((serviceNames.includes('quickaccess') || Object.keys(overrideServices).includes('quickInputService')) &&
        !(serviceNames.includes('keybindings') || Object.keys(overrideServices).includes('keybindingService'))) {
        throw new Error('"quickaccess" requires "keybindings" service. Please add it to the "initServices" config.');
    }
    if (serviceNames.includes('markers') &&
        !(serviceNames.includes('views') || Object.keys(overrideServices).includes('viewsService'))) {
        throw new Error('"markers" requires "views" service. Please add it to the "initServices" config.');
    }
    for (const loadedImport of loadedImports) {
        const serviceName = serviceNames[count];
        if (lc.debugLogging === true) {
            console.log(`Initialising provided service: ${serviceName}`);
        }
        let services = {};
        if (serviceName === 'editor' || serviceName === 'views') {
            if (lc.configureEditorOrViewsServiceConfig.useDefaultOpenEditorFunction) {
                const defaultOpenEditorFunc = async (model, options, sideBySide) => {
                    console.log('Trying to open a model', model, options, sideBySide);
                    return undefined;
                };
                services = loadedImport.default(defaultOpenEditorFunc);
            }
            else if (lc.configureEditorOrViewsServiceConfig?.openEditorFunc) {
                services = loadedImport.default(lc.configureEditorOrViewsServiceConfig.openEditorFunc);
            }
        }
        else if (serviceName === 'configuration') {
            if (lc.configureConfigurationServiceConfig?.defaultWorkspaceUri) {
                const uri = Uri.file(lc.configureConfigurationServiceConfig.defaultWorkspaceUri);
                services = loadedImport.default(uri);
            }
        }
        else if (serviceName === 'terminal') {
            if (lc.configureTerminalServiceConfig?.backendImpl) {
                services = loadedImport.default(lc.configureTerminalServiceConfig.backendImpl);
            }
        }
        else {
            services = loadedImport.default();
        }
        mergeServices(services, overrideServices);
        reportServiceLoading('user', services, lc.debugLogging === true);
        count++;
    }
    await initializeMonacoService(overrideServices);
    if (lc.logLevel) {
        StandaloneServices.get(ILogService).setLevel(lc.logLevel);
    }
};
//# sourceMappingURL=monaco-vscode-api-services.js.map