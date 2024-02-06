package com.major.sem8.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.security.web.util.matcher.IpAddressMatcher;

@Configuration
public class SecurityConfig {

    @Value("${spring.application.name}")
    private String applicationName;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/place/**",
                                "/place-service/v3/api-docs/**",
                                "/place-service/swagger-ui/**",
                                "/actuator/**")
//                        .access(hasIpAddress("127.0.0.1"))
//                        .anyRequest()
                        .permitAll()).build();
//                        .authenticated()).build();
    }

    private AuthorizationManager<RequestAuthorizationContext> hasIpAddress(String ipAddress) {
        IpAddressMatcher ipAddressMatcher1 = new IpAddressMatcher(ipAddress);
//        IpAddressMatcher ipAddressMatcher2 = new IpAddressMatcher(applicationName);
        return (authentication, context) -> {
            HttpServletRequest request = context.getRequest();
//            return new AuthorizationDecision(ipAddressMatcher1.matches(request) || ipAddressMatcher2.matches(request));
            return new AuthorizationDecision(ipAddressMatcher1.matches(request));
        };
    }
}