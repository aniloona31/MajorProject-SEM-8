package com.major.sem8.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("place-service")
public interface NewPlaceProxy {

    @GetMapping("/place/price")
    public ResponseEntity<Double> getPrice(@RequestParam("placeId") Long placeId);
}
