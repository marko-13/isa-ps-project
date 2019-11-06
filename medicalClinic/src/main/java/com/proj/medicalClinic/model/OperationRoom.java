package com.proj.medicalClinic.model;

import java.util.UUID;

public class OperationRoom {
    private UUID id;
    private String name;
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
