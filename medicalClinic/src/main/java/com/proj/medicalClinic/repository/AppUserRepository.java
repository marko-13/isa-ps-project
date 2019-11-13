package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.UUID;

@Repository
public interface AppUserRepository extends JpaRepository <AppUser, UUID>{

    //Page<AppUser> findAll(Pageable pageable);

    //AppUser findByEmail(String email);

    public AppUser findByEmail(String emailid);
}
