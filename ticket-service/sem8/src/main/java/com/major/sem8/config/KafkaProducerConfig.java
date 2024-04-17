package com.major.sem8.config;

import com.major.sem8.entity.Ticket;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {

//    @Value("${kafka.server}")
//    private String kafkaServer;
//
//    @Bean
//    public Map<String,Object> producerConfig(){
////        System.out.println(kafkaServer);
//        Map<String,Object> props=new HashMap<>();
//        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,
//                "172.31.75.39:9092");
//        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
//                StringSerializer.class);
//        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
//                JsonSerializer.class);
//        System.out.println(props);
//        return props;
//    }
//
//    @Bean
//    public ProducerFactory<String, Ticket> producerFactory(){
//        return new DefaultKafkaProducerFactory<>(producerConfig());
//    }
//
//    @Bean
//    public KafkaTemplate<String,Ticket> kafkaTemplate(){
//        return new KafkaTemplate<>(producerFactory());
//    }

    @Bean
    public NewTopic topicExample() {
        return TopicBuilder.name("ticket-event")
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic emailTopic() {
        return TopicBuilder.name("email-event")
                .partitions(3)
                .replicas(1)
                .build();
    }
}
