package com.proj.medicalClinic.model;

import java.util.List;
import java.util.UUID;

public class MedicalReport {
	private UUID id;
	private String examDescription;
	private DiagnosisType diagnosis;
	private List<Prescription> prescriptions;
	
	public MedicalReport() {
	}
	
	public MedicalReport(UUID id, String examDescription, DiagnosisType diagnosis, List<Prescription> prescriptions) {
		super();
		this.id = id;
		this.examDescription = examDescription;
		this.diagnosis = diagnosis;
		this.prescriptions = prescriptions;
	}
	
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getExamDescription() {
		return examDescription;
	}
	public void setExamDescription(String examDescription) {
		this.examDescription = examDescription;
	}
	public DiagnosisType getDiagnosis() {
		return diagnosis;
	}
	public void setDiagnosis(DiagnosisType diagnosis) {
		this.diagnosis = diagnosis;
	}
	public List<Prescription> getPrescriptions() {
		return prescriptions;
	}
	public void setPrescriptions(List<Prescription> prescriptions) {
		this.prescriptions = prescriptions;
	}

	@Override
	public String toString() {
		return "MedicalReport [id=" + id + ", examDescription=" + examDescription + "]";
	}

}
