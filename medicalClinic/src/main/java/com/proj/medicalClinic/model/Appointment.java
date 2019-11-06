package com.proj.medicalClinic.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

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

    @Column(name = "operation_room", unique = false, nullable = false)
    private OperationRoom operationRoom;

    @Column(name = "service", unique = false, nullable = false)
    private Service service;

    @Column(name = "duration", unique = false, nullable = false)
    private double duration;

    public Appointment(){

    }

    public Appointment(Date date, OperationRoom operationRoom, Service service, double duration) {
        this.date = date;
        this.operationRoom = operationRoom;
        this.service = service;
        this.duration = duration;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public OperationRoom getOperationRoom() {
        return operationRoom;
    }

    public void setOr(OperationRoom operationRoom) {
        this.operationRoom = operationRoom;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }
}
