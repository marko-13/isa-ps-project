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
public class ClinicalCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, updatable = false, nullable = false)
	private Long id;

    @Column(name = "diagnosis", unique = false, nullable = false)
    @Enumerated(EnumType.STRING)
	private DiagnosisType diagnosis;

    @Column(name = "drugs", unique = false, nullable = false)
    @Enumerated(EnumType.STRING)
    private DrugsType drugs;

    @OneToMany(mappedBy = "clinicalCenter", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Clinic> clinics;

    @OneToMany(mappedBy = "clinicalCenter", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdminClinicalCenter> ccAdmins;

}
