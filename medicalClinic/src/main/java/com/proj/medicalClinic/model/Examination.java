package com.proj.medicalClinic.model;

import javax.persistence.Entity;
import java.util.Date;
import java.util.UUID;

@Entity
public class Examination extends Appointment {
    private UUID id;
    private Nurse nurse;
    private boolean fast;
    private Doctor doctor;
    private Patient patient;
    private MedicalReport mReport;

    public Examination() {
        super();
    }

    public Examination(Date date, OperationRoom or, Service service, double duration, UUID id, Nurse nurse, boolean fast, Doctor doctor, Patient patient, MedicalReport mReport) {
        super(date, or, service, duration);
        this.id = id;
        this.nurse = nurse;
        this.fast = fast;
        this.doctor = doctor;
        this.patient = patient;
        this.mReport = mReport;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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
