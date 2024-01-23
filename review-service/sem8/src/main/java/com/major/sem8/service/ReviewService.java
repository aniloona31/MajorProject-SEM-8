package com.major.sem8.service;

import com.cloudinary.Cloudinary;
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
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ReviewRepository reviewRepository;

    private Map uploadImageToCloudinary(MultipartFile images) throws IOException {
        try {
            Map data = cloudinary.uploader().upload(images.getBytes(), Map.of());
            return data;
        }catch (Exception e){
            throw new ApplicationException("couldn't upload image to cloud", HttpStatus.BAD_REQUEST);
        }
    }

    public String addReview(MultipartFile images, Review review) throws IOException {
        try{
            Map data = uploadImageToCloudinary(images);
            review.setImages(List.of(data.get("url")));
            reviewRepository.save(review);
            return "review uploaded succesfully";
        }catch (Exception e){
            throw new ApplicationException("couldn't save review to db",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<Review> getReviews(Long placeId,int pageNumber,int pageSize) {
        try {
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<Review> page = reviewRepository.findAll(pageable);
            List<Review> content = page.getContent();
            return content;
        }catch (Exception e){
            throw new ApplicationException("couldn't fetch reviews from db" , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
