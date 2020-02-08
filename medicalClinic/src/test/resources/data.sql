-- insert clinical centers into database
insert into clinical_center (name) values ('Clinical center 1');


-- insert clinics into database
insert into clinic (address, description, name, review, clinical_center_id, review_count)
values ('Bulevar Oslobodjenja 50', 'Klinika 1', 'Broj jedan', 28, 1, 7);

insert into clinic (address, description, name, review, clinical_center_id, review_count)
values ('Bulevar Oslobodjenja 80', 'Klinika 2', 'Broj dva', 35, 1, 7);


-- insert app users into database
insert into app_user (type, user_role, email, password, name, last_name, JMBG, enabled, adress, city, state, mobile, rejected, deleted, last_password_reset_date, enabled_patient)
values ('P', 'PATIENT', 'Miljana@mailinator.com', '$2a$10$hMz0Q7JhystsRnek6D3bLO5mRGU2yPril7EVfLkeqwAUh0JWQYabq', 'Miljana', 'Vlahovic', '1710463172556', true, 'Adresa1', 'Grad1', 'Drzava1', '111', false, false, '2020-01-10 19:43:44.503', true);

insert into app_user (type, user_role, email, password, name, last_name, JMBG, enabled, adress, city, state, mobile, rejected, deleted, last_password_reset_date, enabled_patient)
values ('P', 'PATIENT', 'Vlatko@mailinator.com', '$2a$10$oJ4.32dhcYqQAWcqlGYUW.rMBIO3fyhHnyLD4rtnrEKlUqisRexda', 'Vlatko', 'Tomcic', '8773483494930', true, 'Adresa2', 'Grad2', 'Drzava2', '222', false, false, '2020-01-10 19:43:44.503', true);

insert into app_user (type, user_role, email, password, name, last_name, review, shift, review_count, enabled, adress, city, state, mobile, rejected, deleted, last_password_reset_date, enabled_patient, clinic_id)
values ('DR', 'DOCTOR', 'Vladan@mailinator.com', '$2a$10$EcjftqmPpW.usBG8k4OMWOqEo9LA9QMBaEy8XFbZCNBY9oY..jd62', 'Vladan', 'Dragic', 9, 1, 2, true, 'Adresa3', 'Grad3', 'Drzava3', '333', false, false, '2020-01-10 19:43:44.503', true, 1);

insert into app_user (type, user_role, email, password, name, last_name, review, shift, review_count, enabled, adress, city, state, mobile, rejected, deleted, last_password_reset_date, enabled_patient, clinic_id)
values ('DR', 'DOCTOR', 'Dusko@mailinator.com', '$2y$10$XbVPhmbyDT28Yp6v8BMLCeLUpmS3FtHNWhUHCIieJ2oQT0MXuK.66', 'Dusko', 'Jovanovic', 56, 2, 15, true, 'Adresa4', 'Grad4', 'Drzava4', '4444', false, false, '2020-01-10 19:43:44.503', true, 2);

insert into app_user (type, user_role, email, password, name, last_name, shift, enabled, adress, city, state, mobile, rejected, deleted, last_password_reset_date, enabled_patient, clinic_id)
values ('NR', 'NURSE', 'Sergej@mailinator.com', '$2a$10$Gd7bGnGZroF.ckbJDE1efu7C.tENXHDkS7CCNwV8IWKWTfSm/7Hx.', 'Sergej', 'Tomic', 1, true, 'Adresa7', 'Grad7', 'Drzava7', '777', false, false, '2020-01-10 19:43:44.503', true, 1);

insert into app_user (type, user_role, email, password, name, last_name, shift, enabled, adress, city, state, mobile, rejected, deleted, last_password_reset_date, enabled_patient, clinic_id)
values ('NR', 'NURSE', 'Djordje@mailinator.com', '$2a$10$cnczzGv7KfqoDAXP.9UdnOfs6GRUH3MSFUb.Fd1FxUc2nxN9IMhte', 'Djordje', 'Jankovic', 2, true, 'Adresa8', 'Grad8', 'Drzava8', '888', false, false, '2020-01-10 19:43:44.503', true, 2);

