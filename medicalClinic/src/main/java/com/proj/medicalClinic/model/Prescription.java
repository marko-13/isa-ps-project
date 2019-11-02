package com.proj.medicalClinic.model;

public class Prescription {
	private UUID id;
	private List<DrugsType> drugs;
	private Nurse nurse;
	
	public Prescription() {
		
	}
	
	public Prescription(UUID id, List<DrugsType> drugs, Nurse nurse) {
		super();
		this.id = id;
		this.drugs = drugs;
		this.nurse = nurse;
	}
	
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public List<DrugsType> getDrugs() {
		return drugs;
	}
	public void setDrugs(List<DrugsType> drugs) {
		this.drugs = drugs;
	}
	public Nurse getNurse() {
		return nurse;
	}
	public void setNurse(Nurse nurse) {
		this.nurse = nurse;
	}

}
