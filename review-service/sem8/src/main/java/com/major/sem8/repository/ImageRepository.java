package com.major.sem8.repository;

import com.major.sem8.entity.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.net.CacheRequest;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Images,Long> {
    Optional<Images> findByPlaceId(Long aLong);

    Images getByPlaceId(Long placeId);
}
