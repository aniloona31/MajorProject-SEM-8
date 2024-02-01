package com.major.sem8.service;

import com.major.sem8.dto.QuestionDto;
import com.major.sem8.entity.Question;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;


    public List<QuestionDto> getAllQuestions() {
        try{
            List<Question> questions = questionRepository.findAll();
            return questions.stream().map(this::mapToQuestionDto).collect(Collectors.toList());
        }catch (Exception e){
            throw  new ApplicationException("ERROR WHILE FETCHING QUESTIONS", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private QuestionDto mapToQuestionDto(Question question){
        return QuestionDto.builder()
                .questionId(question.getId())
                .askedDate(question.getAskedDate())
                .question(question.getQuestion())
                .email(question.getEmail())
                .build();
    }

    public QuestionDto postQuestion(QuestionDto questionDto) {

        try{
            Question question = new Question();
            question.setQuestion(questionDto.getQuestion());
            question.setAnswers(new ArrayList<>());
            question.setEmail(questionDto.getEmail());
            question.setAskedDate(new Date());

            Question savedQuestion = questionRepository.save(question);
            return mapToQuestionDto(savedQuestion);
        }catch (Exception e){
            throw new ApplicationException("ERROR WHILE SAVING THE QUESTION",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
