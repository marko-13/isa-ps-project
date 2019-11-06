package com.proj.medicalClinic.model;

import java.util.List;
import java.util.UUID;

public class Nurse extends AppUser{

	private List<Leave> leaves;
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
