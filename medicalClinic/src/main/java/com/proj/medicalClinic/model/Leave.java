package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Leave {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
	)
	@Column(name = "id", unique = true, updatable = false, nullable = false)
	private UUID id;

	@Column(name = "date_start", unique = false, nullable = false)
	private Date dateStart;

	@Column(name = "date_end", unique = false, nullable = false)
	private Date dateEnd;

	//NULLABLE TRUE JER AKO JE GODISNJI OD NURSE OVDE JE NULL
	@ManyToOne
	@JoinColumn(name = "doctor_id", nullable = true)
	private Doctor doctor;

	//NULLABLE TRUE JER AKO JE GODISNJI OD DOCTOR OVDE JE NULL
	@ManyToOne
	@JoinColumn(name = "nurse_id", nullable = true)
	private Nurse nurse;
}
