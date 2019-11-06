package com.proj.medicalClinic.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
public class Prescription {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private UUID id;

	@Enumerated(EnumType.STRING)
	@Column(name = "drugs", nullable = false)
	private List<DrugsType> drugs;

	//OCU DA STAVIM @ManyToOne ALI U NURSU NEMAM PERSCRIPTION, STA RADITI ??
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
