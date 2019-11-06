package com.proj.medicalClinic.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class OperationRoom {

    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "number", nullable = false)
    private int number;

    public OperationRoom(){

    }

    public OperationRoom(UUID id, String name, int number) {
        this.id = id;
        this.name = name;
        this.number = number;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
