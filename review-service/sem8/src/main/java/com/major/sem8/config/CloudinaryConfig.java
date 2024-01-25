package com.major.sem8.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

//    @Value("${cloud.name}")
    private String cloudName = "dnogsbkz7";

//    @Value("${cloud.api.key}")
    private String apiKey = "193139698456669";

//    @Value("${cloud.api.secret}")
    private String apiSecret = "pLoY2_VQQlsQw5wLvFN8KWBAlbo";

    @Bean
    public Cloudinary getCloudinary(){
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true));
        return cloudinary;
    }
}
