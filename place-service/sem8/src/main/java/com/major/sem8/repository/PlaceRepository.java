package com.major.sem8.repository;

import com.major.sem8.dto.PlaceResponse;
import com.major.sem8.entity.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place,Long> {

    Page<Place> findByCityAndCategory(String city, String category, Pageable pageable);

    Page<Place> findByCity(String city, Pageable pageable);

    List<Place> findByPlaceNameContaining(String placeName);

    @Query("select u from Place as u where ticketPrice >= :min and ticketPrice <= :max and category in :categories and city = :city")
    List<Place> findAllByFilter(Integer min, Integer max,List<String> categories, String city);
}
