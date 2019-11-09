package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MedicalReport {
/*
	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
	)
	@Column(name = "id", unique = true, updatable = false, nullable = false)
	private UUID id;

	@Column(name = "exam_description", unique = false, nullable = false)
	private String examDescription;

	@Column(name = "diagnosis", unique = false, nullable = false)
	@Enumerated(EnumType.STRING)
	private DiagnosisType diagnosis;

	@OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade =  CascadeType.ALL)
	private List<Prescription> prescriptions;

	//DODAO
	@OneToOne
	@MapsId
	private Examination examination;

	@ManyToOne
	@JoinColumn(name = "medical_history_id", nullable = false)
	private MedicalHistory medicalHistory;

	@OneToOne
	@MapsId
	private Prescription prescription;


 */
}
