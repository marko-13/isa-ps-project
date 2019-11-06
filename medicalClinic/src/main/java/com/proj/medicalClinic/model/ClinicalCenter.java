package com.proj.medicalClinic.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
public class ClinicalCenter {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", unique = true, updatable = false, nullable = false)
	private UUID id;

    @Column(name = "diagnosis", unique = false, nullable = false)
	private DiagnosisType diagnosis;

    @Column(name = "drugs", unique = false, nullable = false)
    private DrugsType drugs;

    @OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Clinic> clinics;

    @OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<AdminClinicalCenter> ccAdmins;

	public ClinicalCenter(){

    }

    public ClinicalCenter(UUID id, DiagnosisType diagnosis, DrugsType drugs, List<Clinic> clinics, List<AdminClinicalCenter> ccAdmins) {
        this.id = id;
        this.diagnosis = diagnosis;
        this.drugs = drugs;
        this.clinics = clinics;
        this.ccAdmins = ccAdmins;
    }

    public UUID getId() {
        return id;
    }

    public DiagnosisType getDiagnosis() {
        return diagnosis;
    }

    public DrugsType getDrugs() {
        return drugs;
    }

    public List<Clinic> getClinics() {
        return clinics;
    }

    public List<AdminClinicalCenter> getCcAdmins() {
        return ccAdmins;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setDiagnosis(DiagnosisType diagnosis) {
        this.diagnosis = diagnosis;
    }

    public void setDrugs(DrugsType drugs) {
        this.drugs = drugs;
    }

    public void setClinics(List<Clinic> clinics) {
        this.clinics = clinics;
    }

    public void setCcAdmins(List<AdminClinicalCenter> ccAdmins) {
        this.ccAdmins = ccAdmins;
    }
}
