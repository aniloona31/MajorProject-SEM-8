package com.major.sem8.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Ticket {

    private Long id;

    private String email;

    private String ticketId;

    private Double price;

    private Integer quantity;

    private List<Date> bookedDates;

    private Long placeId;

    private String placeName;

    private boolean confirmation;

    private boolean isValid;

    private Long eventId;
}
