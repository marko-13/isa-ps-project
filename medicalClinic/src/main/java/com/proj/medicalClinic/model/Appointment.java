package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
public class Appointment {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private UUID id;

    @Column(name = "date", unique = false, nullable = false)
    private Date date;

    //jedan termin ima samo jednu salu
    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL)
    private OperationRoom operationRoom;

    //kako ovde annotations
    @OneToOne(mappedBy = "service", cascade = CascadeType.ALL)
    private Service service;

    @Column(name = "duration", unique = false, nullable = false)
    private double duration;

    //PROMENE
    @ManyToOne
    @JoinColumn(name = "clinic_id", nullable = false)
    private Clinic clinic;


}
