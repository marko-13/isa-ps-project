package com.proj.medicalClinic.model;

import java.util.UUID;

public class Service {
    private UUID id;
    private String type;
    private double price;

    public Service(){

    }

    public Service(UUID id, String type, double price) {
        this.id = id;
        this.type = type;
        this.price = price;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
