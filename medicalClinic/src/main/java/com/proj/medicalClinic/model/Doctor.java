package com.proj.medicalClinic.model;

import java.util.List;

public class Doctor {
	private List<Service> services;
	private double review;
	
	public Doctor() {
		
	}
	
	public Doctor(List<Service> services, double review) {
		super();
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

	@Override
	public String toString() {
		return "Doctor [review=" + review + "]";
	}
	
}
