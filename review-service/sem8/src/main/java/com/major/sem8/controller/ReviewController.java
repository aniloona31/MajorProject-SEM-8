package com.major.sem8.controller;

import com.major.sem8.dto.ReviewResponse;
import com.major.sem8.entity.Review;
import com.major.sem8.service.ReviewService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/review")
public class ReviewController{

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add-review")
    public ResponseEntity<String> addReview(@RequestParam("description") String description,
                                            @RequestParam("placeId") Long placeId ,
                                            @RequestParam("ticketId") String ticketId,
                                            @RequestParam("email") String email,
                                            @RequestParam("rating") Integer rating,
                                            @RequestParam(value = "files",required = false) List<MultipartFile> images) throws IOException {
        Review review = new Review();
        review.setDescription(description);
        review.setRating(rating);
        review.setEmail(email);
        review.setPlaceId(placeId);
        review.setTicketId(ticketId);
        return new ResponseEntity<>(reviewService.addReview(images,review), HttpStatus.OK);
    }

    @GetMapping("/top-reviews/{placeId}")
    @CircuitBreaker(name = "ReviewService", fallbackMethod = "getDefaultReview")
    public ResponseEntity<List<ReviewResponse>> getTopReviews(@PathVariable Long placeId
            , @RequestParam(value = "pageSize",defaultValue = "3") Integer pageSize
            , @RequestParam(value = "pageNumber",defaultValue = "0") Integer pageNumber){
        return new ResponseEntity<>(reviewService.getReviews(placeId,pageNumber,pageSize),HttpStatus.OK);
    }

    public ResponseEntity<List<ReviewResponse>> getDefaultReview(Exception e){
        return new ResponseEntity<>(Stream.of(new ReviewResponse()).collect(Collectors.toList()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/update-review")
    public ResponseEntity<String> updateReview(@RequestParam("description") String description,
                                               @RequestParam("ticketId") String ticketId,
                                               @RequestParam("rating") Integer rating){
        Review review = new Review();
        review.setDescription(description);
        review.setRating(rating);
        review.setTicketId(ticketId);
        return new ResponseEntity<>(reviewService.updateReview(review),HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<ReviewResponse> getReview(@RequestParam("ticketId") String ticketId){
        return new ResponseEntity<>(reviewService.getReview(ticketId),HttpStatus.OK);
    }

    @GetMapping("/get/rating/{placeId}")
    public ResponseEntity<Double> getRating(@PathVariable(name = "placeId") Long placeId){
        return new ResponseEntity<>(reviewService.getRating(placeId),HttpStatus.OK);
    }

    @GetMapping("/get/images/{placeId}")
    public ResponseEntity<List<String>> getImages(@PathVariable(name = "placeId") Long placeId){
        return new ResponseEntity<>(reviewService.getImages(placeId),HttpStatus.OK);
    }
}
