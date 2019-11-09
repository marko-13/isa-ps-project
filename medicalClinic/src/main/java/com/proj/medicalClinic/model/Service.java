package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Service {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private UUID id;

    @Column(name = "service_type", unique = false, nullable = false)
    private String type;

    @Column(name = "price", unique = false, nullable = false)
    private double price;

    @ManyToMany(mappedBy = "services")
    private List<Clinic> clinics; //mozda ovde treba inicijalizovati listu = new List<>(); isto i u clinic kalsi

    @OneToOne
    @MapsId
    private Appointment appointment;

    @ManyToMany(mappedBy = "services")
    private List<Doctor> doctors;
}
