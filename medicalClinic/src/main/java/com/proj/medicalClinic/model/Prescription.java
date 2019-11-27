package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Prescription {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, updatable = false, nullable = false)
	private Long id;

	//@Enumerated(EnumType.STRING)
	//@Column(name = "drugs", nullable = false)
	//private List<DrugsType> drugs;

    @ManyToOne
    @JoinColumn(name = "nurse_id", nullable = false)
    private Nurse nurse;

	@OneToOne(mappedBy = "prescription", cascade = CascadeType.ALL)
	private MedicalReport medicalReport;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "Prescription_Drugs",
			joinColumns = {@JoinColumn(name = "prescription_id")},
			inverseJoinColumns = {@JoinColumn(name = "prescription_drug_id")}
	)
	private List<PrescriptionDrug> prescriptionDrugs;
}
