package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Data
@SuperBuilder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("EX")
public class Examination extends Appointment {


    @Column(name = "fast", unique = false, nullable = false)
    private boolean fast;

    //NULLABLE TRUE JER ZA PREGLEDE NE MORA ODMAH BITI DODELJENA SESTRA
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nurse_id", nullable = true)
    private Nurse nurse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    //NULLABLE JER JE KOD BRZIH PREGLEDA PACIJENT NULL INICIJALNO
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = true)
    private Patient patient;

    //NULLABLE JER KOD PREGLEDA SE REPORT TEK KASNIJE DODELJUJE
    @OneToOne(mappedBy = "examination", cascade = CascadeType.ALL)
    private MedicalReport mReport;

}
