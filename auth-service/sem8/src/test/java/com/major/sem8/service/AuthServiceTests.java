package com.major.sem8.service;

import com.major.sem8.config.CustomUserDetailsServiceImpl;
import com.major.sem8.dto.AuthRequest;
import com.major.sem8.entity.User;
import com.major.sem8.repository.UserRepository;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@RunWith(SpringRunner.class)
public class AuthServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private CustomUserDetailsServiceImpl userDetailsService;

    @Mock
    private KafkaTemplate<String,User> kafkaTemplate;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;


    @Test
    public void AuthService_Login(){
        //Arrange
        AuthRequest loginRequest = Mockito.mock(AuthRequest.class);

        User user = User.builder()
                .id(1L)
                .email("anirudh@gmail.com")
                .isEnabled(true)
                .password("12341234")
                .phoneNumber("1237482922")
                .username("ani")
                .build();

        String token = "abcd";


        //Act
        when(userRepository.findByEmail(Mockito.any())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(Mockito.any())).thenReturn(token);
        when(passwordEncoder.encode(Mockito.any(String.class))).thenReturn("28734003");
        String generatedToken = authService.login(loginRequest);

        //Assert
        Assertions.assertThat(generatedToken).isNotNull();
        Assertions.assertThat(generatedToken).isEqualTo(token);
    }

    @Test
    public void AuthService_SaveUser(){
        //Arrange
        CompletableFuture<SendResult<String, User>> result = Mockito.mock(CompletableFuture.class);
        User user = User.builder()
                .id(1L)
                .email("anirudh@gmail.com")
                .isEnabled(false)
                .password("12341234")
                .phoneNumber("1237482922")
                .username("ani")
                .build();

        User user2 = User.builder()
                .id(1L)
                .email("anirudh1@gmail.com")
                .isEnabled(false)
                .password("12341234")
                .phoneNumber("1237482922")
                .username("ani")
                .build();


        //Act
        when(userRepository.findByEmail(Mockito.any())).thenReturn(Optional.of(user));
        when(userRepository.save(Mockito.any())).thenReturn(user);
        when(kafkaTemplate.send(Mockito.any(String.class),Mockito.any(User.class))).thenReturn(result);
        when(userRepository.findByEmail("anirudh1@gmail.com")).thenReturn(null);
        String response1 = authService.saveUser(user);
        String response2 = authService.saveUser(user2);

        //Assert
        Assertions.assertThat(response1).isEqualTo("user added to the system");
        Assertions.assertThat(response2).isEqualTo("user added to the system");
    }

    @Test
    public void AuthService_VerifyEmail(){
        //Arrange
        User user = User.builder()
                .id(1L)
                .email("anirudh@gmail.com")
                .isEnabled(false)
                .password("12341234")
                .phoneNumber("1237482922")
                .username("ani")
                .timestamp(LocalDateTime.now())
                .build();

        //Act
        when(userRepository.findByEmail(Mockito.any(String.class))).thenReturn(Optional.of(user));
        when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        String response = authService.verifyEmail(user.getEmail());

        //Assert
        Assertions.assertThat(response).isEqualTo("User Verified");

    }

}
