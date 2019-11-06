package com.proj.medicalClinic.model;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@DiscriminatorValue("DR")
public class Doctor extends AppUser{

	@OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade =  CascadeType.ALL)
	private List<Leave> leaves;

	@Column(name = "shift", unique = false, nullable = false)
	private int shift;

	@OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade =  CascadeType.ALL)
  
	private List<Service> services;

	@Column(name = "review", unique = false, nullable = false)
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
