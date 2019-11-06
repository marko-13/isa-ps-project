package com.proj.medicalClinic.model;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;


@Entity
@DiscriminatorValue("NR")
public class Nurse extends AppUser{

	@OneToMany(mappedBy = "id", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Leave> leaves;

	@Column(name = "shift", nullable = false)
	private int shift;
	
	public Nurse() {
		super();
	}

	public Nurse(UUID id, String email, String password, String name, String lastName, List<Leave> leaves, int shift) {
		super(id, email, password, name, lastName);
		this.leaves = leaves;
		this.shift = shift;
	}

	public List<Leave> getLeaves() {
		return leaves;
	}

	public void setLeaves(List<Leave> leaves) {
		this.leaves = leaves;
	}

	public int getShift() {
		return shift;
	}

	public void setShift(int shift) {
		this.shift = shift;
	}
}
