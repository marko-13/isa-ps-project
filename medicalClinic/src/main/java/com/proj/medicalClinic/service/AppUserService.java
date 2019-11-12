package com.proj.medicalClinic.service;

import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService {

    @Autowired
    private AppUserRepository userRepository;

    public List<AppUser> findAll() {
        return userRepository.findAll();
    }


}
