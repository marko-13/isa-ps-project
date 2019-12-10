package com.proj.medicalClinic.dto;

import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.Leave;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaveDTO {

    private Date start;
    private Date end;
    private Long userID;

    public LeaveDTO(Leave l){
        this.start = l.getDateStart();
        this.end = l.getDateEnd();

        if(l.getNurse() != null){
            this.userID = l.getNurse().getId();
        }else{
            this.userID = l.getDoctor().getId();
        }
    }

}
