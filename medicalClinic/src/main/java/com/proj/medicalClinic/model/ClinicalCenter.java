package com.proj.medicalClinic.model;

import javax.persistence.Entity;
import java.util.List;
import java.util.UUID;

@Entity
public class ClinicalCenter {
	private UUID id;
	private DiagnosisType diagnosis;
	private DrugsType drugs;
	private List<Clinic> clinics;
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
