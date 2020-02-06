package com.proj.medicalClinic.service;

import com.proj.medicalClinic.dto.*;
import com.proj.medicalClinic.model.Appointment;

import java.util.Date;
import java.util.List;

public interface AppointmentService {

    List<AppointmentDTO> getAllByOperationRoom(Long id);
  
    List<AppointmentHistoryDTO> getAllByPatient(Long id);
  
    List<AppointmentDTO> getAllAppointmentRequests();
  
    List<AppointmentHistoryDTO> getAllAppointmentsByMedicalStaffMember(String email);
  
    List<Appointment> getAllDayBeforeAndDayAfter(Date before, Date after);
  
    AppointmentDTO addRoom(Long appointmentId, Long roomId);
  
    AppointmentDTO changeDateAndAddRoom(AppointmentRequestDTO appointmentRequestDTO);
  
    void cronAddRooms();
  
    AppointmentDTO changeDoctorAndAddRoom(ChangeDoctorRequestDTO changeDoctorRequestDTO);

    List<AppointmentDTO> getAllHeldBetweenNowAndEnd(ClinicReviewRequestDTO interval);

    // tries to reserv appointemnt for selected date and time and doctor if he is free
    void reserveExaminationForPatient(Long selected_date, int hours, int minutes, Long doc_id, Long service_id);

    void addOperationRoom(Long appointmentId, Long roomId, List<Long> doctorsId);

    void addChangedOperationRoom(Long appointmentId, Long roomId, List<Long> doctorsId, Long start);

}