insert into app_user (type, user_role, email, password, name, last_name, clinic_id, enabled, adress, city, state, mobile, rejected, deleted, last_password_reset_date, enabled_patient)
values ('AC', 'ADMINCLINIC', 'Anastasija@mailinator.com', '$2a$10$nE7tHqDVIG5P6NcGPOgTk.a/KRMhDm0puU6PJjT3nH3dam2EnUKj2', 'Anastasija', 'Milosevic', 1, true, 'Adresa10', 'Grad10', 'Drzava10', '1010', false, false, '2020-01-10 19:43:44.503', true);

insert into app_user (type, user_role, email, password, name, last_name, clinical_center_id, enabled, adress, city, state, mobile, rejected,deleted, last_password_reset_date, enabled_patient)
values ('ACC', 'ADMINCLINICALCENTER', 'Radoslav@mailinator.com', '$2a$10$PpuFaY9yRRdUj9l4lr7sueTutLXXWxlgGRomEFH2lNQRYhiGwlMmS', 'Radoslav', 'Brankovic', 1, true, 'Adresa11', 'Grad11', 'Drzava11', '1111', false, false, '2020-01-10 19:43:44.503', true);


-- insert patients and clinics they have visited into database
insert into clinics_patients (clinic_id, patient_id)
values (1, 1);

insert into clinics_patients (clinic_id, patient_id)
values (2, 2);


-- insert service into database
insert into service (price, service_type, deleted)
values (2000, 'Vadjene zuba', false);

insert into service (price, service_type, deleted)
values (3500, 'Vadjenje srca', false);

insert into service (price, service_type, deleted)
values (15000, 'Skeniranje glave', false);


-- insert operation rooms into database
insert into operation_room (name, number, clinic_id, deleted)
values ('Operaciona sala', 108, 1, false);

insert into operation_room (name, number, clinic_id, deleted)
values ('Operaciona sala', 100, 1, false);

insert into operation_room (name, number, clinic_id, deleted)
values ('Ordinacija', 10, 2, false);


-- insert appointemnts into database
insert into appointment (type, date, duration, fast, clinic_id, nurse_id, patient_id, service_id, operation_room_id, held, confirmed)
values ('EX', '2019-12-10', 60, true, 1, 5, null, 1, 1, true, 2);

insert into appointment (type, date, duration, fast, clinic_id, nurse_id, patient_id, service_id, operation_room_id, held, confirmed)
values ('EX', '2020-12-10', 60, true, 1, 6, null, 1, 1, false, 1);

insert into appointment (type, date, duration, fast, clinic_id, nurse_id, patient_id, service_id, operation_room_id, held, confirmed)
values ('EX', '2019-9-12', 45, false, 1, 7, 1, 2, 2, true, 1);

insert into appointment (type, date, duration, fast, clinic_id, nurse_id, patient_id, service_id, operation_room_id, held, confirmed)
values ('OP', '2019-5-12', 120, false, 1, null, 2, 3, 2, true, 2);

insert into appointment (type, date, duration, fast, clinic_id, nurse_id, patient_id, service_id, operation_room_id, held, confirmed)
values ('OP', '2019-1-12', 90, false, 1, null, 1, 2, 2, true, 2);


-- merge doctors and examinations
insert into doctors_examinations(doctor_id, examination_id)
values (4, 1);

insert into doctors_examinations(doctor_id, examination_id)
values (4, 2);

insert into doctors_examinations(doctor_id, examination_id)
values(3, 3);



insert into doctors_operations (doctor_id, operation_id)
values (4, 4);

insert into doctors_operations (doctor_id, operation_id)
values (3, 5);


