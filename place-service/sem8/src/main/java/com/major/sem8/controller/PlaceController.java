package com.major.sem8.controller;

import com.major.sem8.entity.Place;
import com.major.sem8.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/place")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping("/all/{city}")
    public ResponseEntity<List<Place>> getAllPlacesByCity(@PathVariable String city,
                                                          @RequestParam(value = "pageSize",defaultValue = "10",required = false) Integer pageSize,
                                                          @RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber){
        return new ResponseEntity<>(placeService.getAllPlacesByCity(city,pageSize,pageNumber), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable Long id){
        return new ResponseEntity<>(placeService.getPlaceById(id),HttpStatus.OK);
    }
}
