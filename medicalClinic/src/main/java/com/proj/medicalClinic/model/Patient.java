package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@SuperBuilder
@Entity
@DiscriminatorValue("P")
public class Patient extends AppUser {
<<<<<<< HEAD
	@Column(name = "JMBG", nullable = false)
=======

	@Column(name = "JMBG", nullable = true)
>>>>>>> 9579521f2b5c954564906f9982ce193ee8e74be5
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
