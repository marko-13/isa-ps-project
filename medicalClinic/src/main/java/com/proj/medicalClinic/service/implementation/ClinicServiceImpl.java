package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.dto.ClinicDTO;
import com.proj.medicalClinic.dto.ClinicServiceDTO;
import com.proj.medicalClinic.dto.DoctorDTO;
import com.proj.medicalClinic.dto.DrugsRegistryDTO;
import com.proj.medicalClinic.exception.NotExistsException;
import com.proj.medicalClinic.exception.NotValidParamsException;
import com.proj.medicalClinic.model.*;
import com.proj.medicalClinic.repository.*;
import com.proj.medicalClinic.service.ClinicService;
import com.sun.xml.bind.v2.TODO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private CustomUserDetailsServiceImpl userDetailsService;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private OperationRepository operationRepository;

    @Autowired
    private ExaminationRepository examinationRepository;

    @Override
    public List<ClinicDTO> getAllClinics() {

        List<Clinic> clinics = clinicRepository.findAll();
        List<ClinicDTO> clinicsDTO = new ArrayList<>();
        for (Clinic c : clinics) {
            clinicsDTO.add(new ClinicDTO(c));
        }

        return clinicsDTO;

    }

    @Override
    public List<ClinicDTO> getClinicsOfAdminClinicalCenter(String email) {
        try {
            AppUser user = appUserRepository.findByEmail(email)
                    .orElseThrow(NotExistsException::new);

            if (!(user instanceof AdminClinicalCenter)) {
                throw new NotValidParamsException("Only admin of the clinical center can see this data");
            }

            List<Clinic> clinics = clinicRepository.findAllByClinicalCenter(((AdminClinicalCenter) user).getClinicalCenter());

            List<ClinicDTO> clinicsDTO = clinics.stream().map(
                    s -> new ClinicDTO(s)
            ).collect(Collectors.toList());

            return clinicsDTO;

        } catch (NotExistsException | NotValidParamsException e) {
            throw e;
        }

    }

    //Returns the list of clincis the patient has been to
    @Override
    public List<ClinicDTO> getAllAssociatedWithPatient(String patient_email) {
        Patient my_patient = (Patient)appUserRepository.findByEmail(patient_email).
                orElseThrow(NotExistsException::new);

        List<ClinicDTO> ret_val = new ArrayList<>();

        List<Clinic> patients_clinics = clinicRepository.findAllByPatientId(my_patient.getId());

        for(Clinic c : patients_clinics){
            ret_val.add(new ClinicDTO(c));
        }

        return ret_val;
    }

    // Update broja review-a i zbira svih rview-a klinike
    @Override
    public void review_clinic(Long id, int score) {
        Clinic c = clinicRepository.findById(id).orElseThrow(NotExistsException::new);

        c.setReviewCount(c.getReviewCount() + 1);
        c.setReview(c.getReview() + (float)score);

        clinicRepository.save(c);
    }


    // Returns list of clinics where its possible to get selected service(appropriate doctors exist)
    // and where are appointemnts available for selected date
    @Override
    public List<ClinicServiceDTO> findCorresponding(Long service_id, Long appointment_date, double min_clinic_score) {
        //Requested service
        com.proj.medicalClinic.model.Service my_service = serviceRepository.findById(service_id).orElseThrow(NotExistsException::new);
        Long my_duration = 3600000L;
        //sve klinike u kojima moze da se izvrsi odredjeni pregled
        List<Clinic> my_clinics = clinicRepository.findByServiceId(service_id);

        //svi doktori koji rade u tim klinikama
        List<Doctor> my_doctors = doctorRepository.findAllByClinicIn(my_clinics);
        if(!(my_doctors.isEmpty())){
            throw new NotExistsException();
        }
        List<Doctor> ok_doktori = new ArrayList<>();


        Date my_date = new Date(appointment_date);
        long eight_hrs_in_miliseconds = 28800000L;
        //for each doctor check if there is free time in his schedule
        for(Doctor d : my_doctors){
            List<Operation> docs_operations = operationRepository.findAllByDoctorsContaining(d);

            //IZBACI SVE KOJI NISU U ZELJENOM DANU
            for(Operation o : docs_operations){
                if(o.getDate().getDay() != my_date.getDay()){
                    docs_operations.remove(o);
                }
            }

            //SORTIRAJ IH PO VREMENU
            Collections.sort(docs_operations, new Comparator<Operation>() {
                public int compare(Operation o1, Operation o2) {
                    // compare two instance of `Operation` and return `int` as result.
                    return (int) (o2.getDate().getTime()-(o1.getDate().getTime()));
                }
            });

            //ZA SVAKU IZRACUNAJ UDALJENOST OD SLEDECE I AKO JE VECA OD 1h DODAJ VREME KAO OPCIJU
            for(int i =0; i<docs_operations.size()- 1; i++){
                if(-docs_operations.get(i).getDate().getTime() - docs_operations.get(i).getDuration() +
                  docs_operations.get(i + 1).getDate().getTime() < my_duration){
                    ok_doktori.add(d);
                }
            }
        }

        // TODO
        //PROVDJI KROZ SVE DOKTORE I VRATI KLINIKE NA KOJIMA SU TI DOKTORI JER TAMO IMA SLOBODNIH TERMINA



        return null;
    }

    @Override
    public ClinicDTO addNewClinic(ClinicDTO clinicDTO, String email) {
        try {
            if (clinicDTO == null) {
                throw new NotValidParamsException("Server has not recieved right clinicDTO");
            }

            AdminClinicalCenter adminCC = (AdminClinicalCenter) this.userDetailsService.loadUserByUsername(email);

            if (adminCC == null) {
                throw new NotValidParamsException("Server has not recieved right email of Administrator of the clinical center");
            }

            List<Clinic> uniqueClinic = this.clinicRepository.findAllByNameAndAddress(clinicDTO.getName(), clinicDTO.getAddress());
            if (!(uniqueClinic.isEmpty())) {
                throw new NotValidParamsException("Already exists");
            }

            Clinic newClinic = new Clinic();

            newClinic.setName(clinicDTO.getName());
            newClinic.setAddress(clinicDTO.getAddress());
            newClinic.setDescription(clinicDTO.getDescription());
            newClinic.setReview(0);
            newClinic.setReviewCount(0);
            newClinic.setClinicalCenter(adminCC.getClinicalCenter());

            clinicRepository.save(newClinic);

            ClinicDTO newClinicDTO = new ClinicDTO(newClinic);

            return newClinicDTO;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public ClinicDTO getClinicByAdmin(Long adminId) {
        Clinic clinic = clinicRepository.findByDoctorId(adminId).orElseThrow(NotExistsException::new);
        return new ClinicDTO(clinic);
    }

    @Override
    public ClinicDTO save(ClinicDTO clinicRequest){
        Clinic clinic = clinicRepository.findById(clinicRequest.getId()).orElseThrow(NotExistsException::new);
        clinic.setName(clinicRequest.getName());
        clinic.setAddress(clinicRequest.getAddress());
        clinic.setDescription(clinicRequest.getDescription());

        clinicRepository.save(clinic);

        return new ClinicDTO(clinic);
    }
}
