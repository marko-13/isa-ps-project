package com.proj.medicalClinic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@SuperBuilder
@Entity
@DiscriminatorValue("O")
public class Operation extends Appointment {

    @ManyToMany(mappedBy = "operations")
    private List<Doctor> doctors;

    @OneToOne
    private Patient patient;

}
