package com.proj.medicalClinic.model;

import javax.persistence.Entity;
import java.util.Date;

@Entity
public class Appointment {
    private Date date;
    private OperationRoom or;
    private Service service;
    private double duration;

    public Appointment(){

    }

    public Appointment(Date date, OperationRoom or, Service service, double duration) {
        this.date = date;
        this.or = or;
        this.service = service;
        this.duration = duration;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public OperationRoom getOr() {
        return or;
    }

    public void setOr(OperationRoom or) {
        this.or = or;
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
