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

    public List<PlaceResponse> getAllPlacesByCity(String city, String category,Integer size, Integer number){
        try {
            Pageable pageable = PageRequest.of(number, size);
            Page<Place> placePage = null;
            if(category.equals("places")){
                placePage = placeRepository.findByCity(city,pageable);
            }else {
                placePage = placeRepository.findByCityAndCategory(city, category, pageable);
            }
            List<Place> content = placePage.getContent();
            return content.stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        }catch (Exception e){
            throw new RuntimeException("error occured while getting the place page");
        }
    }

    public PlaceResponse getPlaceById(Long id){
        Place place = placeRepository.findById(id).orElseThrow(() -> new RuntimeException("place with id doesn't exist"));
        ResponseEntity<List<Object>> reviews = null;
        try {
            reviews = reviewProxy.getTopReviews(place.getId());
//            return mapToDtoWithReviews(place,reviews.getBody());
        }catch (Exception e){
            throw new ApplicationException("something went wrong while getting the reviews", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        ResponseEntity<Double> rating = null;
        try{
            rating = reviewProxy.getRating(place.getId());
        }catch (Exception e){
            throw new ApplicationException("error while getting rating",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        ResponseEntity<List<String>> images = null;
        try{
            images = reviewProxy.getImages(place.getId());
        }catch (Exception e){
            throw new ApplicationException("error while getting images", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return mapToDtoWithReviews(place,reviews.getBody(),rating.getBody(),images.getBody());
    }

    protected PlaceResponse mapToDto(Place place){
        Double rating = null;
        try{
            rating = reviewProxy.getRating(place.getId()).getBody();
        }catch (Exception e){
            throw new ApplicationException("error while getting rating",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PlaceResponse.builder()
                .id(place.getId())
                .placeName(place.getPlaceName())
                .address(place.getAddress())
                .mainImage(place.getMainImage())
                .city(place.getCity())
                .discription(place.getDiscription())
                .rating(rating)
                .category(place.getCategory())
                .build();
    }

    protected PlaceResponse mapToDtoWithReviews(Place place,List<Object> reviews,Double rating,List<String> images){
        return PlaceResponse.builder()
                .id(place.getId())
                .placeName(place.getPlaceName())
                .address(place.getAddress())
                .mainImage(place.getMainImage())
                .city(place.getCity())
                .discription(place.getDiscription())
                .reviews(reviews)
                .rating(rating)
                .price(place.getTicketPrice())
                .category(place.getCategory())
                .images(images)
                .build();
    }
    public Double getPrice(Long placeId) {
        Place place = placeRepository.findById(placeId).orElseThrow(() ->  new ApplicationException("INVALID PLACE",HttpStatus.BAD_REQUEST));
        return Double.valueOf(place.getTicketPrice());
    }

    public String getImageByPlaceId(Long placeId) {
        Place place = placeRepository.findById(placeId).orElseThrow(() ->  new ApplicationException("INVALID PLACE",HttpStatus.BAD_REQUEST));
        return place.getMainImage();
    }

    public List<PlaceResponse> searchPlaces(String placeName) {
        try{
            List<Place> list = placeRepository.findByPlaceNameContaining(placeName);
            if(list.isEmpty()){
                return null;
            }
            return list.stream().map(this::mapToDto).collect(Collectors.toList());
        }catch (Exception e){
            throw new ApplicationException("error while getting places", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<PlaceResponse> getAllPlacesByFilter(Integer min, Integer max, List<String> categories,String city) {
        try{
            List<Place> places = placeRepository.findAllByFilter(min,max,categories,city);
            if(places.isEmpty())return null;

            return places.stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        }catch (Exception e){
            throw new ApplicationException("couldn't apply filter",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
