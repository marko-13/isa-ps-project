package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.DoctorDTO;
import com.proj.medicalClinic.dto.LeaveDTO;
import com.proj.medicalClinic.dto.NurseDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.model.Doctor;
import com.proj.medicalClinic.model.Leave;
import com.proj.medicalClinic.model.Nurse;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.repository.LeaveRepository;
import com.proj.medicalClinic.service.LeaveService;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public List<LeaveDTO> getAll() {

        List<Leave> leaves = leaveRepository.findAll();
        if(leaves == null){
            throw new NotExistsException("There are no leaves");
        }

        List<LeaveDTO> leaveDTOS = new ArrayList<>();

        for(Leave l : leaves){
            if(l.getNurse() != null){
                AppUser appUser = appUserRepository.findById(l.getNurse().getId()).orElseThrow(NotExistsException::new);
                NurseDTO nurseDTO = new NurseDTO((Nurse) appUser);
                leaveDTOS.add(new LeaveDTO(l, nurseDTO));
            }else{
                AppUser appUser = appUserRepository.findById(l.getDoctor().getId()).orElseThrow(NotExistsException::new);
                DoctorDTO doctorDTO = new DoctorDTO((Doctor) appUser);
                leaveDTOS.add(new LeaveDTO(l, doctorDTO));
            }
        }

        return leaveDTOS;
    }
}
