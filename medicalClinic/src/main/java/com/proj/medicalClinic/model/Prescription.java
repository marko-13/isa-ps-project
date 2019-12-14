package com.proj.medicalClinic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

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

	@Column(name = "approved", nullable = false)
	private Boolean approved;

	@ElementCollection(targetClass=DrugsType.class)
	@Enumerated(EnumType.STRING) // Possibly optional (I'm not sure) but defaults to ORDINAL.
	@CollectionTable(name="prescription_drugs", joinColumns = @JoinColumn(name = "prescription_id"))
	@Column(name="drug_id", nullable = false) // Column name in person_interest
	private Set<DrugsType> drug;

    @ManyToOne(fetch=FetchType.LAZY)
	//@NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "nurse_id", nullable = false)
    private Nurse nurse;

	@OneToOne(mappedBy = "prescription", cascade = CascadeType.ALL)
	private MedicalReport medicalReport;
}
