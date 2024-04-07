package com.major.sem8.repository;

import com.major.sem8.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    @Query("select e from Event e where e.date >= :date order by e.date")
    List<Event> findAllEvents(Date date);
}
