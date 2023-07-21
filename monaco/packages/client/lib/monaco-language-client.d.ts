import { BaseLanguageClient, MessageTransports, LanguageClientOptions } from 'vscode-languageclient/lib/common/client.js';
export interface IConnectionProvider {
    get(encoding: string): Promise<MessageTransports>;
}
export declare class MonacoLanguageClient extends BaseLanguageClient {
    protected readonly connectionProvider: IConnectionProvider;
    constructor({ id, name, clientOptions, connectionProvider }: MonacoLanguageClient.Options);
    protected createMessageTransports(encoding: string): Promise<MessageTransports>;
    protected getLocale(): string;
    protected registerBuiltinFeatures(): void;
    /**
     * These are all contained in BaseLanguageClient#registerBuiltinFeatures but not registered
     * in MonacoLanguageClient. This method is not called!
     */
    registerNotUsedFeatures(): void;
}
export declare namespace MonacoLanguageClient {
    interface Options {
        name: string;
        id?: string;
        clientOptions: LanguageClientOptions;
        connectionProvider: IConnectionProvider;
    }
}
//# sourceMappingURL=monaco-language-client.d.ts.map