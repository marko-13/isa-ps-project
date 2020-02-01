package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.AppointmentRequestDTO;
import com.proj.medicalClinic.dto.DoctorDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.NotValidParamsException;
import com.proj.medicalClinic.exception.ResourceConflictException;
import com.proj.medicalClinic.model.*;
import com.proj.medicalClinic.repository.AppUserRepository;
import com.proj.medicalClinic.repository.AppointmentRepository;
import com.proj.medicalClinic.repository.ClinicRepository;
import com.proj.medicalClinic.repository.DoctorRepository;
import com.proj.medicalClinic.security.TokenUtils;
import com.proj.medicalClinic.service.AppUserService;
import com.proj.medicalClinic.service.AuthorityService;
import com.proj.medicalClinic.service.DoctorService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AppUserRepository userRepository;

    public List<DoctorDTO> getAll(){
        List<Doctor> doctors = doctorRepository.findAllByDeletedNot(true);
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
        doctor.setPassword(passwordEncoder.encode("krokodil"));
        doctor.setState(doctorRequest.getState());
        doctor.setUserRole(RoleType.DOCTOR);
        doctor.setReview(0);
        doctor.setReviewCount(0);
        doctor.setShift(doctorRequest.getShift());
        doctor.setEnabled(true);
        doctor.setDeleted(false);
        doctor.setRejected(false);

        List<Authority> auth = authorityService.findByName(doctorRequest.getUserRole().name());
        doctor.setAuthorities(auth);
        doctorRepository.save(doctor);

        return new DoctorDTO(doctor);
    }

    public DoctorDTO remove(Long id){

        Doctor doctor = doctorRepository.findById(id).orElseThrow(NotExistsException::new);

        if(doctor.getExaminations().isEmpty() && doctor.getOperations().isEmpty()){
            doctor.setDeleted(true);
            doctorRepository.save(doctor);
        }else{
            throw new ResourceConflictException(id, "Doktor ima zakazane preglede!");
        }

        return new DoctorDTO(doctor);
    }

    @Override
    public List<DoctorDTO> getAllAvailableForDate(AppointmentRequestDTO appointmentRequestDTO) {

        System.out.println("USAO");
        Appointment appointment = appointmentRepository.findById(appointmentRequestDTO.getAppId()).orElseThrow(NotExistsException::new);
        Clinic clinic = appointment.getClinic();
        List<Doctor> doctors = doctorRepository.findAllByClinicAndDeletedNot(clinic, true);
        List<DoctorDTO> availableDoctors = new ArrayList<>();

        for(Doctor d : doctors){
            availableDoctors.add(new DoctorDTO(d));
        }

        long selectedDate = appointmentRequestDTO.getStart();
        System.out.println(selectedDate);
        for(Doctor d : doctors){
            for(Examination e : d.getExaminations()){
                long exStart = e.getDate().getTime();
                long exEnd = (long) (exStart + e.getDuration() * 60000);

                if(selectedDate >= exStart && selectedDate <= exEnd) {
                    for(int i = 0; i < availableDoctors.size(); i++){
                        if(availableDoctors.get(i).getId() == d.getId()){
                            System.out.println("DOKTOR IZBRISAN " + d.getName());
                            availableDoctors.remove(i);
                            break;
                        }
                    }
                }
            }

            for(Operation o : d.getOperations()){
                long oStart = o.getDate().getTime();
                long oEnd = (long) (oStart + o.getDuration() * 60000);

                if(selectedDate >= oStart && selectedDate <= oEnd){
                    for(int i = 0; i < availableDoctors.size(); i++){
                        if(availableDoctors.get(i).getId() == d.getId()){
                            System.out.println("DOKTOR IZBRISAN " + d.getName());
                            availableDoctors.remove(i);
                            break;
                        }
                    }
                }
            }
        }
        return availableDoctors;
    }

}
