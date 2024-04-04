package com.major.sem8.repository;

import com.major.sem8.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    Optional<Review> findByTicketId(String ticketId);

    boolean existsByTicketId(String ticketId);

    @Query("select AVG(rating) from Review where placeId = :placeId")
    Double findRatingByPlaceId(@Param("placeId") Long placeId);

    Page<Review> findByPlaceId(Long placeId, Pageable pageable);
}
