package com.proj.medicalClinic.model;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Data
@SuperBuilder
@Entity
@DiscriminatorValue("P")
public class Patient extends AppUser {

	@Column(name = "JMBG", nullable = true)
	private String JMBG;

	@OneToOne(mappedBy = "patient", cascade = CascadeType.ALL)
	private MedicalHistory medicalHistory;

	@ManyToMany(mappedBy = "patients")
	private List<Clinic> clinics;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Examination> examinations;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Operation> operations;
}
