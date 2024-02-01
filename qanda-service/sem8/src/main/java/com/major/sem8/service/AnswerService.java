package com.major.sem8.service;

import com.major.sem8.dto.AnswerDto;
import com.major.sem8.entity.Answer;
import com.major.sem8.entity.Question;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.repository.AnswerRepository;
import com.major.sem8.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnswerService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public List<AnswerDto> getAllAnswers(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(
                () -> new ApplicationException("QUESTION DOESN'T EXIST", HttpStatus.BAD_REQUEST));

        try{
            List<Answer> answers = question.getAnswers();
            return answers.stream()
                    .map(this::mapToAnswerDto)
                    .collect(Collectors.toList());

        }catch (Exception e){
            throw new ApplicationException("ERROR WHILE FETCHING ANSWERS",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public AnswerDto mapToAnswerDto(Answer answer) {
        return AnswerDto.builder()
                .date(answer.getDate())
                .email(answer.getEmail())
                .answer(answer.getAnswer())
                .questionId(answer.getQuestion().getId())
                .build();
    }

    public AnswerDto postAnswer(AnswerDto answerDto){

        Question question = questionRepository.findById(answerDto.getQuestionId())
                .orElseThrow(()-> new ApplicationException("questions doesn't exist",HttpStatus.BAD_REQUEST));
        try {
            Answer answer = new Answer();
            answer.setAnswer(answerDto.getAnswer());
            answer.setDate(new Date());
            answer.setEmail(answerDto.getEmail());
            answer.setQuestion(question);

            Answer savedAnswer = answerRepository.save(answer);
            List<Answer> answers = question.getAnswers();
            answers.add(savedAnswer);
            question.setAnswers(answers);
            questionRepository.save(question);
            return mapToAnswerDto(savedAnswer);
        }catch (Exception e){
            throw new ApplicationException("ERROR WHILE SAVING THE ANSWER",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
