package com.major.sem8.config;

import com.major.sem8.entity.Payment;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
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

//    @Bean
//    public Map<String,Object> producerConfig(){
//        Map<String,Object> props=new HashMap<>();
//        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,
//                "localhost:9092");
//        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
//                StringSerializer.class);
//        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
//                JsonSerializer.class);
//        return props;
//    }
//
//    @Bean
//    public ProducerFactory<String, Payment> producerFactory(){
//        return new DefaultKafkaProducerFactory<>(producerConfig());
//    }
//
//    @Bean
//    public KafkaTemplate<String,Payment> kafkaTemplate(){
//        return new KafkaTemplate<>(producerFactory());
//    }

    @Bean
    public NewTopic topicExample() {
        return TopicBuilder.name("payment-event")
                .partitions(3)
                .replicas(1)
                .build();
    }
}
