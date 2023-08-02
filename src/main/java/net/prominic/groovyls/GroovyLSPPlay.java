package net.prominic.groovyls;

import akka.actor.ActorRef;
import net.prominic.groovyls.config.CompilationUnitFactory;
import org.eclipse.lsp4j.jsonrpc.Launcher;
import org.eclipse.lsp4j.services.LanguageClient;
import org.eclipse.lsp4j.services.LanguageClientAware;
import org.eclipse.lsp4j.websocket.play.WebSocketActor;

import java.util.Collection;
import java.util.Collections;

public class GroovyLSPPlay extends WebSocketActor<LanguageClient> {
    public GroovyLSPPlay(ActorRef out) {
        super(out);
    }

    @Override
    protected void configure(Launcher.Builder<LanguageClient> builder) {
        CompilationUnitFactory compilationUnit = new CompilationUnitFactory();
        compilationUnit.setAdditionalClasspathList(
                Collections.singletonList("src/main/resources/groovy-4.0.2.jar")
        );
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
