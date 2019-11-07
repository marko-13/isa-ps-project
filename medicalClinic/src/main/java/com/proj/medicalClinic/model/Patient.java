package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DiscriminatorValue("P")
public class Patient extends AppUser {

	@Column(name = "JMBG", nullable = false)
	private String JMBG;


	//promenio
	@OneToOne(mappedBy = "patient", cascade = CascadeType.ALL)
	private MedicalHistory medicalHistory;

	//PROMENIO
	@ManyToMany(mappedBy = "patients")
	private List<Clinic> clinics;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Examination> examinations;

}
