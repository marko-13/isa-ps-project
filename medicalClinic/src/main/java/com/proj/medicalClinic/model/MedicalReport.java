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
public class MedicalReport {

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private UUID id;

	@Column(name = "exam_description", unique = false, nullable = false)
	private String examDescription;

	@Column(name = "diagnosis", unique = false, nullable = false)
	@Enumerated(EnumType.STRING)
	private DiagnosisType diagnosis;

	@OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade =  CascadeType.ALL)
	private List<Prescription> prescriptions;

}
