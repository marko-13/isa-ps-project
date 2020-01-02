package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.DoctorDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.model.Authority;
import com.proj.medicalClinic.model.Doctor;
import com.proj.medicalClinic.model.RoleType;
import com.proj.medicalClinic.repository.DoctorRepository;
import com.proj.medicalClinic.service.AuthorityService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorServiceImpl {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AuthorityService authorityService;

    public List<DoctorDTO> getAll(){
        List<Doctor> doctors = doctorRepository.findAll();
        if(doctors == null){
            throw new NotExistsException();
        }

        List<DoctorDTO> doctorDTOS = new ArrayList<>();
        for(Doctor d : doctors){
            doctorDTOS.add(new DoctorDTO(d));
        }

        return doctorDTOS;
    }

    public DoctorDTO save(Doctor doctorRequest) {
        Doctor doctor = new Doctor();

        doctor.setName(doctorRequest.getName());
        doctor.setAdress(doctorRequest.getAdress());
        doctor.setCity(doctorRequest.getCity());
        doctor.setEmail(doctorRequest.getEmail());
        doctor.setLastName(doctorRequest.getLastName());
        doctor.setMobile(doctorRequest.getMobile());
        doctor.setPassword("12321");
        doctor.setState(doctorRequest.getState());
        doctor.setUserRole(RoleType.DOCTOR);
        doctor.setReview(0);
        doctor.setReviewCount(0);
        doctor.setShift(doctorRequest.getShift());

        List<Authority> auth = authorityService.findByName(doctorRequest.getUserRole().name());
        doctor.setAuthorities(auth);
        doctorRepository.save(doctor);

        return new DoctorDTO(doctor);
    }

}
