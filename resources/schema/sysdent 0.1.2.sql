-- Gera��o de Modelo f�sico
-- Sql ANSI 2003 - brModelo.

CREATE TABLE function (
id int AUTO_INCREMENT,
function varchar(50)
<<<<<<< HEAD
PRIMARY KEY(id)
)
=======
);
>>>>>>> 756861715f1ec38cbdfcd558c951951c06d8bc4d

CREATE TABLE appointment (
id int AUTO_INCREMENT,
idPatient varchar,
idDentist varchar,
schedule date,
appointment time
PRIMARY KEY(id)
);

CREATE TABLE diagnostic (
id int AUTO_INCREMENT,
idPatient varchar,
idDentist varchar,
diagnostic varchar(500)
PRIMARY KEY(id)
);

CREATE TABLE payment (
id int AUTO_INCREMENT,
pValue double,
idPatient varchar,
payday date
PRIMARY KEY(id)
);

CREATE TABLE user (
cpf varchar PRIMARY KEY,
name varchar(50),
street varchar(50),
phone varchar(50),
district varchar(50),
zipcode int,
idFunction int,
password varchar(50),
FOREIGN KEY(idFunction) REFERENCES function (id)
);

ALTER TABLE appointment ADD FOREIGN KEY(idPatient) REFERENCES user (cpf);
ALTER TABLE appointment ADD FOREIGN KEY(idDentist) REFERENCES user (cpf);
ALTER TABLE diagnostic ADD FOREIGN KEY(idPatient) REFERENCES user (cpf);
ALTER TABLE diagnostic ADD FOREIGN KEY(idDentist) REFERENCES user (cpf);
ALTER TABLE payment ADD FOREIGN KEY(idPatient) REFERENCES user (cpf);
