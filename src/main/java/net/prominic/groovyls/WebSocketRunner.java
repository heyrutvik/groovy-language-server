package net.prominic.groovyls;

import jakarta.websocket.DeploymentException;

import org.glassfish.tyrus.server.Server;

public class WebSocketRunner {
    private static final String DEFAULT_HOSTNAME = "localhost";
    private static final int DEFAULT_PORT = 8080;
    private static final String DEFAULT_CONTEXT_PATH = "/";

    private boolean isStarted = false;
    private boolean isStopped = false;

    public void runWebSocketServer(String hostname, int port, String contextPath) {
        hostname = hostname != null ? hostname : DEFAULT_HOSTNAME;
        port = port != -1 ? port : DEFAULT_PORT;
        contextPath = contextPath != null ? contextPath : DEFAULT_CONTEXT_PATH;
        Server server = new Server(hostname, port, contextPath, null, GroovyLSPWebSocketServerConfigProvider.class);
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            server.stop();
            isStopped = true;
        }, "groovy-lsp-websocket-server-shutdown-hook"));

        try {
            server.start();
            isStarted = true;
            Thread.currentThread().join();
        } catch (InterruptedException e) {
            System.out.println("Groovy LSP Websocket server has been interrupted: " + e.getMessage());
            Thread.currentThread().interrupt();
        } catch (DeploymentException e) {
            System.out.println("Cannot start Groovy LSP Websocket server: " + e.getMessage());
        } finally {
            server.stop();
            isStopped = true;
        }
    }

    public boolean isStarted() {
        return isStarted;
    }

    public boolean isStopped() {
        return isStopped;
    }

}