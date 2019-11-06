package com.proj.medicalClinic.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
public class MedicalHistory {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator (
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
	)
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "height", unique = false, nullable = true)
	private double height;

	@Column(name = "weight", unique = false, nullable = true)
	private double weight;

	@Column(name = "blood_type", unique = false, nullable = true)
	@Enumerated(EnumType.STRING)
	private BloodType bloodType;

	@Column(name = "dioptre", unique = false, nullable = true)
	private double dioptre;

	@Column(name = "allergy", unique = false, nullable = true)
	private String allergy;

	@OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade =  CascadeType.ALL)
	private List<MedicalReport> diseaseHistory;
	
	public MedicalHistory() {
		
	}
	
	public MedicalHistory(UUID id, double height, double weight, BloodType bloodType, double dioptre,
			String allergy, List<MedicalReport> diseaseHistory) {
		super();
		this.id = id;
		this.height = height;
		this.weight = weight;
		this.bloodType = bloodType;
		this.dioptre = dioptre;
		this.allergy = allergy;
		this.diseaseHistory = diseaseHistory;
	}


	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public double getHeight() {
		return height;
	}
	public void setHeight(double height) {
		this.height = height;
	}
	public double getWeight() {
		return weight;
	}
	public void setWeight(double weight) {
		this.weight = weight;
	}
	public BloodType getBloodType() {
		return bloodType;
	}
	public void setBloodType(BloodType bloodType) {
		this.bloodType = bloodType;
	}
	public double getDioptre() {
		return dioptre;
	}
	public void setDioptre(double dioptre) {
		this.dioptre = dioptre;
	}

	public String getAllergy() {
		return allergy;
	}

	public void setAllergy(String allergy) {
		this.allergy = allergy;
	}

	public List<MedicalReport> getDiseaseHistory() {
		return diseaseHistory;
	}

	public void setDiseaseHistory(List<MedicalReport> diseaseHistory) {
		this.diseaseHistory = diseaseHistory;
	}

	@Override
	public String toString() {
		return "MedicalHistory [id=" + id + ", height=" + height + ", weight=" + weight + ", bloodType=" + bloodType
				+ ", dioptre=" + dioptre + ", allergy=" + allergy + "]";
	}
	
}
