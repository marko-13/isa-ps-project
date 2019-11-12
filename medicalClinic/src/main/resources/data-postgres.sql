insert into clinical_center (id, diagnosis, drugs) values ('e43ac7d8-ebb1-4118-aa15-6d096619fc28', 'FEVER', 'BRUFEN');


insert into clinic (id, address, description, name, review, clinical_center_id, review_count)
values ('3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', 'Bulevar Oslobodjenja 50', 'Jako lepa klinika', 'Svetlost', 9, 'e43ac7d8-ebb1-4118-aa15-6d096619fc28', 7);



insert into app_user (type, id, user_role, email, password, name, last_name, JMBG)
values ('P', '5797f167-1aac-4e18-810e-92ca53b95d35', 'PATIENT', 'Miljana@gmail.com', 'miljana', 'Miljana', 'Vlahovic', '1710463172556');

insert into app_user (type, id, user_role, email, password, name, last_name, JMBG)
values ('P', '6d55e40a-f84d-4279-ab8f-60218c0d96c2', 'PATIENT', 'Vlatko@gmail.com', 'vlatko', 'Vlatko', 'Tomcic', '8773483494930');

insert into app_user (type, id, user_role, email, password, name, last_name, JMBG)
values ('P', 'a0c02caa-3ad9-4855-9605-2119f48235bc', 'PATIENT', 'Djordje@gmail.com', 'djordje', 'Djordje', 'Babic', '0881736727645');

insert into app_user (type, id, user_role, email, password, name, last_name, review, shift, review_count)
values ('DR', 'c15f647f-2274-4646-abd3-6d166c56fe12', 'DOCTOR', 'Vladan@gmail.com', 'vladan', 'Vladan', 'Dragic', 3, 1, 2);

insert into app_user (type, id, user_role, email, password, name, last_name, review, shift, review_count)
values ('DR', '97abc2e7-8842-4370-818c-a763c78249fd', 'DOCTOR', 'Dusko@gmail.com', 'dusko', 'Dusko', 'Jovanovic', 10, 2, 15);

insert into app_user (type, id, user_role, email, password, name, last_name, review, shift, review_count)
values ('DR', '0b01295a-f959-43c8-bf10-3512db2b0aa1', 'DOCTOR', 'Sara@gmail.com', 'sara', 'Sara', 'Loncar', 6, 3, 9);

insert into app_user (type, id, user_role, email, password, name, last_name, shift)
values ('NR', '64b096ac-8018-4b00-b0da-703383ffdb59', 'NURSE', 'Sergej@gmail.com', 'sergej', 'Sergej', 'Tomic', 1);

insert into app_user (type, id, user_role, email, password, name, last_name, shift)
values ('NR', '95637ee2-2245-48d0-a890-65e65a71ca8c', 'NURSE', 'Djordje@gmail.com', 'djordje', 'Djordje', 'Jankovic', 2);

insert into app_user (type, id, user_role, email, password, name, last_name, shift)
values ('NR', 'd211b088-9a49-491f-9f6e-5cfb10713d31', 'NURSE', 'Nevena@gmail.com', 'nevena', 'Nevena', 'Mihailovic', 3);

insert into app_user (type, id, user_role, email, password, name, last_name, clinic_id)
values ('AC', '9d01fa71-a653-420f-a07d-c41fdd61078c', 'ADMINCLINIC', 'Anastasija@gmail.com', 'anastasija', 'Anastasija', 'Milosevic', '3e5a125b-6d84-44b9-a8cf-2a83ea9ce572');

insert into app_user (type, id, user_role, email, password, name, last_name, clinical_center_id)
values ('ACC', '2f227c0c-1ab0-4d6e-9aaf-a98283ad0489', 'ADMINCLINICALCENTER', 'Radoslav@gmail.com', 'radoslav', 'Radoslav', 'Brankovic', 'e43ac7d8-ebb1-4118-aa15-6d096619fc28');



