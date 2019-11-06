package com.proj.medicalClinic.model;

public class Patient extends AppUser {
	private String JMBG;
	private MedicalHistory medicalHistory;
	
	public Patient() {
		
	}
	
	public Patient(String JMBG, MedicalHistory medicalHistory) {
		super();
		this.JMBG = JMBG;
		this.medicalHistory = medicalHistory;
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
		return "Patient [JMBG=" + JMBG + ", medicalHistory=" + medicalHistory + "]";
	}
	
	
}
