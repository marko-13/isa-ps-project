package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.OperationRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OperationRoomRepository extends JpaRepository<OperationRoom, Long> {
    List<OperationRoom> findAll();
}
