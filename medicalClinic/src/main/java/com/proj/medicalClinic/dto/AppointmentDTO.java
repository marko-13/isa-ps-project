package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.Appointment;
import com.proj.medicalClinic.model.Doctor;
import com.proj.medicalClinic.model.Examination;
import com.proj.medicalClinic.model.Operation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {

    private String type;
    private Date date;
    private double duration;
    private String fastExam;
    private String clinic;
    private String operationRoom;
    private String service;
    private List<DoctorDTO> doctors;
    private String nurse;
    private String patient;

    public AppointmentDTO(Appointment a){
        this.type = a.getClass().getAnnotation(DiscriminatorValue.class).value();
        this.doctors = new ArrayList<>();

        if(this.type.equals("EX")){
            Examination examination = (Examination) a;
            this.date = examination.getDate();
            this.duration = examination.getDuration();

            if(examination.isFast()){
                this.fastExam = "Fast";
            }else{
                this.fastExam = "Regular";
            }

            this.clinic = examination.getClinic().getName();
            this.operationRoom = examination.getOperationRoom().getName();
            this.service = examination.getService().getType();

            if(examination.getDoctor() == null){
                this.doctors = null;
            }
            else{
                this.doctors.add(new DoctorDTO(examination.getDoctor()));
            }

            if(examination.getNurse() == null){
                this.nurse = "No nurse";
            }else{
                this.nurse = examination.getNurse().getName() + examination.getNurse().getLastName();
            }

            if(examination.getPatient() == null){
                this.patient = "No patient";
            }else{
                this.patient = examination.getPatient().getName() + examination.getPatient().getLastName();
            }
        }
        else{
            Operation operation = (Operation) a;

            this.date = operation.getDate();
            this.duration = operation.getDuration();

            this.fastExam = "Regular";

            this.clinic = operation.getClinic().getName();
            this.operationRoom = operation.getOperationRoom().getName();
            this.service = operation.getService().getType();

            if(operation.getDoctors() == null){
                this.doctors = null;
            }
            else{
                List<Doctor> doctors = operation.getDoctors();
                for(Doctor d : doctors){
                    this.doctors.add(new DoctorDTO(d));
                }
            }

            this.nurse = "No nurse";

            if(operation.getPatient() == null){
                this.patient = "No patient";
            }else{
                this.patient = operation.getPatient().getName() + operation.getPatient().getLastName();
            }
        }
    }

}
