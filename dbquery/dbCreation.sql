drop table if exists team cascade ;
drop table if exists have cascade;
drop table if exists require cascade;
drop table if exists task cascade;
drop table if exists employer cascade;
drop table if exists skills cascade;
drop table if exists employee cascade;
drop table if exists partOf cascade;
drop table if exists job cascade;


CREATE TABLE IF NOT EXISTS employee
(
    email      VARCHAR(50) PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    surname    VARCHAR(50) NOT NULL,
    birthDate  DATE,
    cellphone  VARCHAR(15),
    password   VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS employer
(
    email      VARCHAR(50) PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    surname    VARCHAR(50) NOT NULL,
    birthDate  DATE,
    cellphone  VARCHAR(15) NOT NULL,
    password   VARCHAR(50) NOT NULL

);

CREATE TABLE IF NOT EXISTS team
(
    idTeam      serial PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    description TEXT,
    emailEmployer  VARCHAR NOT NULL REFERENCES employer (email) on delete cascade on update cascade

);

CREATE TABLE IF NOT EXISTS job
(
    idJob       serial PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    description TEXT,
    assingedTeam INT REFERENCES team (idTeam) on delete cascade on update cascade
);


CREATE TABLE IF NOT EXISTS skills
(
    idSkills    serial PRIMARY KEY,
    name        VARCHAR(254) not null,
    description TEXT
);

CREATE TABLE IF NOT EXISTS task
(
    idTask      serial PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    description TEXT,
    startDate   DATE,
    endDate     DATE,
    weight      INT DEFAULT 0,
    require INT REFERENCES skills (idSkills) on delete cascade on update cascade,
    status      VARCHAR(50) CHECK (status IN ('not assigned', 'assigned', 'compleated')),
    emailEmployee  VARCHAR REFERENCES employee (email) on delete cascade on update cascade,
    job       INT REFERENCES job (idJob) on delete cascade on update cascade
);

CREATE TABLE IF NOT EXISTS have
(
    emailEmployee VARCHAR REFERENCES employee (email) on delete cascade on update cascade,
    idSkills   serial REFERENCES skills (idSkills) on delete cascade on update cascade,
    PRIMARY KEY (emailEmployee, idSkills)
);



CREATE TABLE IF NOT EXISTS partOf
(
    idTeam     INT REFERENCES team (idTeam) on delete cascade on update cascade,
    emailEmployee VARCHAR REFERENCES employee (email) on delete cascade on update cascade,
    PRIMARY KEY (idTeam, emailEmployee)
);

