package com.major.sem8.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public enum PaymentStatus {
    PENDING("pending"),SUCCESSFUL("successful"),DECLINED("declined");

    String status;
}
