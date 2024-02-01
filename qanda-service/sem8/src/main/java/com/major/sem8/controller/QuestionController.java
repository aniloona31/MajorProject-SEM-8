package com.major.sem8.controller;

import com.major.sem8.dto.QuestionDto;
import com.major.sem8.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/all")
    public ResponseEntity<List<QuestionDto>> getAllQuestions(){
        return new ResponseEntity<>(questionService.getAllQuestions(), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<QuestionDto> postQuestion(@RequestBody QuestionDto questionDto){
        return new ResponseEntity<>(questionService.postQuestion(questionDto),HttpStatus.OK);
    }
}
