package org.starichkov.java;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Vadim Starichkov
 * @since 06.06.2019 11:06
 */
@RestController
@RequestMapping(path = "/messages")
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @Autowired
    public MessageController(SimpMessageSendingOperations simpMessageSendingOperations) {
        this.simpMessageSendingOperations = simpMessageSendingOperations;
    }

    @GetMapping(value = "/new", produces = MediaType.TEXT_PLAIN_VALUE)
    public void sendNewMessageReceivedEvent(@RequestParam String message) {
        simpMessageSendingOperations.convertAndSend("/topics/new", message);
    }

    @GetMapping(value = "/error", produces = MediaType.TEXT_PLAIN_VALUE)
    public void sendErrorEvent() {
        simpMessageSendingOperations.convertAndSend("/topics/error", "Some error happened!");
    }
}
