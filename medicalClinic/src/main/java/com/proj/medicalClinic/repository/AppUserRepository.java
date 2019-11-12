package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.UUID;

public interface AppUserRepository extends JpaRepository <AppUser, UUID>{

    List<AppUser> findAll();

    //AppUser findByEmail(String email);

}
