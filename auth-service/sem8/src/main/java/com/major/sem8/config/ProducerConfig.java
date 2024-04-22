package com.major.sem8.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class ProducerConfig {

    @Bean
    public NewTopic topicExample() {
        return TopicBuilder.name("verification-event")
                .partitions(2)
                .replicas(1)
                .build();
    }
}
