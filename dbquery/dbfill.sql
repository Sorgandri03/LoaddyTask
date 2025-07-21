--team;
--have;
--require;
--task;
--employee;
--employer;
--skills;

INSERT INTO skills (name, description)
VALUES ('Java', 'Java programming language'),
       ('Python', 'Python programming language'),
       ('JavaScript', 'JavaScript programming language'),
       ('C++', 'C++ programming language'),
       ('SQL', 'SQL database language'),
       ('HTML', 'HTML markup language'),
       ('CSS', 'CSS stylesheet language'),
       ('PHP', 'PHP programming language'),
       ('Ruby', 'Ruby programming language'),
       ('Swift', 'Swift programming language');

INSERT INTO employer (name, surname, birthdate, cellphone, email, password)
VALUES ('John', 'Doe', '1980-01-01', '1234567890', 'john.doe@example.com', 'palle'),
       ('Jane', 'Smith', '1985-05-15', '0987654321', 'jane.smith@example.com', 'palle'),
       ('Alice', 'Johnson', '1990-07-20', '5555555555', 'alice.johnson@example.com', 'palle'),
       ('Bob', 'Brown', '1975-03-10', '1111111111', 'bob.brown@example.com', 'palle'),
       ('Charlie', 'Davis', '1982-11-30', '2222222222', 'charlie.davis@example.com', 'palle'),
       ('David', 'Evans', '1995-06-25', '3333333333', 'david.evans@example.com', 'palle'),
       ('Eve', 'Foster', '1988-09-12', '4444444444', 'eve.foster@example.com', 'palle'),
       ('Frank', 'Green', '1979-02-18', '6666666666', 'frank.green@example.com', 'palle'),
       ('Grace', 'Harris', '1993-04-22', '7777777777', 'grace.harris@example.com', 'palle'),
       ('Hank', 'Ivy', '1981-08-14', '8888888888', 'hank.ivy@example.com', 'palle'),
       ('Ivy', 'Jones', '1992-12-05', '9999999999', 'ivy.jones@example.com', 'palle'),
       ('Jack', 'King', '1984-07-07', '1010101010', 'jack.king@example.com', 'palle'),
       ('Karen', 'Lee', '1987-03-03', '1212121212', 'karen.lee@example.com', 'palle'),
       ('Leo', 'Morris', '1991-10-10', '1313131313', 'leo.morris@example.com', 'palle'),
       ('Mia', 'Nelson', '1983-05-20', '1414141414', 'mia.nelson@example.com', 'palle'),
       ('Nina', 'Owens', '1994-11-11', '1515151515', 'nina.owens@example.com', 'palle'),
       ('Oscar', 'Parker', '1986-06-06', '1616161616', 'oscar.parker@example.com', 'palle'),
       ('Paul', 'Quinn', '1978-09-09', '1717171717', 'paul.quinn@example.com', 'palle'),
       ('Quincy', 'Reed', '1996-01-01', '1818181818', 'quincy.reed@example.com', 'palle'),
       ('Rachel', 'Scott', '1989-02-02', '1919191919', 'rachel.scott@example.com', 'palle'),
       ('Sam', 'Taylor', '1997-03-03', '2020202020', 'sam.taylor@example.com', 'palle'),
       ('Tina', 'Upton', '1980-04-04', '2121212121', 'tina.upton@example.com', 'palle'),
       ('Uma', 'Vance', '1985-05-05', '2222222222', 'uma.vance@example.com', 'palle'),
       ('Victor', 'White', '1990-06-06', '2323232323', 'victor.white@example.com', 'palle'),
       ('Wendy', 'Xavier', '1982-07-07', '2424242424', 'wendy.xavier@example.com', 'palle'),
       ('Xander', 'Young', '1993-08-08', '2525252525', 'xander.young@example.com', 'palle'),
       ('Yara', 'Zimmer', '1981-09-09', '2626262626', 'yara.zimmer@example.com', 'palle'),
       ('Zane', 'Adams', '1992-10-10', '2727272727', 'zane.adams@example.com', 'palle'),
       ('Amy', 'Baker', '1984-11-11', '2828282828', 'amy.baker@example.com', 'palle'),
       ('Brian', 'Clark', '1995-12-12', '2929292929', 'brian.clark@example.com', 'palle');

