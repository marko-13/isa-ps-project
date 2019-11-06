package com.proj.medicalClinic.model;

import java.util.List;

public class MedicalStaff extends AppUser {
	private List<Leave> leaves;
	private int shift;
	
	public MedicalStaff() {
		
	}
	
	public MedicalStaff(List<Leave> leaves, int shift) {
		super();
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

	@Override
	public String toString() {
		return "MedicalStaff [shift=" + shift + "]";
	}
	
}
