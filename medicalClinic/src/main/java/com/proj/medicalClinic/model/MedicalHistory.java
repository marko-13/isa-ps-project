package com.proj.medicalClinic.model;

import java.util.List;
import java.util.UUID;

public class MedicalHistory {
	private UUID id;
	private double height;
	private double weight;
	private BloodType bloodType;
	private double dioptre;
	private List<String> allergy;
	private List<MedicalReport> diseaseHistory;
	
	public MedicalHistory() {
		
	}
	
	public MedicalHistory(UUID id, double height, double weight, BloodType bloodType, double dioptre,
			List<String> allergy, List<MedicalReport> diseaseHistory) {
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

	public List<String> getAllergy() {
		return allergy;
	}

	public void setAllergy(List<String> allergy) {
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
