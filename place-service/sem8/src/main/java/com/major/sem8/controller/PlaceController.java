package com.major.sem8.controller;

import com.major.sem8.dto.PlaceResponse;
import com.major.sem8.entity.Place;
import com.major.sem8.service.PlaceService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/place")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping("/all/{category}/{city}")
    @CircuitBreaker(name = "PlaceService", fallbackMethod = "getDefaultPlaces")
    @Retry(name = "PlaceService")
    public ResponseEntity<List<PlaceResponse>> getAllPlacesByCity(@PathVariable(name = "city") String city,
                                                          @PathVariable(name = "category") String category,
                                                          @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize,
                                                          @RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber){
        return new ResponseEntity<>(placeService.getAllPlacesByCity(city,category,pageSize,pageNumber), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PlaceResponse> getPlaceById(@PathVariable Long id){
        return new ResponseEntity<>(placeService.getPlaceById(id),HttpStatus.OK);
    }

    @GetMapping("/price")
    public ResponseEntity<Double> getPrice(@RequestParam("placeId") Long placeId){
        return new ResponseEntity<>(placeService.getPrice(placeId),HttpStatus.OK);
    }

    @GetMapping("/image")
    public ResponseEntity<String> getImage(@RequestParam("placeId") Long placeId){
        return new ResponseEntity<>(placeService.getImageByPlaceId(placeId), HttpStatus.OK);
    }

}
