package com.major.sem8.service;

import com.major.sem8.dto.TicketResponse;
import com.major.sem8.entity.Payment;
import com.major.sem8.entity.Ticket;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.proxy.NewPlaceProxy;
import com.major.sem8.repository.TicketRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertThrows;

@RunWith(SpringRunner.class)
@ExtendWith(MockitoExtension.class)
public class TicketServiceTests {

    @Mock
    private NewPlaceProxy placeProxy;

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private KafkaTemplate<String,Ticket> kafkaTemplate;

    @InjectMocks
    @Spy
    private TicketService ticketService;


    @Test
    public void TicketService_GetTicketPrice(){
        //Arrange
        Double price = 10.0;
        Long placeId = 1L;

        //Act
        when(placeProxy.getPrice(Mockito.any(Long.class))).thenReturn(new ResponseEntity<Double>(price, HttpStatusCode.valueOf(200)));
        Double ticketPrice = ticketService.getTicketPrice(placeId);

        //Assert
        Assertions.assertThat(ticketPrice).isNotNull();
        Assertions.assertThat(ticketPrice).isEqualTo(price);

    }

    @Test
    public void TicketService_GetTicketPriceForEvent(){
        //Arrange
        Double price = 10.0;
        Long eventId = 1L;

        //Act
        when(placeProxy.getEventPrice(Mockito.any(Long.class))).thenReturn(new ResponseEntity<Double>(price, HttpStatusCode.valueOf(200)));
        Double ticketPrice = ticketService.getTicketPriceForEvent(eventId);

        //Assert
        Assertions.assertThat(ticketPrice).isNotNull();
        Assertions.assertThat(ticketPrice).isEqualTo(price);

    }

    @Test
    public void TicketService_BuyTicketForPlace(){
        //Arrange
        List<Date> dates = new ArrayList<>();
        dates.add(new Date());
        Ticket details = Ticket.builder()
                .ticketId("1")
                .quantity(1)
                .placeName("xyz")
                .email("anirudh@gmail.com")
                .bookedDates(dates)
                .isValid(true)
                .placeId(1L)
                .confirmation(true)
                .build();
        TicketResponse resp = TicketResponse.builder()
                .placeId(1L)
                .placeName("xyz")
                .ticketId("1")
                .email("anirudh@gmail.com")
                .build();
        Double price = 10.0;
        CompletableFuture<SendResult<String, Ticket>> result = Mockito.mock(CompletableFuture.class);

        //Act
        doReturn(price).when(ticketService).getTicketPrice(details.getPlaceId());
        doReturn(resp).when(ticketService).mapToDto(details);
        when(ticketRepository.save(Mockito.any(Ticket.class))).thenReturn(details);
        when(kafkaTemplate.send(Mockito.any(String.class),Mockito.any(Ticket.class))).thenReturn(result);
        TicketResponse ticket = ticketService.buyTicketForPlace(details);

        //Assert
        Assertions.assertThat(ticket).isNotNull();
        Assertions.assertThat(ticket).isEqualTo(resp);
    }

    @Test
    public void TicketService_BuyTicketForEvent(){
        //Arrange
        List<Date> dates = new ArrayList<>();
        dates.add(new Date());
        Ticket details = Ticket.builder()
                .ticketId("1")
                .quantity(1)
                .placeName("xyz")
                .email("anirudh@gmail.com")
                .bookedDates(dates)
                .isValid(true)
                .eventId(1L)
                .confirmation(true)
                .build();
        TicketResponse resp = TicketResponse.builder()
                .eventId(1L)
                .placeName("xyz")
                .ticketId("1")
                .email("anirudh@gmail.com")
                .build();
        Double price = 10.0;
        CompletableFuture<SendResult<String, Ticket>> result = Mockito.mock(CompletableFuture.class);

        //Act
        doReturn(price).when(ticketService).getTicketPrice(details.getPlaceId());
        doReturn(resp).when(ticketService).mapToDto(details);
        when(ticketRepository.save(Mockito.any(Ticket.class))).thenReturn(details);
        when(kafkaTemplate.send(Mockito.any(String.class),Mockito.any(Ticket.class))).thenReturn(result);
        TicketResponse ticket = ticketService.buyTicketForPlace(details);

        //Assert
        Assertions.assertThat(ticket).isNotNull();
        Assertions.assertThat(ticket).isEqualTo(resp);
    }

    @Test
    public void TicketService_BuyTicket(){
        //Arrange
        List<Date> dates = new ArrayList<>();
        dates.add(new Date());
        Ticket details = Ticket.builder()
                .ticketId("1")
                .quantity(1)
                .placeName("xyz")
                .email("anirudh@gmail.com")
                .bookedDates(dates)
                .isValid(true)
                .eventId(1L)
                .placeId(1l)
                .confirmation(true)
                .build();
        TicketResponse resp = TicketResponse.builder()
                .eventId(1L)
                .placeName("xyz")
                .ticketId("1")
                .email("anirudh@gmail.com")
                .build();

        //Act
        //case1
        details.setEventId(null);
        details.setPlaceId(null);
        assertThrows(ApplicationException.class, () -> {
            ticketService.buyTicket(details);
        });

        //case2
        details.setEventId(1L);
        details.setPlaceId(1L);
        assertThrows(ApplicationException.class, () -> {
            ticketService.buyTicket(details);
        });

        //case3
        details.setPlaceId(null);
        doReturn(resp).when(ticketService).buyTicketForEvent(details);
        TicketResponse response1 = ticketService.buyTicket(details);

        //case4
        details.setEventId(null);
        details.setPlaceId(1L);
        doReturn(resp).when(ticketService).buyTicketForPlace(details);
        TicketResponse response2 = ticketService.buyTicket(details);


        //Assert
        Assertions.assertThat(response1).isNotNull();
        Assertions.assertThat(response1).isEqualTo(resp);

        Assertions.assertThat(response2).isNotNull();
        Assertions.assertThat(response2).isEqualTo(resp);
    }

    @Test
    public void TicketService_ProcessPaymentStatus(){
        //Arrange
        Payment payment = new Payment(1L,"1","SUCCESSFUL","xyz",10.0);
        CompletableFuture<SendResult<String, Ticket>> result = Mockito.mock(CompletableFuture.class);
        Ticket details = Ticket.builder()
                .ticketId("1")
                .quantity(1)
                .placeName("xyz")
                .email("anirudh@gmail.com")
//                .bookedDates(dates)
                .isValid(false)
                .eventId(1L)
                .placeId(1l)
                .confirmation(false)
                .build();

        //Act
        when(ticketRepository.findByTicketId(Mockito.any(String.class))).thenReturn(Optional.of(details));
        when(ticketRepository.save(Mockito.any(Ticket.class))).thenReturn(details);
        when(kafkaTemplate.send(Mockito.any(String.class),Mockito.any(Ticket.class))).thenReturn(result);
        ticketService.processPaymentStatus(payment);

        //Assert
        Assertions.assertThat(details.isValid()).isEqualTo(true);
    }

}
