package com.major.sem8.service;

import com.major.sem8.dto.PlaceResponse;
import com.major.sem8.entity.Place;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.proxy.ReviewProxy;
import com.major.sem8.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private ReviewProxy reviewProxy;

    public List<PlaceResponse> getAllPlacesByCity(String city, Integer size, Integer number){
        try {
            Pageable pageable = PageRequest.of(number, size);
            Page<Place> placePage = placeRepository.findAll(pageable);
            List<Place> content = placePage.getContent();
            return content.stream()
                    .map((place) -> mapToDto(place,reviewProxy.getTopReviews(place.getId()).getBody()))
                    .collect(Collectors.toList());
        }catch (Exception e){
            throw new RuntimeException("error occured while getting the place page");
        }
    }

    public PlaceResponse getPlaceById(Long id){
        try {
            Place place = placeRepository.findById(id).orElseThrow(() -> new RuntimeException("place with id doesn't exist"));
            ResponseEntity<List<Object>> reviews = reviewProxy.getTopReviews(place.getId());
            System.out.println(reviews);
            return mapToDto(place,reviews.getBody());
        }catch (Exception e){
            throw new ApplicationException("something went wrong while getting the reviews", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    protected PlaceResponse mapToDto(Place place,List<Object> reviews){
        return PlaceResponse.builder()
                .placeName(place.getPlaceName())
                .address(place.getAddress())
                .mainImage(place.getMainImage())
                .city(place.getCity())
                .discription(place.getDiscription())
                .reviews(reviews)
                .build();
    }
}
