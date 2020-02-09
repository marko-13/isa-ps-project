package com.proj.medicalClinic.controller;

import com.proj.medicalClinic.model.UserTokenState;
import com.proj.medicalClinic.security.authentication.JwtAuthenticationRequest;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Timeout;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;


import javax.annotation.PostConstruct;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AppointmentControllerIntegrationTest {

    private String accessTokenDoctor;
    private String accessTokenAdminClinic;

    private MediaType contentType = new MediaType(
            MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype());

    private MockMvc mockMvc;

    public static final String url = "/appointment";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @PostConstruct
    public void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    @Before
    public void loginDoctor() {
        ResponseEntity<UserTokenState> responseEntity = restTemplate.postForEntity("/users/login",
                new JwtAuthenticationRequest("Vladan@mailinator.com", "vladan"), UserTokenState.class);
        accessTokenDoctor = "Bearer " + responseEntity.getBody().getAccessToken();
    }

    @Before
    public void loginAdminClinic() {
        ResponseEntity<UserTokenState> responseEntity = restTemplate.postForEntity("/users/login",
                new JwtAuthenticationRequest("Anastasija@mailinator.com", "anastasija"), UserTokenState.class);
        accessTokenAdminClinic = "Bearer " + responseEntity.getBody().getAccessToken();
    }

   /*@Test
    public void testGetAllByOperationRoom_Success() throws Exception {
        mockMvc.perform(get(url + "/getAllByOperationRoom/" + 1L)
                .header("Authorization", accessTokenDoctor))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$").value(hasSize(2)));
    }

    @Test
    public void testGetAllByPatient_Success() throws Exception {
        mockMvc.perform(get(url + "/getAllByPatient/" + 1L)
                .header("Authorization", accessTokenDoctor))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$").value(hasSize(2)));
    }

    @Test
    public void testGetAllByPatientNoParams_Success() throws Exception {
        mockMvc.perform(get(url + "/getAllAppointmentRequests")
                .header("Authorization", accessTokenAdminClinic))
                .andExpect(status().isOk());
    }

    @Test
    public void testAddRoom_NotAllowed() throws Exception {
        mockMvc.perform(post(url + "/addRoomToAppointment/" + 7L + "/" + 8L)
                .header("Authorization", accessTokenAdminClinic))
                .andExpect(status().isNotFound());
    }*/

    @Test
    public void testAddRoom_Success() throws Exception {
        mockMvc.perform(post(url + "/addRoomToAppointment/" + 7L + "/" + 1L)
                .header("Authorization", accessTokenAdminClinic))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.operationRoom").value("Operaciona sala"))
                .andDo(MockMvcResultHandlers.print());
    }

    /*@Test
    public void testAddRoom_Success() throws Exception {
        mockMvc.perform(post(url + "/addRoomToAppointment/" + 7L + "/" + 1L)
                .header("Authorization", accessTokenAdminClinic))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }*/


}
