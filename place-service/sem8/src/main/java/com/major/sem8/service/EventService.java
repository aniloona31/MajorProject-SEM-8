package com.major.sem8.service;

import com.major.sem8.entity.Event;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class EventService {

    @Autowired
    public EventRepository eventRepository;

    public List<Event> getAllEvents() {
        try {
            SimpleDateFormat ft = new SimpleDateFormat("dd/MM/yyyy");
            Date date = ft.parse(ft.format(new Date()));
            return eventRepository.findAllEvents(date).stream().toList();
        }catch (Exception e){
            throw new ApplicationException("error while getting events", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Event getEventById(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(()-> new ApplicationException("event doesn't exist",HttpStatus.BAD_REQUEST));
        return event;
    }

    public Double getPrice(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(()->new ApplicationException("event doesn't exist to get price",HttpStatus.BAD_REQUEST));
        return Double.parseDouble(event.getTicketPrice());
    }

    public String getImage(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(()->new ApplicationException("event doesn't exist to get price",HttpStatus.BAD_REQUEST));
        return event.getMainImage();
    }
}
