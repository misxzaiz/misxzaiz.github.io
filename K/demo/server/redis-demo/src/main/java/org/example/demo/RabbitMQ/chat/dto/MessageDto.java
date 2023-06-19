package org.example.demo.RabbitMQ.chat.dto;

import lombok.Data;

@Data
public class MessageDto {
    private Long sendUserId;
    private Long receiveUserId;
    private String message;
}
