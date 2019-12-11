package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {

    List<Leave> findAll();
    //List<Leave> findAllAndApprovedIsFalse();
    Optional<Leave> findById(Long id);

    @Query(
            value = "SELECT * FROM leave l WHERE l.active = true",
            nativeQuery = true
        )
    List<Leave> findAllUnapproved();

}
