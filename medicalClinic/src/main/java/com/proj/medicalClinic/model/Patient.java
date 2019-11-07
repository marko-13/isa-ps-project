package com.proj.medicalClinic.model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.util.UUID;

@Entity
@DiscriminatorValue("P")
public class Patient extends AppUser {

	@Column(name = "JMBG", nullable = false)
	private String JMBG;

	@OneToOne
	private MedicalHistory medicalHistory;
	
	public Patient() {
		super();
	}

	public Patient(UUID id, RoleType userRole, String email, String password, String name, String lastName, String JMBG, MedicalHistory medicalHistory) {
		super(id, userRole, email, password, name, lastName);
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
