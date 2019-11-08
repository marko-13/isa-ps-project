package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@SuperBuilder
@Entity
@DiscriminatorValue("E")
public class Examination extends Appointment {


    @Column(name = "fast", unique = false, nullable = false)
    private boolean fast;

    //nullable true jer ne mora za pregled odmah biti dodeljena sestra
    @ManyToOne
    @JoinColumn(name = "nurse_id", nullable = true)
    private Nurse nurse;

    //da li svaki pregled mora odmah da ima lekara, nullable = false
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    //nullable true jer kod kreiranja brzih pregleda nema pacijenta inicijalno
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = true)
    private Patient patient;

    //nullable true jer kod kreiranja pregleda jos nema izvestaja, tek kad se zavrsi pregled se kreira izvestaj
    @OneToOne(mappedBy = "examination", cascade = CascadeType.ALL)
    private MedicalReport mReport;

}
