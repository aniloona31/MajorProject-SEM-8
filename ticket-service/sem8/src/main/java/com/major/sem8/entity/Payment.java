package com.major.sem8.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

    private Long id;

    private String ticketId;

    private String paymentStatus;

    private String razorpayOrderId;

}
