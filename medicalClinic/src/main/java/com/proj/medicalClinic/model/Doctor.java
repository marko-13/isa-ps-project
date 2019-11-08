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
@DiscriminatorValue("DR")
public class Doctor extends AppUser{

	@Column(name = "shift", unique = false, nullable = false)
	private int shift;

	@Column(name = "review", unique = false, nullable = false)
	private double review;

	//PROMENE
	@ManyToOne
	@JoinColumn(name = "clinic_id", nullable = false)
	private Clinic clinic;

	@OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Examination> examinations;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "Doctors_Operations",
			joinColumns = {@JoinColumn(name = "doctor_id")},
			inverseJoinColumns = {@JoinColumn(name = "operation_id")}
	)
	private List<Operation> operations;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "Doctors_Services",
			joinColumns = {@JoinColumn(name = "doctor_id")},
			inverseJoinColumns = {@JoinColumn(name = "service_id")}
	)
	private List<Service> services;

	@OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Leave> leaves;


}
