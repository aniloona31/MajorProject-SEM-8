package com.major.sem8.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceResponse {

    private Long id;

    private String placeName;

    private String discription;

    private String mainImage;

    private String address;

    private String city;

    private List<Object> reviews;

    private Double rating;

    private String category;

    private Integer price;

    private List<String> images;
}