INSERT INTO employee (name, surname, birthdate, cellphone, email, password)
VALUES ('Frank', 'Miller', '1988-06-15', '1111111111', 'frank.miller@example.com', 'palle'),
       ('Emily', 'Davis', '1992-03-22', '2222222222', 'emily.davis@example.com', 'palle'),
       ('Michael', 'Smith', '1985-04-10', '3333333333', 'michael.smith@example.com', 'palle'),
       ('Sarah', 'Johnson', '1990-07-19', '4444444444', 'sarah.johnson@example.com', 'palle'),
       ('David', 'Williams', '1983-11-05', '5555555555', 'david.williams@example.com', 'palle'),
       ('Laura', 'Brown', '1995-01-30', '6666666666', 'laura.brown@example.com', 'palle'),
       ('Robert', 'Jones', '1987-03-17', '7777777777', 'robert.jones@example.com', 'palle'),
       ('Olivia', 'Garcia', '1991-08-25', '8888888888', 'olivia.garcia@example.com', 'palle'),
       ('James', 'Martinez', '1989-12-12', '9999999999', 'james.martinez@example.com', 'palle'),
       ('Linda', 'Rodriguez', '1986-02-28', '1010101010', 'linda.rodriguez@example.com', 'palle'),
       ('William', 'Hernandez', '1984-04-04', '1112223333', 'william.hernandez@example.com', 'palle'),
       ('Barbara', 'Lopez', '1993-06-16', '2223334444', 'barbara.lopez@example.com', 'palle'),
       ('Christopher', 'Gonzalez', '1982-09-09', '3334445555', 'christopher.gonzalez@example.com', 'palle'),
       ('Patricia', 'Wilson', '1994-10-21', '4445556666', 'patricia.wilson@example.com', 'palle'),
       ('Daniel', 'Anderson', '1981-07-07', '5556667777', 'daniel.anderson@example.com', 'palle'),
       ('Jennifer', 'Thomas', '1990-03-03', '6667778888', 'jennifer.thomas@example.com', 'palle'),
       ('Matthew', 'Taylor', '1987-08-08', '7778889999', 'matthew.taylor@example.com', 'palle'),
       ('Elizabeth', 'Moore', '1992-12-12', '8889990000', 'elizabeth.moore@example.com', 'palle'),
       ('Anthony', 'Jackson', '1985-11-11', '9990001111', 'anthony.jackson@example.com', 'palle'),
       ('Susan', 'Martin', '1988-05-05', '1011121314', 'susan.martin@example.com', 'palle'),
       ('Joshua', 'Lee', '1991-01-01', '1112131415', 'joshua.lee@example.com', 'palle'),
       ('Karen', 'Perez', '1986-02-02', '1213141516', 'karen.perez@example.com', 'palle'),
       ('Andrew', 'Thompson', '1989-03-03', '1314151617', 'andrew.thompson@example.com', 'palle'),
       ('Nancy', 'White', '1993-04-04', '1415161718', 'nancy.white@example.com', 'palle'),
       ('Ryan', 'Harris', '1984-05-05', '1516171819', 'ryan.harris@example.com', 'palle'),
       ('Betty', 'Sanchez', '1990-06-06', '1617181920', 'betty.sanchez@example.com', 'palle'),
       ('Brandon', 'Clark', '1987-07-07', '1718192021', 'brandon.clark@example.com', 'palle'),
       ('Donna', 'Ramirez', '1992-08-08', '1819202122', 'donna.ramirez@example.com', 'palle'),
       ('Kevin', 'Lewis', '1983-09-09', '1920212223', 'kevin.lewis@example.com', 'palle');

INSERT INTO task (name, description, startdate, enddate, status, emailEmployee, job)
VALUES ('task 1', 'Description of task 1', '2023-01-01', '2023-01-10', 'compleated', 'brandon.clark@example.com', 1),
       ('task 2', 'Description of task 2', '2023-02-01', '2023-02-15', 'assigned', 'brandon.clark@example.com', 1),
       ('task 3', 'Description of task 3', '2023-03-01', '2023-03-20', 'not assigned', 'brandon.clark@example.com', 1),
       ('task 4', 'Description of task 4', '2023-04-01', '2023-04-25', 'compleated', 'brandon.clark@example.com', 1),
       ('task 5', 'Description of task 5', '2023-05-01', '2023-05-30', 'assigned', 'brandon.clark@example.com', 1),
       ('task 6', 'Description of task 6', '2023-06-01', '2023-06-15', 'not assigned', 'brandon.clark@example.com', 1),
       ('task 7', 'Description of task 7', '2023-07-01', '2023-07-20', 'compleated', 'brandon.clark@example.com', 1),
       ('task 8', 'Description of task 8', '2023-08-01', '2023-08-25', 'assigned', 'brandon.clark@example.com', 1),
       ('task 9', 'Description of task 9', '2023-09-01', '2023-09-10', 'not assigned', 'brandon.clark@example.com', 1),
       ('task 10', 'Description of task 10', '2023-10-01', '2023-10-15', 'compleated', 'brandon.clark@example.com', 1);

INSERT INTO require (idskills, idtask)
VALUES (1, 1),
       (2, 1),
       (3, 2),
       (4, 2),
       (5, 3),
       (6, 3),
       (7, 4),
       (8, 4),
       (9, 5);

INSERT INTO have (emailemployee, idskills)
VALUES ('brandon.clark@example.com', 1),
       ('brandon.clark@example.com', 2),
       ('brandon.clark@example.com', 3),
       ('brandon.clark@example.com', 4),
       ('brandon.clark@example.com', 5),
       ('brandon.clark@example.com', 6),
       ('brandon.clark@example.com', 7),
       ('brandon.clark@example.com', 8),
       ('brandon.clark@example.com', 9),
       ('brandon.clark@example.com', 10);

INSERT INTO team (name, description, emailemployer)
VALUES ('Team A', 'Description of Team A', 'hank.ivy@example.com'),
       ('Team B', 'Description of Team B', 'hank.ivy@example.com'),
       ('Team C', 'Description of Team C', 'hank.ivy@example.com'),
       ('Team D', 'Description of Team D', 'hank.ivy@example.com'),
       ('Team E', 'Description of Team E', 'hank.ivy@example.com'),
       ('Team F', 'Description of Team F', 'hank.ivy@example.com'),
       ('Team G', 'Description of Team G', 'hank.ivy@example.com'),
       ('Team H', 'Description of Team H', 'hank.ivy@example.com'),
       ('Team I', 'Description of Team I', 'hank.ivy@example.com'),
       ('Team J', 'Description of Team J', 'hank.ivy@example.com');


INSERT INTO job (name, description, assingedTeam)
VALUES ('Sviluppo Frontend', 'Realizzazione interfaccia utente', 1);

INSERT INTO partof (idteam, emailEmployee)
VALUES (1, 'brandon.clark@example.com');