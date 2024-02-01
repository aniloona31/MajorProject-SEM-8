package com.major.sem8.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class QuestionDto {

    private String question;
    private Long questionId;
    private Date askedDate;
    private String email;

}
