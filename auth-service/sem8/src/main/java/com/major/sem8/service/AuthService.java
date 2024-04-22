package com.major.sem8.service;

import com.major.sem8.config.CustomUserDetailsServiceImpl;
import com.major.sem8.dto.AuthRequest;
import com.major.sem8.entity.User;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.apache.juli.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class AuthService {


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsServiceImpl userDetailsService;

    @Autowired
    private KafkaTemplate<String,User> kafkaTemplate;

    private static Logger LOG = LoggerFactory.getLogger(AuthService.class);
    @Transactional
    public User getCurrentUser() throws RuntimeException {
        User user = userRepository.findByEmail(getUsername()).orElseThrow(()-> new RuntimeException("User Not Found!!"));

        return user;
    }

    public String getUsername() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        if (authentication == null)
            return null;
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    public String saveUser(User credential) {
        Optional<User> user = userRepository.findByEmail(credential.getEmail());
        User userToSend = null;
        if(!user.isEmpty() && user.get().isEnabled()){
            throw new ApplicationException("user with email already exists",HttpStatus.INTERNAL_SERVER_ERROR);
        }else if(!user.isEmpty() && !user.get().isEnabled()){
            User currentUser = user.get();
            currentUser.setTimestamp(LocalDateTime.now());
            currentUser.setPassword(passwordEncoder.encode(credential.getPassword()));
            currentUser.setUsername(credential.getUsername());
            userRepository.save(currentUser);
            userToSend = currentUser;
        }else{
            credential.setEnabled(false);
            credential.setTimestamp(LocalDateTime.now());
            credential.setPassword(passwordEncoder.encode(credential.getPassword()));
            userToSend = userRepository.save(credential);
        }

        CompletableFuture<SendResult<String, User>> result = kafkaTemplate
                .send("verification-event", userToSend );
        result.whenComplete((sr, ex) ->
                LOG.debug("Sent(key={},partition={}): {}",
                        sr.getProducerRecord().partition(),
                        sr.getProducerRecord().key(),
                        sr.getProducerRecord().value()));

        return "user added to the system";
    }

    public String login(AuthRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()->new ApplicationException("user doesn't exist",  HttpStatus.BAD_REQUEST));
        try {
            if (!user.isEnabled()) {
                throw new RuntimeException("User is Not Verified");
            }

            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(user.getEmail());
            String token = jwtService.generateToken(userDetails);
            return token;
        }catch (Exception e){
            throw new RuntimeException("Couldn't Login at this moment");
        }
    }

    public boolean validateToken(String token){
        return jwtService.validateToken(token);
    }

    public String verifyEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("user doesn't exist"));
        try{
            LocalDateTime currentTime = LocalDateTime.now();
            LocalDateTime registeredTime = user.getTimestamp();
            Duration duration = Duration.between(currentTime, registeredTime);

            long hours = duration.toHours();
            if(hours>0){
                return "Link Not Valid Anymore, Register Again";
            }

            user.setEnabled(true);
            userRepository.save(user);
            return "User Verified";
        }catch (Exception e){
            e.printStackTrace();
            throw new ApplicationException("Error while validating user",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
