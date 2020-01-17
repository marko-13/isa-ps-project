package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.ServiceDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.ResourceConflictException;
import com.proj.medicalClinic.model.AdminClinic;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.repository.ServiceRepository;
import com.proj.medicalClinic.service.ServiceService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public List<ServiceDTO> getAllFromClinic() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();

        AdminClinic adminClinic = (AdminClinic) appUserRepository.findByEmail(username).orElseThrow(NotExistsException::new);

        Long clinicId = adminClinic.getClinic().getId();

        List<com.proj.medicalClinic.model.Service> services = serviceRepository.findAllByClinic(clinicId);

        if(services == null){
            throw new NotExistsException("Ne postoji ni jedan tip pregleda u toj klinici.");
        }else{
            List<ServiceDTO> serviceDTOS = new ArrayList<>();
            for(com.proj.medicalClinic.model.Service s : services){
                serviceDTOS.add(new ServiceDTO(s));
            }
            return serviceDTOS;
        }
    }


}
