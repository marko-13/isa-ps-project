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
    //private AppUserDTO user;

    public LeaveDTO(Leave l){
        this.start = l.getDateStart();
        this.end = l.getDateEnd();

        if(l.getDoctor() != null){
           // AppUserDTO appUserDTO = new AppUserDTO(l.getDoctor());
           // this.user = appUserDTO;
        }
        else if(l.getNurse() != null){
            //AppUserDTO appUserDTO = new AppUserDTO(l.getNurse());
           // this.user = appUserDTO;
        }
    }

}
