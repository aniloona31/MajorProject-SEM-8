package com.major.sem8.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "review-service",url = "http://localhost:9095")
public interface ReviewProxy {

    @GetMapping("/review/top-reviews/{id}")
    public ResponseEntity<List<Object>> getTopReviews(@PathVariable Long id);

}
