package com.proj.medicalClinic.service;

import com.proj.medicalClinic.model.AppUser;
import org.springframework.mail.MailException;

public interface EmailService {

     void sendNotificaitionAsync(AppUser user, String msg) throws MailException, InterruptedException;
     void sendNotificaitionAsync(AppUser user, String msg, String subject) throws MailException, InterruptedException;
}
