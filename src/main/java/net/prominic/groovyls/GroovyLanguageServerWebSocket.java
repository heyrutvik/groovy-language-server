package net.prominic.groovyls;

import akka.actor.ActorRef;
import net.prominic.groovyls.config.CompilationUnitFactory;
import org.apache.commons.io.FileUtils;
import org.eclipse.lsp4j.jsonrpc.Launcher;
import org.eclipse.lsp4j.services.LanguageClient;
import org.eclipse.lsp4j.services.LanguageClientAware;
import org.eclipse.lsp4j.websocket.play.WebSocketActor;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

public class GroovyLanguageServerWebSocket extends WebSocketActor<LanguageClient> {
    public GroovyLanguageServerWebSocket(ActorRef out) {
        super(out);
    }

    @Override
    protected void configure(Launcher.Builder<LanguageClient> builder) {
        try {
            // FIXME: quick and dirty way to get the groovy jar in path so that we can get
            // groovy classes and method suggestions
            File jarFile = File.createTempFile("groovy", ".jar");
            InputStream jarStream = Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream("groovy-2.5.15.jar"));
            FileUtils.copyInputStreamToFile(jarStream, jarFile);
            CompilationUnitFactory compilationUnit = new CompilationUnitFactory();
            compilationUnit.setAdditionalClasspathList(Collections.singletonList(jarFile.getAbsolutePath()));
            builder.setLocalService(new GroovyLanguageServer(compilationUnit));
            builder.setRemoteInterface(LanguageClient.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void connect(Collection<Object> localServices, LanguageClient remoteProxy) {
        localServices.stream()
                .filter(LanguageClientAware.class::isInstance)
                .forEach(languageClientAware -> ((LanguageClientAware) languageClientAware).connect(remoteProxy));
    }
}
