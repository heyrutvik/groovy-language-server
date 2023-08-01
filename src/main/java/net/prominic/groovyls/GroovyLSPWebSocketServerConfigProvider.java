package net.prominic.groovyls;

import jakarta.websocket.Endpoint;
import jakarta.websocket.server.ServerApplicationConfig;
import jakarta.websocket.server.ServerEndpointConfig;
import java.util.Collections;
import java.util.Set;

public class GroovyLSPWebSocketServerConfigProvider implements ServerApplicationConfig {

    private static final String WEBSOCKET_CAMEL_SERVER_PATH = "/ws/groovy-lsp";

    @Override
    public Set<ServerEndpointConfig> getEndpointConfigs(Set<Class<? extends Endpoint>> endpointClasses) {
        ServerEndpointConfig conf = ServerEndpointConfig.Builder.create(GroovyLSPWebSocketEndpoint.class, WEBSOCKET_CAMEL_SERVER_PATH).build();
        return Collections.singleton(conf);
    }

    @Override
    public Set<Class<?>> getAnnotatedEndpointClasses(Set<Class<?>> scanned) {
        return scanned;
    }

}