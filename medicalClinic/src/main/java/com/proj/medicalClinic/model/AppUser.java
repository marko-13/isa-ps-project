package com.proj.medicalClinic.model;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
public class AppUser {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
	)
	@Column(name = "id", unique = true, updatable = false, nullable = false)
	private UUID id;

	@Column(name = "user_role", unique = false, updatable = false, nullable = false)
	@Enumerated(EnumType.STRING)
	private RoleType userRole;

	@Column(name="email", unique=false, nullable=false)
	private String email;

	@Column(name="password", unique=false, nullable=false)
	private String password;

	@Column(name="name", unique=false, nullable=false)
	private String name;

	@Column(name="last_name", unique=false, nullable=false)
	private String lastName;
	
	public AppUser() {
		
	}
	
	public AppUser(UUID id, RoleType userRole, String email, String password, String name, String lastName) {
		this.id = id;
		this.userRole = userRole;
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

	public RoleType getUserRole() {
		return userRole;
	}

	public void setUserRole(RoleType userRole) {
		this.userRole = userRole;
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
