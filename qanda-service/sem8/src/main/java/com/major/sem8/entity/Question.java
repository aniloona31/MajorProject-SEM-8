package com.major.sem8.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String email;

    private Date askedDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question",cascade = CascadeType.ALL)
    private List<Answer> answers;
}
