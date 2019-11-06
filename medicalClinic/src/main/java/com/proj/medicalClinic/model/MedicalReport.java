package com.proj.medicalClinic.model;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
public class MedicalReport {

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private UUID id;

	@Column(name = "exam_description", unique = false, nullable = false)
	private String examDescription;

	@Column(name = "diagnosis", unique = false, nullable = false)
	@Enumerated(EnumType.STRING)
	private DiagnosisType diagnosis;

	@OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade =  CascadeType.ALL)
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
