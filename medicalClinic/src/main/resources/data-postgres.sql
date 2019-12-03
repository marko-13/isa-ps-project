insert into clinical_center (diagnosis, drugs) values ('FEVER', 'BRUFEN');


insert into clinic (address, description, name, review, clinical_center_id, review_count)
values ('Bulevar Oslobodjenja 50', 'Jako lepa klinika', 'Svetlost', 9, 1, 7);


insert into app_user (type, user_role, email, password, name, last_name, JMBG, enabled)
values ('P', 'PATIENT', 'Miljana@gmail.com', '$2a$10$hMz0Q7JhystsRnek6D3bLO5mRGU2yPril7EVfLkeqwAUh0JWQYabq', 'Miljana', 'Vlahovic', '1710463172556', true);

insert into app_user (type, user_role, email, password, name, last_name, JMBG, enabled)
values ('P', 'PATIENT', 'Vlatko@gmail.com', '$2a$10$oJ4.32dhcYqQAWcqlGYUW.rMBIO3fyhHnyLD4rtnrEKlUqisRexda', 'Vlatko', 'Tomcic', '8773483494930', false);

insert into app_user (type, user_role, email, password, name, last_name, JMBG, enabled)
values ('P', 'PATIENT', 'Frustuk@gmail.com', '$2a$10$eZFvWClzdfGfgvmKDjEmvewURZTW0Hl26OH0GH9eUdosD9RVqgchq', 'Frustuk', 'Jeltako', '0881736727645', true);

insert into app_user (type, user_role, email, password, name, last_name, review, shift, review_count, enabled)
values ('DR', 'DOCTOR', 'Vladan@gmail.com', '$2a$10$EcjftqmPpW.usBG8k4OMWOqEo9LA9QMBaEy8XFbZCNBY9oY..jd62', 'Vladan', 'Dragic', 3, 1, 2, true);

insert into app_user (type, user_role, email, password, name, last_name, review, shift, review_count, enabled)
values ('DR', 'DOCTOR', 'Dusko@gmail.com', '$2a$10$EcjftqmPpW.usBG8k4OMWOqEo9LA9QMBaEy8XFbZCNBY9oY..jd62', 'Dusko', 'Jovanovic', 10, 2, 15, true);

insert into app_user (type, user_role, email, password, name, last_name, review, shift, review_count, enabled)
values ('DR', 'DOCTOR', 'Sara@gmail.com', '$2a$10$IzuVyeH5cKEw5c17WO2H1OuLMKVN2.2FjjP8e3S.RyNvPNdqUSAKe', 'Sara', 'Loncar', 6, 3, 9, true);

insert into app_user (type, user_role, email, password, name, last_name, shift, enabled)
values ('NR', 'NURSE', 'Sergej@gmail.com', '$2a$10$Gd7bGnGZroF.ckbJDE1efu7C.tENXHDkS7CCNwV8IWKWTfSm/7Hx.', 'Sergej', 'Tomic', 1, true);

insert into app_user (type, user_role, email, password, name, last_name, shift, enabled)
values ('NR', 'NURSE', 'Djordje@gmail.com', '$2a$10$cnczzGv7KfqoDAXP.9UdnOfs6GRUH3MSFUb.Fd1FxUc2nxN9IMhte', 'Djordje', 'Jankovic', 2, true);

insert into app_user (type, user_role, email, password, name, last_name, shift, enabled)
values ('NR', 'NURSE', 'Nevena@gmail.com', '$2a$10$cK5DzdYh6eVs7ZTW0uepRe6Rm00HaX.0o1E95JQCVq8FvSlh/IEa.', 'Nevena', 'Mihailovic', 3, true);

insert into app_user (type, user_role, email, password, name, last_name, clinic_id, enabled)
values ('AC', 'ADMINCLINIC', 'Anastasija@gmail.com', '$2a$10$nE7tHqDVIG5P6NcGPOgTk.a/KRMhDm0puU6PJjT3nH3dam2EnUKj2', 'Anastasija', 'Milosevic', 1, true);

insert into app_user (type, user_role, email, password, name, last_name, clinical_center_id, enabled)
values ('ACC', 'ADMINCLINICALCENTER', 'Radoslav@gmail.com', '$2a$10$PpuFaY9yRRdUj9l4lr7sueTutLXXWxlgGRomEFH2lNQRYhiGwlMmS', 'Radoslav', 'Brankovic', 1, true);


insert into clinics_patients (clinic_id, patient_id)
values (1, 1);

