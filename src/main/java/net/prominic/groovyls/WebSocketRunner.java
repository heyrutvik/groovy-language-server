/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
