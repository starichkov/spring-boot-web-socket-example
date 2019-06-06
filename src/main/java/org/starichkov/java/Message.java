package org.starichkov.java;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

/**
 * @author Vadim Starichkov
 * @since 06.06.2019 18:00
 */
@Getter
@Setter
@NoArgsConstructor
public class Message {

    private String id = UUID.randomUUID().toString();
    private String text;
    private LocalDate date = LocalDate.now();

    public Message(String text) {
        this.text = text;
    }
}
