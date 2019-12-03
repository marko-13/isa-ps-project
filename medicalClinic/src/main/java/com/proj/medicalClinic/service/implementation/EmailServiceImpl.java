package com.proj.medicalClinic.service.implementation;

import com.proj.medicalClinic.model.AppUser;
import com.proj.medicalClinic.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {

//    @Autowired
//    private JavaMailSender javaMailSender;
    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("isa.psw.tim17@gmail.com");
        mailSender.setPassword("krokodil123");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

    /*
     * Koriscenje klase za ocitavanje vrednosti iz application.properties fajla
     */
    @Autowired
    private Environment env;

    @Override
    public void sendNotificaitionAsync(AppUser user) throws MailException, InterruptedException {
        System.out.println("Slanje emaila...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("marko07031997@gmail.com");
        mail.setFrom(env.getProperty("isa.psw.tim17@gmail.com"));
        mail.setSubject("Account activation");
        if(user.isEnabled()) {
            mail.setText("Hello " + user.getName() + " " + user.getLastName() + ",\n\nYour account has been successfully activated.");
        }
        else{
            mail.setText("Hello " + user.getName() + " " + user.getLastName() + ",\n\nYour acount was declined.");
        }
        getJavaMailSender().send(mail);

        System.out.println("Email poslat!");

    }
}
