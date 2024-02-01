package com.major.sem8;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class QandaServiceApplication {

    public static void main(String[] args) {
            SpringApplication.run(QandaServiceApplication.class, args);
        }

}
