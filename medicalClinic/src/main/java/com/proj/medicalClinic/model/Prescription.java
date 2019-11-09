package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Prescription {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
	)
	@Column(name = "id", unique = true, updatable = false, nullable = false)
	private UUID id;

	//@Enumerated(EnumType.STRING)
	//@Column(name = "drugs", nullable = false)
	//private List<DrugsType> drugs;

	//OCU DA STAVIM @ManyToOne ALI U NURSU NEMAM PERSCRIPTION, STA RADITI ??
	private Nurse nurse;

	//DODAO
	@OneToOne(mappedBy = "prescription", cascade = CascadeType.ALL)
	private MedicalReport medicalReport;

}
