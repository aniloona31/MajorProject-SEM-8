package com.major.sem8.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;

    @Column(length = 1000)
    private String discription;

    @Column(name = "main_image",length = 1000)
    private String mainImage;

    private String address;

    @NotNull
    private String city;

    private String ticketPrice;

    private Date date;

}