insert into clinics_patients (clinic_id, patient_id)
values ('3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', '5797f167-1aac-4e18-810e-92ca53b95d35');

insert into clinics_patients (clinic_id, patient_id)
values ('3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', '6d55e40a-f84d-4279-ab8f-60218c0d96c2');

insert into clinics_patients (clinic_id, patient_id)
values ('3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', 'a0c02caa-3ad9-4855-9605-2119f48235bc');




insert into service (id, price, service_type)
values ('520f83d7-a49d-4906-9ecb-7353a1971bf3', 2000, 'Vadjene zuba');

insert into service (id, price, service_type)
values ('7ff637dc-6f17-4976-9bb8-e892a920c907', 3500, 'Vadjenje srca');

insert into service (id, price, service_type)
values ('e2ae5e2e-55a3-41d4-ad52-02bbffae82fb', 15000, 'Skeniranje glave');





insert into operation_room (id, name, number, clinic_id)
values ('1067f9a4-33c0-44f4-8052-5cb43036469e', 'Operaciona sala', 108, '3e5a125b-6d84-44b9-a8cf-2a83ea9ce572');

insert into operation_room (id, name, number, clinic_id)
values ('3b968fb9-a9ab-48f7-b930-d03bff498705', 'Operaciona sala', 100, '3e5a125b-6d84-44b9-a8cf-2a83ea9ce572');

insert into operation_room (id, name, number, clinic_id)
values ('496f22fa-e549-421e-b7c7-223319bbe32c', 'Ordinacija', 10, '3e5a125b-6d84-44b9-a8cf-2a83ea9ce572');

insert into operation_room (id, name, number, clinic_id)
values ('b7035601-f3b9-49e2-8c24-f8c1a0146d55', 'Ordinacija', 15, '3e5a125b-6d84-44b9-a8cf-2a83ea9ce572');





