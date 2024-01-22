package com.major.sem8.service;

import com.major.sem8.entity.Place;
import com.major.sem8.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public List<Place> getAllPlacesByCity(String city, Integer size, Integer number){
        try {
            Pageable pageable = PageRequest.of(number, size);
            Page<Place> placePage = placeRepository.findAll(pageable);
            List<Place> content = placePage.getContent();

            return content;
        }catch (Exception e){
            throw new RuntimeException("error occured whild getting the page");
        }
    }

    public Place getPlaceById(Long id){
        Place place = placeRepository.findById(id).orElseThrow(() -> new RuntimeException("place with id doesn't exist"));

        return place;
    }
}
