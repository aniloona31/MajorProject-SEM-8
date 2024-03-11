package com.major.sem8.config;


import com.major.sem8.filter.AuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

@Configuration
public class ApiGatewayConfig {

    @Autowired
    private AuthenticationFilter authenticationFilter;
    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r->r.path("/payment/orderId/**").and().method(HttpMethod.GET).uri("lb://payment-service"))
                .route(r -> r.path("/auth/**").filters(f -> f.filter(authenticationFilter.apply(new AuthenticationFilter.Config()))).uri("lb://auth-service"))
                .route(r -> r.path("/place/**").filters(f -> f.filter(authenticationFilter.apply(new AuthenticationFilter.Config()))).uri("lb://place-service"))
                .route(r -> r.path("/review/**").filters(f -> f.filter(authenticationFilter.apply(new AuthenticationFilter.Config()))).uri("lb://review-service"))
                .route(r -> r.path("/ticket/**").filters(f -> f.filter(authenticationFilter.apply(new AuthenticationFilter.Config()))).uri("lb://ticket-service"))
                .route(r -> r.path("/payment/**").filters(f -> f.filter(authenticationFilter.apply(new AuthenticationFilter.Config()))).uri("lb://payment-service"))
                .route(r -> r.path("/answer/**").filters(f -> f.filter(authenticationFilter.apply(new AuthenticationFilter.Config()))).uri("lb://qanda-service"))
                .route(r -> r.path("/question/**").filters(f -> f.filter(authenticationFilter.apply(new AuthenticationFilter.Config()))).uri("lb://qanda-service"))
                .route(r -> r.path("/qanda-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://qanda-service"))
                .route(r -> r.path("/auth-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://auth-service"))
                .route(r -> r.path("/payment-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://payment-service"))
                .route(r -> r.path("/review-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://review-service"))
                .route(r -> r.path("/ticket-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://ticket-service"))
                .route(r -> r.path("/place-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://place-service"))
                .build();
    }
}