insert into clinics_services (clinic_id, service_id)
values (1, 1);

insert into clinics_services (clinic_id, service_id)
values (1, 2);

insert into clinics_services (clinic_id, service_id)
values (1, 3);

insert into clinics_services (clinic_id, service_id)
values (2, 1);

insert into clinics_services (clinic_id, service_id)
values (2, 2);

insert into clinics_services (clinic_id, service_id)
values (2, 3);



insert into doctors_services (doctor_id, service_id)
values (4, 1);

insert into doctors_services (doctor_id, service_id)
values (3, 2);

insert into doctors_services (doctor_id, service_id)
values (4, 3);

insert into doctors_services (doctor_id, service_id)
values (3, 1);





insert into leave (date_start, date_end, doctor_id, nurse_id, approved, active)
values ('2020-5-5', '2020-11-5', null, 5, false, true);

insert into leave (date_start, date_end, doctor_id, nurse_id, approved, active)
values ('2020-5-5', '2020-11-5', 4, null, false, true);

insert into leave (date_start, date_end, doctor_id, nurse_id, approved, active)
values ('2020-8-8', '2020-12-8', 3, null, false, true);

insert into leave (date_start, date_end, doctor_id, nurse_id, approved, active)
values ('2020-10-2', '2020-12-2', null, 6, false, true);

insert into leave (date_start, date_end, doctor_id, nurse_id, approved, active)
values ('2020-1-1', '2030-12-12', 4, null, false, true);



insert into authority (name)
values ('PATIENT');

insert into authority (name)
values ('DOCTOR');

insert into authority (name)
values ('NURSE');

insert into authority (name)
values ('ADMINCLINIC');

insert into authority (name)
values ('ADMINCLINICALCENTER');



insert into user_authority (user_id, authority_id)
values (1, 1);

insert into user_authority (user_id, authority_id)
values (2, 1);

insert into user_authority (user_id, authority_id)
values (3, 2);

insert into user_authority (user_id, authority_id)
values (4, 2);

insert into user_authority (user_id, authority_id)
values (5, 3);

insert into user_authority (user_id, authority_id)
values (6, 3);

insert into user_authority (user_id, authority_id)
values (7, 4);

insert into user_authority (user_id, authority_id)
values (8, 5);



insert into medical_history (allergy, blood_type, dioptre, height, weight, patient_id)
values ('kikiriki', 'AP', 1, 190, 60, 1);

insert into medical_history (allergy, blood_type, dioptre, height, weight, patient_id)
values ('penicilin', 'BM', 1, 181, 70, 2);





insert into prescription (approved, nurse_id)
values (False, 5);

insert into prescription (approved, nurse_id)
values (False, 6);

insert into prescription (approved, nurse_id)
values (False, 5);



insert into diagnosis_registry (diagnosis_name)
values ('Fever');

insert into diagnosis_registry (diagnosis_name)
values ('Cold');

insert into diagnosis_registry (diagnosis_name)
values ('Flu');



insert into medical_report (exam_description, prescription_id, examination_id, medical_history_id)
values ('Veoma lose, ali bice bolje', 1, 1, 1);

insert into medical_report (exam_description, prescription_id, examination_id, medical_history_id)
values ('Ok', 2, 2, 2);



insert into medical_report_diagnosis (mreport_id, diagnosis_id)
values (1, 1);

insert into medical_report_diagnosis (mreport_id, diagnosis_id)
values (2, 2);




insert into drugs_registry (drug_name)
values ('Brufen');

insert into drugs_registry (drug_name)
values ('Xanax');

insert into drugs_registry (drug_name)
values ('Strepsils');

insert into drugs_registry (drug_name)
values ('PreP');


insert into prescription_drugs ( prescription_id, drug_id)
values (1, 1);

insert into prescription_drugs( prescription_id, drug_id)
values (1, 2);

insert into prescription_drugs ( prescription_id, drug_id)
values (3, 3);