package com.major.sem8.service;

import com.major.sem8.config.CustomUserDetailsServiceImpl;
import com.major.sem8.dto.AuthRequest;
import com.major.sem8.entity.User;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        if(userRepository.findByEmail(credential.getEmail()).isPresent()){
            throw new RuntimeException("user with email already exists");
        }
        credential.setEnabled(true);
        credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        userRepository.save(credential);
        return "user added to the system";
    }

    public String login(AuthRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()->new ApplicationException("user doesn't exist",  HttpStatus.BAD_REQUEST));
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtService.generateToken(userDetails);
        return token;
    }

    public boolean validateToken(String token){
        return jwtService.validateToken(token);
    }
}
