package com.major.sem8.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.CacheRequest;

@FeignClient("place-service")
public interface NewPlaceProxy {

    @GetMapping("/place/price")
    public ResponseEntity<Double> getPrice(@RequestParam("placeId") Long placeId);

    @GetMapping("/place/image")
    public ResponseEntity<String> getImage(@RequestParam("placeId") Long placeId);

    @GetMapping("/event/price/{id}")
    public ResponseEntity<Double> getEventPrice(@PathVariable Long id);

    @GetMapping("/event/image/{eventId}")
    public ResponseEntity<String> getEventImage(@PathVariable Long eventId);
}
