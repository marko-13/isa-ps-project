package com.proj.medicalClinic;

import com.proj.medicalClinic.controller.AppUserControllerTest;
import com.proj.medicalClinic.repository.AppointmentRepositoryTest;
import com.proj.medicalClinic.repository.DoctorRepositoryTest;
import com.proj.medicalClinic.repository.LeaveRepositoryTest;
import com.proj.medicalClinic.repository.OperationRoomTest;
import com.proj.medicalClinic.service.AppUserServiceTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@RunWith(Suite.class)
@Suite.SuiteClasses({AppointmentRepositoryTest.class, DoctorRepositoryTest.class, LeaveRepositoryTest.class, OperationRoomTest.class})
public class TestSuite {
}

