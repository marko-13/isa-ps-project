package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DiscriminatorValue("E")
public class Examination extends Appointment {

    //Kako ovde anotaciju napraviti, kad su nase klase u pitanju
    private Nurse nurse;

    @Column(name = "fast", unique = false, nullable = false)
    private boolean fast;

    //
    private Doctor doctor;

    //
    private Patient patient;

    //
    private MedicalReport mReport;

}
