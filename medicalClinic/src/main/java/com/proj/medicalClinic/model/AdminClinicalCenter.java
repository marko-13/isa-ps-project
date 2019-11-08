package com.proj.medicalClinic.model;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@SuperBuilder
@Entity
public class AdminClinicalCenter extends AppUser {

    @ManyToOne
    @JoinColumn(name = "clinical_center_id", nullable = false)
    private ClinicalCenter clinicalCenter;
}
