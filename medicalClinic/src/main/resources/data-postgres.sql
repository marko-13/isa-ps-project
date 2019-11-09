insert into clinical_center (id, diagnosis, drugs) values ('e43ac7d8-ebb1-4118-aa15-6d096619fc28', 'FEVER', 'BRUFEN');

insert into clinic (id, address, description, name, review, clinical_center_id)
values ('3e5a125b-6d84-44b9-a8cf-2a83ea9ce572', 'Bulevar Oslobodjenja 50', 'Jako lepa klinika', 'Svetlost', 9, 'e43ac7d8-ebb1-4118-aa15-6d096619fc28');


insert into app_user (type, id, user_role, email, password, name, last_name, JMBG)
values ('P', '5797f167-1aac-4e18-810e-92ca53b95d35', 'PATIENT', 'Miljana@gmail.com', 'miljana', 'Miljana', 'Vlahovic', '1710463172556');

insert into app_user (type, id, user_role, email, password, name, last_name, JMBG)
values ('P', '6d55e40a-f84d-4279-ab8f-60218c0d96c2', 'PATIENT', 'Vlatko@gmail.com', 'vlatko', 'Vlatko', 'Tomcic', '8773483494930');

insert into app_user (type, id, user_role, email, password, name, last_name, JMBG)
values ('P', 'a0c02caa-3ad9-4855-9605-2119f48235bc', 'PATIENT', 'Djordje@gmail.com', 'djordje', 'Djordje', 'Babic', '0881736727645');

insert into app_user (type, id, user_role, email, password, name, last_name, review, shift)
values ('DR', 'c15f647f-2274-4646-abd3-6d166c56fe12', 'DOCTOR', 'Vladan@gmail.com', 'vladan', 'Vladan', 'Dragic', 3, 1);

insert into app_user (type, id, user_role, email, password, name, last_name, review, shift)
values ('DR', '97abc2e7-8842-4370-818c-a763c78249fd', 'DOCTOR', 'Dusko@gmail.com', 'dusko', 'Dusko', 'Jovanovic', 10, 2);

insert into app_user (type, id, user_role, email, password, name, last_name, review, shift)
values ('DR', '0b01295a-f959-43c8-bf10-3512db2b0aa1', 'DOCTOR', 'Sara@gmail.com', 'sara', 'Sara', 'Loncar', 6, 3);

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

