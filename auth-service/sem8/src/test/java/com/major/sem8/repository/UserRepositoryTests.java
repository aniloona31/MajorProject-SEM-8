package com.major.sem8.repository;

import com.major.sem8.entity.User;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void UserRepository_Save(){
        //Arrange
        User user = User.builder()
                .id(1L)
                .email("anirudh@gmail.com")
                .isEnabled(false)
                .password("12341234")
                .phoneNumber("1237482922")
                .username("ani")
                .build();

        //Act
        User savedUser = userRepository.save(user);

        //Assert
        Assertions.assertThat(savedUser).isNotNull();
    }

    @Test
    public void UserRepository_findByEmail(){
        User user = User.builder()
                .id(1L)
                .email("anirudh@gmail.com")
                .isEnabled(false)
                .password("12341234")
                .phoneNumber("1237482922")
                .username("ani")
                .build();

        //Act
        User savedUser = userRepository.save(user);
        User userFound = userRepository.findByEmail("anirudh@gmail.com").get();

        Assertions.assertThat(userFound).isNotNull();
    }
}
