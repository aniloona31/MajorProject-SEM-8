package com.major.sem8.controller;

import com.major.sem8.entity.Review;
import com.major.sem8.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController{

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add-review")
    public ResponseEntity<String> addReview(@RequestBody Review review, @RequestParam("image") MultipartFile images) throws IOException {
        return new ResponseEntity<>(reviewService.addReview(images,review), HttpStatus.OK);
    }

    @GetMapping("/top-reviews/{placeId}")
    public ResponseEntity<List<Review>> getTopReviews(@PathVariable Long placeId
            ,@RequestParam(value = "pageSize",defaultValue = "3") Integer pageSize
            ,@RequestParam(value = "pageNumber",defaultValue = "0") Integer pageNumber){
        return new ResponseEntity<>(reviewService.getReviews(placeId,pageNumber,pageSize),HttpStatus.OK);
    }
}
