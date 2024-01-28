package com.major.sem8.service;

import com.cloudinary.Cloudinary;
import com.major.sem8.dto.ReviewResponse;
import com.major.sem8.entity.Review;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ReviewRepository reviewRepository;

    private List<String> uploadImageToCloudinary(List<MultipartFile> images) throws IOException {
        try {
            List<String> data = new ArrayList<>();
            for(MultipartFile image : images){
                data.add(cloudinary.uploader().upload(image.getBytes(),Map.of()).get("url").toString());
            }
            System.out.println(data);
            return data;
        }catch (Exception e){
            throw new ApplicationException("couldn't upload image to cloud", HttpStatus.BAD_REQUEST);
        }
    }

    public String addReview(List<MultipartFile> images, Review review) throws IOException {

        List<String> data = uploadImageToCloudinary(images);
//            System.out.println(data.get("url").toString());
        try{
            review.setImages(data);
            reviewRepository.save(review);
            return "review uploaded succesfully";
        }catch (Exception e){
            throw new ApplicationException("couldn't save review to db",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<ReviewResponse> getReviews(Long placeId, int pageNumber, int pageSize) {
        try {
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<Review> page = reviewRepository.findAll(pageable);
            List<Review> content = page.getContent();
            return content.stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());

        }catch (Exception e){
            throw new ApplicationException("couldn't fetch reviews from db" , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public String updateReview(Review updatedReview){
        Review existingReview = reviewRepository.findByTicketId(updatedReview.getTicketId())
                .orElseThrow(() -> new ApplicationException("invalid ticket id",HttpStatus.BAD_REQUEST));
        existingReview.setDescription(updatedReview.getDescription());
        existingReview.setRating(updatedReview.getRating());
        try {
            reviewRepository.save(existingReview);
        }catch (Exception e){
            throw new ApplicationException("error while updating review in db",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return "review updated";
    }

    public ReviewResponse getReview(String ticketId){
        Review review = reviewRepository.findByTicketId(ticketId)
                    .orElseThrow(() -> new ApplicationException("invalid ticket id",HttpStatus.BAD_REQUEST));
        return mapToDto(review);

    }

    protected ReviewResponse mapToDto(Review review){
        return ReviewResponse.builder()
                .description(review.getDescription())
                .username(review.getUsername())
                .images(review.getImages())
                .build();
    }
}
