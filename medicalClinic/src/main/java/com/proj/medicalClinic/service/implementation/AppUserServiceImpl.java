package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.Authority;
import com.proj.medicalClinic.model.Patient;
import com.proj.medicalClinic.model.RoleType;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.service.AppUserService;
import com.proj.medicalClinic.service.AuthorityService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    private AppUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;

    @Override
    public List<AppUser> findAll() {
        return userRepository.findAll();
    }

    @Override
    public List<AppUser> findByUserRole(RoleType role) {
        return userRepository.findByUserRole(role);
    }

    @Override
    public AppUser findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public AppUser save(AppUser userRequest) {
        AppUser u = new AppUser();
        u.setEmail(userRequest.getEmail());
        u.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        u.setName(userRequest.getName());
        u.setLastName(userRequest.getLastName());
        u.setUserRole(userRequest.getUserRole());
        //u.setEmail(userRequest.getE);
        //u.setEnabled(true);

        List<Authority> auth = authorityService.findByName("PATIENT");
        u.setAuthorities(auth);
        u = this.userRepository.save(u);
        return u;
    }

}
