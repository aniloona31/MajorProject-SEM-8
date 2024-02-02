package com.major.sem8;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
@OpenAPIDefinition(info = @Info(title = "Q&A Service", version = "1.0", description = "Documentation Q&A service v1.0"),
        servers = {
        @Server(url = "http://localhost:8765", description = "Q&A service doc")
})
public class QandaServiceApplication {

    public static void main(String[] args) {
            SpringApplication.run(QandaServiceApplication.class, args);
        }

}
