package com.proj.medicalClinic;

import com.proj.medicalClinic.cron.AutoScheduler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableAsync
@EnableScheduling
@EnableTransactionManagement
public class MedicalClinicApplication {

	public static void main(String[] args) {

		SpringApplication.run(MedicalClinicApplication.class, args);
	}


}
