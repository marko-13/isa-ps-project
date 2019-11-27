package com.proj.medicalClinic.repository;
import com.proj.medicalClinic.model.Examination;
import com.proj.medicalClinic.model.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExaminationRepository extends JpaRepository<Examination, Long> {

    List<Examination> findAllByNurse(Nurse nurse);

}
