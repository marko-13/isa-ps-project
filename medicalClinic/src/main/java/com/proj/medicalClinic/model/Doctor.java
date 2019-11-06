package com.proj.medicalClinic.model;

import javax.persistence.Entity;
import java.util.List;
import java.util.UUID;

@Entity
public class Doctor extends AppUser{
	private List<Leave> leaves;
	private int shift;
	private List<Service> services;
	private double review;
	
	public Doctor() {
		super();
	}

	public Doctor(UUID id, String email, String password, String name, String lastName, List<Leave> leaves, int shift, List<Service> services, double review) {
		super(id, email, password, name, lastName);
		this.leaves = leaves;
		this.shift = shift;
		this.services = services;
		this.review = review;
	}

	public List<Service> getServices() {
		return services;
	}

	public void setServices(List<Service> services) {
		this.services = services;
	}

	public double getReview() {
		return review;
	}

	public void setReview(double review) {
		this.review = review;
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
		return "Doctor{" +
				"leaves=" + leaves +
				", shift=" + shift +
				", services=" + services +
				", review=" + review +
				'}';
	}
}
