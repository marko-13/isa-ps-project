package com.proj.medicalClinic.model;

import java.util.List;
import java.util.UUID;

public class Clinic {
    private UUID id;
    private String name;
    private String address;
    private String description;
    private List<Appointment> appointments;
    private List<Doctor> doctors;
    private List<Nurse> nurses;
    private List<OperationRoom> ors;
    private List<Service> services;
    private List<Patient> patinets;
    private double review;

    public Clinic() {

    }

    public Clinic(UUID id, String name, String address, String description, List<Appointment> appointments, List<Doctor> doctors, List<Nurse> nurses, List<OperationRoom> ors, List<Service> services, List<Patient> patinets, double review) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.description = description;
        this.appointments = appointments;
        this.doctors = doctors;
        this.nurses = nurses;
        this.ors = ors;
        this.services = services;
        this.patinets = patinets;
        this.review = review;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public List<Doctor> getDoctors() {
        return doctors;
    }

    public void setDoctors(List<Doctor> doctors) {
        this.doctors = doctors;
    }

    public List<Nurse> getNurses() {
        return nurses;
    }

    public void setNurses(List<Nurse> nurses) {
        this.nurses = nurses;
    }

    public List<OperationRoom> getOrs() {
        return ors;
    }

    public void setOrs(List<OperationRoom> ors) {
        this.ors = ors;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public List<Patient> getPatinets() {
        return patinets;
    }

    public void setPatinets(List<Patient> patinets) {
        this.patinets = patinets;
    }

    public double getReview() {
        return review;
    }

    public void setReview(double review) {
        this.review = review;
    }
}
