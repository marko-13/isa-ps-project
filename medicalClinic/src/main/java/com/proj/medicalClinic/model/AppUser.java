package com.proj.medicalClinic.model;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Data
@SuperBuilder
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
}
