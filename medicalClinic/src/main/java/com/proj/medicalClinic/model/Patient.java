package com.proj.medicalClinic.model;

import java.util.UUID;

public class Patient extends User {
	private UUID id;
	private String JMBG;
	private MedicalHistory medicalHistory;
	
	public Patient() {
	}
	
	public Patient(UUID id, String JMBG, MedicalHistory medicalHistory) {
		super();
		this.id = id;
		this.JMBG = JMBG;
		this.medicalHistory = medicalHistory;
	}
	
	
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getJMBG() {
		return JMBG;
	}
	public void setJMBG(String JMBG) {
		this.JMBG = JMBG;
	}
	
	public MedicalHistory getMedicalHistory() {
		return medicalHistory;
	}
	public void setMedicalHistory(MedicalHistory medicalHistory) {
		this.medicalHistory = medicalHistory;
	}
	
	@Override
	public String toString() {
		return "Patient [JMBG=" + JMBG + "]";
	}
	
	
}
