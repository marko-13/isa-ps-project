package com.proj.medicalClinic.model;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Data
@SuperBuilder
@Entity
@DiscriminatorValue("O")
public class Operation extends Appointment {

    @ManyToMany(mappedBy = "operations")
    private List<Doctor> doctors;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
