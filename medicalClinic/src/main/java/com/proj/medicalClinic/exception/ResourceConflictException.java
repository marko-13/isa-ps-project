package com.proj.medicalClinic.exception;

import java.util.UUID;

public class ResourceConflictException extends RuntimeException {
    private static final long serialVersionUID = 1791564636123821405L;

    private UUID resourceId;

    public ResourceConflictException(UUID resourceId, String message) {
        super(message);
        this.setResourceId(resourceId);
    }

    public UUID getResourceId() {
        return resourceId;
    }

    public void setResourceId(UUID resourceId) {
        this.resourceId = resourceId;
    }

}