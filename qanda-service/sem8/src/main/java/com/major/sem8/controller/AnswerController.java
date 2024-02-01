package com.major.sem8.controller;

import com.major.sem8.dto.AnswerDto;
import com.major.sem8.entity.Answer;
import com.major.sem8.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answer")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @GetMapping("/get")
    public ResponseEntity<List<AnswerDto>> getAllAnswers(@RequestParam("questionId") Long questionId){
        return new ResponseEntity<>(answerService.getAllAnswers(questionId), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<AnswerDto> postAnswer(@RequestBody AnswerDto answerDto){
        return new ResponseEntity<>(answerService.postAnswer(answerDto),HttpStatus.OK);
    }

}
