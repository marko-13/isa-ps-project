package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.AppUser;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AppUserRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private AppUserRepository appUserRepository;

    @After
    public void cleanUp(){
        appUserRepository.deleteAll();
    }

    @Test
    public void shouldReturnEmptyOptionalWhenFindingNonExistingUserByEmail(){
        Optional<AppUser> foundAppUser = appUserRepository.findByEmail("NonExisting@gmail.com");

        assertFalse("App user does not exist", foundAppUser.isPresent());
    }

    @Test
    public void shouldReturnAppUserWhenFindingExistingAppUserByEmail(){
        Optional<AppUser> foundAppUser = appUserRepository.findByEmail("Miljana@gmail.com");

        assertTrue("App user does exist", foundAppUser.isPresent());
    }
}
