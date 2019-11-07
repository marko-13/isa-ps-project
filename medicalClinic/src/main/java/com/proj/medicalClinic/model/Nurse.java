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
@DiscriminatorValue("NR")
public class Nurse extends AppUser{

	@OneToMany(mappedBy = "id", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Leave> leaves;

	@Column(name = "shift", nullable = false)
	private int shift;

	//ovd treba lista preskripcija
	//moras dodati i field u svakoj klasi kad mapiras

}
