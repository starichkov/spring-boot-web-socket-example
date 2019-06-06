package org.starichkov.java;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

/**
 * @author Vadim Starichkov
 * @since 06.06.2019 11:32
 */
@Component
@Slf4j
public class WebSocketEventListener {

    @EventListener
    public void handleConnected(SessionConnectedEvent event) {
        log.info("Received connected event: {}", event);
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        log.info("Received disconnect event: {}", event);
    }

    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {
        log.info("Received subscribe event: {}", event);
    }

    @EventListener
    public void handleUnsubscribe(SessionUnsubscribeEvent event) {
        log.info("Received unsubscribe event: {}", event);
    }
}
