package com.proj.medicalClinic.model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.Date;
import java.util.UUID;

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

    public Examination() {
        super();
    }

    public Examination(Date date, OperationRoom operationRoom, Service service, double duration, Nurse nurse, boolean fast, Doctor doctor, Patient patient, MedicalReport mReport) {
        super(date, operationRoom, service, duration);
        this.nurse = nurse;
        this.fast = fast;
        this.doctor = doctor;
        this.patient = patient;
        this.mReport = mReport;
    }

    public Nurse getNurse() {
        return nurse;
    }

    public void setNurse(Nurse nurse) {
        this.nurse = nurse;
    }

    public boolean isFast() {
        return fast;
    }

    public void setFast(boolean fast) {
        this.fast = fast;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public MedicalReport getmReport() {
        return mReport;
    }

    public void setmReport(MedicalReport mReport) {
        this.mReport = mReport;
    }
}
