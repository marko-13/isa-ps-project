package com.proj.medicalClinic.dto;


import com.proj.medicalClinic.model.OperationRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OperationRoomDTO {

    private String name;
    private int number;

    public OperationRoomDTO(OperationRoom or){
        this(or.getName(),or.getNumber());
    }

}
