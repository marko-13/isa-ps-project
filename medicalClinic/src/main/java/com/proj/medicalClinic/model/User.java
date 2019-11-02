package com.proj.medicalClinic.model;
import java.util.UUID;

public class User {
	private UUID id;
	private String email;
	private String password;
	private String name;
	private String lastName;
	
	public User() {
		
	}
	
	public User(UUID id, String email, String password, String name, String lastName) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.name = name;
		this.lastName = lastName;
	}
	
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password + ", name=" + name + ", lastName="
				+ lastName + "]";
	}
	
	
}
