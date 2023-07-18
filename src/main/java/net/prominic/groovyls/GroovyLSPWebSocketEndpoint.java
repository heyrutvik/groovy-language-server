package net.prominic.groovyls;

import org.eclipse.lsp4j.jsonrpc.Launcher;
import org.eclipse.lsp4j.services.LanguageClient;
import org.eclipse.lsp4j.services.LanguageClientAware;
import org.eclipse.lsp4j.websocket.jakarta.WebSocketEndpoint;

import java.util.Collection;

public class GroovyLSPWebSocketEndpoint extends WebSocketEndpoint<LanguageClient> {
    @Override
    protected void configure(Launcher.Builder<LanguageClient> builder) {
        builder.setLocalService(new GroovyLanguageServer());
        builder.setRemoteInterface(LanguageClient.class);
    }

    @Override
    protected void connect(Collection<Object> localServices, LanguageClient remoteProxy) {
        localServices.stream()
                .filter(LanguageClientAware.class::isInstance)
                .forEach(languageClientAware -> ((LanguageClientAware) languageClientAware).connect(remoteProxy));
    }
}

