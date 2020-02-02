package com.proj.medicalClinic.repository;

import com.proj.medicalClinic.model.Clinic;
import com.proj.medicalClinic.model.Doctor;
import com.proj.medicalClinic.model.Examination;
import com.proj.medicalClinic.model.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.print.Doc;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    //Doctors are deleted logically, this returns all non-deleted doctors
    List<Doctor> findAllByDeletedNot(boolean deleted);

    //Returns doctor employed in given clinic
    List<Doctor> findAllByClinicIn(List<Clinic> c);
  
    List<Doctor> findAllByExaminations(Examination examination);
  
    List<Doctor> findAllByClinicAndDeletedNot(Clinic clinic, boolean deleted);

    
    @Query(
            value = "SELECT * FROM app_user d WHERE d.id = ?1",
            nativeQuery = true)
    Optional<Doctor> findById(Long id);


    List<Doctor> findAllByOperations(Operation op);

    @Query(
            value = "SELECT ap.type, ap.id, ap.adress, ap.city, ap.deleted, ap.email, ap.enabled, ap.last_name, ap.last_password_reset_date," +
                    "ap.mobile, ap.name, ap.password, ap.rejected, ap.state, ap.user_role, ap.review, ap.review_count, ap.shift, ap.jmbg," +
                    "ap.clinic_id, ap.clinical_center_id" +
                    "  FROM appointment as ex, doctors_examinations as dex, app_user as ap WHERE" +
                    " ex.id = dex.examination_id and dex.doctor_id = ap.id and dex.examination_id = ?1",
            nativeQuery = true)
    List<Doctor> findByPatientAndExamination(Long id);

    @Query(
            value = "SELECT ap.type, ap.id, ap.adress, ap.city, ap.deleted, ap.email, ap.enabled, ap.last_name, ap.last_password_reset_date," +
                    "ap.mobile, ap.name, ap.password, ap.rejected, ap.state, ap.user_role, ap.review, ap.review_count, ap.shift, ap.jmbg," +
                    "ap.clinic_id, ap.clinical_center_id" +
                    "  FROM appointment as ex, doctors_operations as dex, app_user as ap WHERE" +
                    " ex.id = dex.operation_id and dex.doctor_id = ap.id and dex.operation_id = ?1",
            nativeQuery = true)
    List<Doctor> findByPatientAndOperation(Long id);

}

