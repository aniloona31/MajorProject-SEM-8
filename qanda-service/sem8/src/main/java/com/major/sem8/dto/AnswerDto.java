package com.major.sem8.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AnswerDto {

    private String answer;
    private String email;
    private Date date;
    private Long questionId;

}
