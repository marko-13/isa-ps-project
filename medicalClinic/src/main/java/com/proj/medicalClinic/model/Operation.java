package com.proj.medicalClinic.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@DiscriminatorValue("O")
public class Operation extends Appointment {

    @ManyToMany
    @JoinTable(name = "operating", joinColumns = @JoinColumn(name = "operation_id", referencedColumnName = "id"),
                inverseJoinColumns = @JoinColumn(name = "doctor_id", referencedColumnName = "id"))
    private List<Doctor> doctors;

    @OneToOne
    private Patient patient;

    public Operation(){
        super();
    }

    public Operation(UUID id, Date date, OperationRoom or, Service service, double duration, List<Doctor> doctors, Patient patient) {
        super(id, date, or, service, duration);
        this.doctors = doctors;
        this.patient = patient;
    }

    public void setDoctors(List<Doctor> doctors) {
        this.doctors = doctors;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public List<Doctor> getDoctors() {
        return doctors;
    }

    public Patient getPatient() {
        return patient;
    }
}
