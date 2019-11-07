package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Leave {

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private UUID id;

	@Column(name = "date_start", unique = false, nullable = false)
	private Date dateStart;

	@Column(name = "date_end", unique = false, nullable = false)
	private Date dateEnd;

}
