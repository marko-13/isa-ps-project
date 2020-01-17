package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.ServiceDTO;
import com.proj.medicalClinic.repository.ServiceRepository;
import com.proj.medicalClinic.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public List<ServiceDTO> getAllFromClinic() {
        // nadji administratora klinike i sacuvaj njegov clinicID
       // serviceRepository.findAllByClinic(clinicId).orElse(null);
        return null;
    }


}
