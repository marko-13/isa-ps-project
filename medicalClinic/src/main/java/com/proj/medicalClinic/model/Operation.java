package com.proj.medicalClinic.model;

import java.util.UUID;

public class Operation extends Appointment {
    private UUID id;
    private List<Doctor> doctors;
    private Patient patient;

    public Operation(){

    }

    public Operation(UUID id, List<Doctor> doctors, Patient patient) {
        this.id = id;
        this.doctors = doctors;
        this.patient = patient;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setDoctors(List<Doctor> doctors) {
        this.doctors = doctors;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public UUID getId() {
        return id;
    }

    public List<Doctor> getDoctors() {
        return doctors;
    }

    public Patient getPatient() {
        return patient;
    }
}