insert into appointment (type, id, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('EX', 'c0f06708-9c51-4926-aa7e-b72d13697dba', '12-10-2019', 60, true, '3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', 'c15f647f-2274-4646-abd3-6d166c56fe12', null, null, '520f83d7-a49d-4906-9ecb-7353a1971bf3', '1067f9a4-33c0-44f4-8052-5cb43036469e');

insert into appointment (type, id, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('EX', '50a91f30-bdb6-4960-8f32-38ab6d7ef024', '12-9-2019', 45, false, '3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', '97abc2e7-8842-4370-818c-a763c78249fd', '64b096ac-8018-4b00-b0da-703383ffdb59', '5797f167-1aac-4e18-810e-92ca53b95d35', '7ff637dc-6f17-4976-9bb8-e892a920c907', '3b968fb9-a9ab-48f7-b930-d03bff498705');

insert into appointment (type, id, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('OP', '989d9b7e-a4d9-4bd3-bfde-d24c19e8732d', '12-5-2019', 120, false, '3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', '0b01295a-f959-43c8-bf10-3512db2b0aa1', 'd211b088-9a49-491f-9f6e-5cfb10713d31', 'a0c02caa-3ad9-4855-9605-2119f48235bc', 'e2ae5e2e-55a3-41d4-ad52-02bbffae82fb', '496f22fa-e549-421e-b7c7-223319bbe32c');

insert into appointment (type, id, date, duration, fast, clinic_id, doctor_id, nurse_id, patient_id, service_id, operation_room_id)
values ('OP', '732ef647-6547-4a0e-806f-b9a75860aa38', '12-1-2019', 90, false, '3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', 'c15f647f-2274-4646-abd3-6d166c56fe12', 'd211b088-9a49-491f-9f6e-5cfb10713d31', '5797f167-1aac-4e18-810e-92ca53b95d35', '7ff637dc-6f17-4976-9bb8-e892a920c907', 'b7035601-f3b9-49e2-8c24-f8c1a0146d55');





insert into clinics_services (clinic_id, service_id)
values ('3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', '520f83d7-a49d-4906-9ecb-7353a1971bf3');

insert into clinics_services (clinic_id, service_id)
values ('3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', '7ff637dc-6f17-4976-9bb8-e892a920c907');

insert into clinics_services (clinic_id, service_id)
values ('3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', 'e2ae5e2e-55a3-41d4-ad52-02bbffae82fb');




insert into doctors_operations (doctor_id, operation_id)
values ('97abc2e7-8842-4370-818c-a763c78249fd', '989d9b7e-a4d9-4bd3-bfde-d24c19e8732d');

insert into doctors_operations (doctor_id, operation_id)
values ('c15f647f-2274-4646-abd3-6d166c56fe12', '732ef647-6547-4a0e-806f-b9a75860aa38');




insert into doctors_services (doctor_id, service_id)
values ('c15f647f-2274-4646-abd3-6d166c56fe12', '520f83d7-a49d-4906-9ecb-7353a1971bf3');

insert into doctors_services (doctor_id, service_id)
values ('97abc2e7-8842-4370-818c-a763c78249fd', '7ff637dc-6f17-4976-9bb8-e892a920c907');

insert into doctors_services (doctor_id, service_id)
values ('0b01295a-f959-43c8-bf10-3512db2b0aa1', '520f83d7-a49d-4906-9ecb-7353a1971bf3');

insert into doctors_services (doctor_id, service_id)
values ('0b01295a-f959-43c8-bf10-3512db2b0aa1', '7ff637dc-6f17-4976-9bb8-e892a920c907');

insert into doctors_services (doctor_id, service_id)
values ('0b01295a-f959-43c8-bf10-3512db2b0aa1', 'e2ae5e2e-55a3-41d4-ad52-02bbffae82fb');




insert into leave (id, date_end, date_start, doctor_id, nurse_id)
values ('05434a80-99e8-4753-8f39-7c5860720646', '5-5-2020', '5-11-2020', 'c15f647f-2274-4646-abd3-6d166c56fe12', null);

insert into leave (id, date_end, date_start, doctor_id, nurse_id)
values ('116b92c6-7e6a-494f-ad39-30cf5c0940d7', '8-8-2020', '8-12-2020', '97abc2e7-8842-4370-818c-a763c78249fd', null);

insert into leave (id, date_end, date_start, doctor_id, nurse_id)
values ('d1f7c108-f820-4ceb-8b14-eb3176a75c50', '2-10-2020', '2-12-2020', null, '95637ee2-2245-48d0-a890-65e65a71ca8c');





insert into medical_history (allergy, blood_type, dioptre, height, weight, patient_id)
values ('kikiriki', 'AP', null, 190, null, '6d55e40a-f84d-4279-ab8f-60218c0d96c2');

insert into medical_history (allergy, blood_type, dioptre, height, weight, patient_id)
values ('penicilin', 'BM', 1, 181, 70, '5797f167-1aac-4e18-810e-92ca53b95d35');

insert into medical_history (allergy, blood_type, dioptre, height, weight, patient_id)
values ('alkohol, boranija', 'ABP', -1, 189, 80, 'a0c02caa-3ad9-4855-9605-2119f48235bc');



insert into prescription (id, nurse_id)
values ('e942b17d-e096-45c8-842e-9cad6054393a', '64b096ac-8018-4b00-b0da-703383ffdb59');

insert into prescription (id, nurse_id)
values ('87351252-b979-4b5c-a3db-e121b1d4d4bf', 'd211b088-9a49-491f-9f6e-5cfb10713d31');

insert into prescription (id, nurse_id)
values ('96e2c589-c076-4634-a86c-4fe21af89dc0', '64b096ac-8018-4b00-b0da-703383ffdb59');



insert into medical_report (diagnosis, exam_description, prescription_id, examination_id, medical_history_id)
values ('FEVER', 'Veoma lose, ali bice bolje', 'e942b17d-e096-45c8-842e-9cad6054393a', '50a91f30-bdb6-4960-8f32-38ab6d7ef024', '5797f167-1aac-4e18-810e-92ca53b95d35');
