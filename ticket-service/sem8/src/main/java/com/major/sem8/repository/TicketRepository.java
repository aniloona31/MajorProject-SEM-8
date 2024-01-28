package com.major.sem8.repository;

import com.major.sem8.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {
    List<Ticket> findAllByEmail(String email);

    Optional<Ticket> findByTicketId(String ticketId);
}