insert into clinics_patients (clinic_id, patient_id)
values (1, 2);

insert into clinics_patients (clinic_id, patient_id)
values (1, 3);




insert into service (price, service_type)
values (2000, 'Vadjene zuba');

insert into service (price, service_type)
values (3500, 'Vadjenje srca');

insert into service (price, service_type)
values (15000, 'Skeniranje glave');





insert into operation_room (name, number, clinic_id)
values ('Operaciona sala', 108, 1);

insert into operation_room (name, number, clinic_id)
values ('Operaciona sala', 100, 1);

insert into operation_room (name, number, clinic_id)
values ('Ordinacija', 10, 1);

insert into operation_room (name, number, clinic_id)
values ('Ordinacija', 15, 1);





insert into appointment (type, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('EX', '12-10-2019', 60, true, 1, 4, null, null, 1, 1);

insert into appointment (type, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('EX', '12-9-2019', 45, false, 1, 5, 7, 1, 2, 2);

insert into appointment (type, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('OP', '12-5-2019', 120, false, 1, 6, 8, 2, 3, 3);

insert into appointment (type, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('OP', '12-1-2019', 90, false, 1, 4, 8, 1, 2, 4);

insert into appointment (type, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('EX', '12-8-2019', 50, false, 1, 5, 7, 1, 2, 2);

insert into appointment (type, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('EX', '12-7-2019', 55, false, 1, 6, 7, 2, 2, 2);




insert into clinics_services (clinic_id, service_id)
values (1, 1);

insert into clinics_services (clinic_id, service_id)
values (1, 2);

insert into clinics_services (clinic_id, service_id)
values (1, 3);




insert into doctors_operations (doctor_id, operation_id)
values (6, 3);

insert into doctors_operations (doctor_id, operation_id)
values (4, 4);




insert into doctors_services (doctor_id, service_id)
values (4, 1);

insert into doctors_services (doctor_id, service_id)
values (5, 2);

insert into doctors_services (doctor_id, service_id)
values (6, 3);

insert into doctors_services (doctor_id, service_id)
values (6, 3);

insert into doctors_services (doctor_id, service_id)
values (6, 3);




insert into leave (date_end, date_start, doctor_id, nurse_id)
values ('5-5-2020', '5-11-2020', 4, null);

insert into leave (date_end, date_start, doctor_id, nurse_id)
values ('8-8-2020', '8-12-2020', 5, null);

insert into leave (date_end, date_start, doctor_id, nurse_id)
values ('2-10-2020', '2-12-2020', null, 7);



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
values (3, 1);

insert into user_authority (user_id, authority_id)
values (4, 2);

insert into user_authority (user_id, authority_id)
values (5, 2);

insert into user_authority (user_id, authority_id)
values (6, 2);

insert into user_authority (user_id, authority_id)
values (7, 3);

insert into user_authority (user_id, authority_id)
values (8, 3);

insert into user_authority (user_id, authority_id)
values (9, 3);

insert into user_authority (user_id, authority_id)
values (10, 4);

insert into user_authority (user_id, authority_id)
values (11, 5);


insert into medical_history (allergy, blood_type, dioptre, height, weight, patient_id)
values ('kikiriki', 'AP', 1, 190, 60, 1);

insert into medical_history (allergy, blood_type, dioptre, height, weight, patient_id)
values ('penicilin', 'BM', 1, 181, 70, 2);

insert into medical_history (allergy, blood_type, dioptre, height, weight, patient_id)
values ('alkohol, boranija', 'ABP', -1, 189, 80, 3);



insert into prescription (approved, nurse_id)
values (False, 7);

insert into prescription (approved, nurse_id)
values (False, 8);

insert into prescription (approved, nurse_id)
values (False, 7);


insert into medical_report (diagnosis, exam_description, prescription_id, examination_id, medical_history_id)
values ('FEVER', 'Veoma lose, ali bice bolje', 1, 2, 1);

insert into medical_report (diagnosis, exam_description, prescription_id, examination_id, medical_history_id)
values ('COLD', 'Ok', 2, 5, 1);

insert into medical_report (diagnosis, exam_description, prescription_id, examination_id, medical_history_id)
values ('FLU', 'Veoma ok', 3, 6, 2);


insert into prescription_drugs ( prescription_id, drug_id)
values (1, 'BRUFEN');

insert into prescription_drugs( prescription_id, drug_id)
values (1, 'XANAX');

insert into prescription_drugs ( prescription_id, drug_id)
values (3, 'STREPSILS');