package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    private AppUserRepository userRepository;

    @Override
    public List<AppUser> findAll() {
        return userRepository.findAll();
    }

}
