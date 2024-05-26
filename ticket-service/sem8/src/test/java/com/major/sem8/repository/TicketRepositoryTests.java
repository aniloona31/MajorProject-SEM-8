package com.major.sem8.repository;

import com.major.sem8.entity.Ticket;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;
import java.util.stream.Collectors;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class TicketRepositoryTests {

    @Autowired
    private TicketRepository ticketRepository;

    @Test
    public void TicketRepository_FindAllByEmail(){
        List<Date> dates = new ArrayList<>();
        dates.add(new Date());

        Ticket ticket1 = Ticket.builder()
                .email("anirudh@gmail.com")
                .ticketId("1223241")
                .id(1L)
                .price(20.0)
                .isValid(true)
                .eventId(null)
                .bookedDates(dates)
                .confirmation(true)
                .placeId(1L)
                .placeName("red fort")
                .quantity(2).build();

        ticketRepository.save(ticket1);

        Ticket ticket2 = Ticket.builder()
                .email("anirudh@gmail.com")
                .ticketId("1223242")
                .id(2L)
                .price(20.0)
                .isValid(true)
                .eventId(null)
                .bookedDates(dates)
                .confirmation(true)
                .placeId(1L)
                .placeName("red fort")
                .quantity(2).build();

        ticketRepository.save(ticket2);

        List<Ticket> tickets = ticketRepository.findAllByEmail("anirudh@gmail.com");

        Assertions.assertThat(tickets).isNotNull();
        Assertions.assertThat(tickets.size()).isEqualTo(2);
    }

    @Test
    public void TicketRepository_FindByTicketId(){
        List<Date> dates = new ArrayList<>();
        dates.add(new Date());

        Ticket ticket1 = Ticket.builder()
                .email("anirudh@gmail.com")
                .ticketId("1223241")
                .id(1L)
                .price(20.0)
                .isValid(true)
                .eventId(null)
                .bookedDates(dates)
                .confirmation(true)
                .placeId(1L)
                .placeName("red fort")
                .quantity(2).build();

        ticketRepository.save(ticket1);

        Ticket ticket = ticketRepository.findByTicketId("1223241").get();

        Assertions.assertThat(ticket).isNotNull();
    }

    @Test
    public void TicketRepository_FindAllByEmailOrderById(){
        List<Date> dates = new ArrayList<>();
        dates.add(new Date());

        Ticket ticket1 = Ticket.builder()
                .email("anirudh@gmail.com")
                .ticketId("1223241")
                .id(1L)
                .price(20.0)
                .isValid(true)
                .eventId(null)
                .bookedDates(dates)
                .confirmation(true)
                .placeId(1L)
                .placeName("red fort")
                .quantity(2).build();

        ticketRepository.save(ticket1);

        Ticket ticket2 = Ticket.builder()
                .email("anirudh@gmail.com")
                .ticketId("1223242")
                .id(2L)
                .price(20.0)
                .isValid(true)
                .eventId(null)
                .bookedDates(dates)
                .confirmation(true)
                .placeId(1L)
                .placeName("red fort")
                .quantity(2).build();

        ticketRepository.save(ticket2);

        List<Ticket> tickets = ticketRepository.findAllByEmailOrderById("anirudh@gmail.com");
        List<Long> ticketIds = new ArrayList<>();

        for(Ticket ticket : tickets){
            ticketIds.add(ticket.getId());
        }
        List<Long> originalIds = ticketIds.stream().collect(Collectors.toList());
        Collections.sort(ticketIds);

        Assertions.assertThat(tickets).isNotNull();
        Assertions.assertThat(ticketIds).isEqualTo(originalIds);
    }

    @Test
    public void TicketRepository_FindAllByEmailOrderByIdDesc(){
        List<Date> dates = new ArrayList<>();
        dates.add(new Date());

        Ticket ticket1 = Ticket.builder()
                .email("anirudh@gmail.com")
                .ticketId("1223241")
                .id(1L)
                .price(20.0)
                .isValid(true)
                .eventId(null)
                .bookedDates(dates)
                .confirmation(true)
                .placeId(1L)
                .placeName("red fort")
                .quantity(2).build();

        ticketRepository.save(ticket1);

        Ticket ticket2 = Ticket.builder()
                .email("anirudh@gmail.com")
                .ticketId("1223242")
                .id(2L)
                .price(20.0)
                .isValid(true)
                .eventId(null)
                .bookedDates(dates)
                .confirmation(true)
                .placeId(1L)
                .placeName("red fort")
                .quantity(2).build();

        ticketRepository.save(ticket2);

        List<Ticket> tickets = ticketRepository.findAllByEmailOrderByIdDesc("anirudh@gmail.com");
        List<Long> ticketIds = new ArrayList<>();

        for(Ticket ticket : tickets){
            ticketIds.add(ticket.getId());
        }
        List<Long> originalIds = ticketIds.stream().collect(Collectors.toList());
        Collections.sort(ticketIds,Collections.reverseOrder());

        Assertions.assertThat(tickets).isNotNull();
        Assertions.assertThat(ticketIds).isEqualTo(originalIds);
    }
}
