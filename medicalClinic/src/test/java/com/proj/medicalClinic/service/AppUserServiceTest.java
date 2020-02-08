package com.proj.medicalClinic.service;

import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.repository.AppUserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AppUserServiceTest {

    @Autowired
    private AppUserService appUserService;


    @Test(expected = NotExistsException.class)
    public void shouldThrowNotExistsExceptionWhenAppUserDoesNotExist(){

        appUserService.findByEmail("nepostoji@mailinator.com");
    }
}
