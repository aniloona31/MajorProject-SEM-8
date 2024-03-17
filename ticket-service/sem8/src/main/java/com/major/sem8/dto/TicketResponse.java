package com.major.sem8.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TicketResponse {

    private String ticketId;

    private Double price;

    private Integer quantity;

    private List<Date> bookedDates;

    private String placeName;

    private boolean confirmation;

    private boolean isValid;

    private byte[] ticketQr;
}
