package com.major.sem8.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.security.Key;

@Service
public class JwtUtil {

    private String secret = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    public boolean validateToken(final String token) {
        try {
            Jwts.parser().setSigningKey(getSignKey()).parseClaimsJws(token);
            return true;
        }catch (Exception e){
            throw new RuntimeException("validation failed");
        }
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
