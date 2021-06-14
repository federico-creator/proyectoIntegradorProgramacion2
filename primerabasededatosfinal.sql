create schema parcialautos;
use parcialautos;

create table usuarios (
id int unsigned primary key auto_increment,
nombre varchar(50) not null,
apellido varchar (50) not null,
documento int unsigned not null,
fecha_de_nacimiento date not null,
password varchar (200) not null unique,
mail varchar (100) not null unique,
avatar varchar(200),
created_at date,
updated_at date
);

create table productos (
id int unsigned primary key auto_increment,
marca varchar(100) not null,
modelo varchar(100) not null,
año date not null,
color varchar(100) not null,
foto varchar(200),
descripcion varchar(200) not null,
comentarios int,
descripcionlarga varchar(1000),
created_at date,
updated_at date,
usuarios_id int unsigned,


foreign key (usuarios_id) references usuarios (id)
);

create table comentarios (
id int unsigned primary key auto_increment,
created_at date,
updated_at date,
texto varchar(500) not null,
usuarios_id int unsigned,
productos_id int unsigned,

foreign key (usuarios_id) references usuarios (id),
foreign key (productos_id) references productos (id)
);

insert into usuarios values (default,"Eze","Martin",13229842,"1980.12.30","escuela3123","mimail@yahoo.com.ar",null,"2020.12.11","2020.12.11");
insert into usuarios values (default,"Juan","Pereyra",43222842,"2002.10.25","Juanpereyra123","Juanpereyra@yahoo.com.ar",null,"2018.06.21","2018.06.21");
insert into usuarios values (default,"Carla","Corte",33229422,"1995.02.10","123312415","CC@gmail.com.ar",null,"2021.07.07","2021.07.07");
insert into usuarios values (default,"Chino","Martinez",22294562,"1989.11.13","chinito123","CM@oulook.com",null,"2018.04.19","2020.05.06");
insert into usuarios values (default,"Adrian","Gonzales",39002134,"1990.05.07","Digitalhouse456","AG@yahoo.com.ar",null,"2018.09.20","2018.09.20");
select * from usuarios;

insert into productos values (default,"Chevrolet","Cruze","2020.12.30","Marron","/images/products/chevrolet-cruze.jpeg","Chevrolet Cruze II 1.4 Sedan At Ltz, (2020)",7,"Sigue con el conocido motor 1.4 turbonaftero (153 cv y 245 Nm). Se combina sólo con caja automática de seis velocidades (con convertidor de par). La única novedad mecánica es que incorporó un botón junto a la palanca de cambios, para desconectar el sistema Start&Stop. Las mejoras más importantes son en materia de seguridad. Además del equipamiento del Cruze LTZ Plus, el Cruze Premier agrega el sistema de frenado autónomo de emergencia (con reconocimiento de peatones), alerta de riesgo de colisión frontal, alerta de punto ciego y sistema de mantenimiento de carril.","2020-06-05","2020-06-05",1);
insert into productos values (default,"Toyota","Corolla","2021.12.30","Blanco","/images/products/toyota-corolla.jpeg","Toyota Corolla 1.8 Xei Cvt 140cv, (2021)",20,"El nuevo Corolla ofrece para sus versiones SEG el paquete de seguridad activa “Toyota Safety Sense”. Este sistema incorpora un radar de ondas milimétricas combinado con una cámara monocular para detectar una variedad de peligros y alertar al conductor.","2020-07-05","2020-07-05",1);
insert into productos values (default,"Honda","Civic","2018.12.30","Gris","/images/products/honda-civic.jpeg","Honda Civic 2.0 Ex-l, (2018)",10,"La ficha técnica oficial confirma la llegada de nuestro mercado del flamante motor 1.5 turbo, con 173 caballos de potencia. Se ofrecerá sólo en la versión tope de gama: EX-T (turbo). Se combinará sólo con caja automática CVT, con levas al volante y siete marchas preprogramadas. Las versiones más accesibles (EX y EX-L) tendrán un 2.0 i-Vtec de 154 cv. También tendrán la caja CVT, aunque la versión EX no contará con levas ni con la programación de siete cambios.","2020-09-05","2020-09-05",2);
insert into productos values (default,"Volkswagen","T-Cross","2021.12.30","Marron","/images/products/volkswagen-T-Cross.jpeg","Volkswagen T-Cross 1.6 Comfortline At, (2021)",9,"Sigue con el conocido motor naftero MSi 1.6 16v (110 cv y 155 Nm). Se combina con caja manual de cinco velocidades (Trendline) y automática Tiptronic de seis marchas (Comfortline y Highline). La T-Cross Trendline manual ahora trae la pantalla táctil multimedia Composition Touch (de 6.5 pulgadas, con Apple CarPlay y Android Auto), que reemplaza al equipo de audio común que tenía hasta ahora. Se eliminó el Dock Station.","2020-06-04","2020-06-04",2);
insert into productos values (default,"Ford","F-150","2020.12.30","Azul","/images/products/ford-f-150.jpeg","Ford F-150 Raptor 3.5l Bi-turbo, (2020)",62,"Motor EcoBoost V6 3.5 bi-turbonaftero (456 cv y 691 Nm). Caja automática de diez velocidades, tracción a las cuatro ruedas, con reductora. Es la pick-up más potente y deportiva que se vende hoy en la Argentina. Pesa más de 2.5 toneladas, pero acelera de 0 a 100 km/h en menos de seis segundos","2021-05-05","2021-05-05",3);
insert into productos values (default,"Jeep","Compass","2020.12.30","Negro","/images/products/jeep-compass.jpeg","Jeep Compass 2.0 Td At9 4x4 Limited Plus, (2020)",47,"Tiene 170 cv de potencia y 350 Nm de torque. Se combina con caja automática de nueve velocidades (convertidor de par) y tracción integral con modos de manejo Select Terrain. Menor consumo de combustible, mayor autonomía y más torque que la Compass 2.4 Nafta (174 cv y 229 Nm).","2021-03-05","2021-03-05",3);
insert into productos values (default,"Volkswagen","Vento","2021.12.30","Gris","/images/products/vento.jpeg","Volkswagen Vento 1.4 Highline 150cv At, (2021)",35,"El equipamiento de serie es muy superior a los conocidos en las versiones precedentes. Debido a la nueva plataforma ganó algo de espacio interior, en especial en las plazas traseras, y otro tanto sucede con los materiales utilizados y los detalles de terminación, lo que hace que la percepción de calidad visual sea positiva.","2021-05-04","2021-05-04",4);
insert into productos values (default,"Peugeot","3008","2020.12.30","Negro","/images/products/peugeot-3008.jpeg","Peugeot 3008 1.6 Gt-line Thp Tiptronic, (2020)",27,"La 3008 II llega a la Argentina importada de Francia y con dos motorizaciones: una naftera y otra diesel. La naftera es la conocida 1.6 THP (turbo, inyección directa e intercooler), que en esta versión rinde 165 caballos de potencia a 6.000 rpm y 240 Nm de torque a 1.400 rpm. Se ofrece con los niveles de equipamiento Allure y GT-Line. La diesel es 2.0 HDi (turbo, inyección directa e intercooler), con 150 cv y 370 Nm. Se combina sólo con el equipamiento GT-Line.","2021-06-05","2021-06-05",5);
select * from productos order by updated_at desc;
select*from productos;

insert into comentarios values (default,"2020.10.05","2020.10.05","excelente",1,1);
insert into comentarios values (default,"2020.12.11","2020.12.11","muy bueno",2,1);
insert into comentarios values (default,"2020.04.23","2020.04.23","horrible",3,1);
insert into comentarios values (default,"2020.12.01","2020.12.01","buen diseño",4,1);
insert into comentarios values (default,"2020.02.15","2020.02.15","excelente",1,2);
insert into comentarios values (default,"2020.12.25","2020.12.25","muy bueno",2,2);
insert into comentarios values (default,"2021.10.05","2021.10.05","horrible",3,2);
insert into comentarios values (default,"2021.07.07","2021.07.07","buen diseño",4,2);
insert into comentarios values (default,"2021.09.27","2021.09.27","excelente",1,3);
insert into comentarios values (default,"2021.07.20","2021.07.20","muy bueno",2,3);
insert into comentarios values (default,"2021.09.20","2021.09.20","horrible",3,3);
insert into comentarios values (default,"2021.09.10","2021.09.10","buen diseño",4,3);
insert into comentarios values (default,"2019.07.07","2019.07.07","excelente",1,4);
insert into comentarios values (default,"2019.08.10","2019.08.10","muy bueno",2,4);
insert into comentarios values (default,"2021.10.05","2021.10.05","horrible",3,4);
insert into comentarios values (default,"2020.10.05","2020.10.05","buen diseño",4,4);
insert into comentarios values (default,"2020.06.05","2020.06.05","excelente",1,5);
insert into comentarios values (default,"2021.01.20","2021.01.20","muy bueno",2,5);
insert into comentarios values (default,"2018.09.20","2018.09.20","horrible",3,5);
insert into comentarios values (default,"2021.09.27","2021.09.27","buen diseño",4,5);
insert into comentarios values (default,"2021.09.27","2021.09.27","excelente",1,6);
insert into comentarios values (default,"2018.06.20","2018.06.20","muy bueno",2,6);
insert into comentarios values (default,"2018.06.21","2018.06.21","horrible",3,6);
insert into comentarios values (default,"2018.03.03","2018.03.03","buen diseño",4,6);
insert into comentarios values (default,"2018.05.03","2018.05.03","excelente",1,7);
insert into comentarios values (default,"2018.04.13","2018.04.13","muy bueno",2,7);
insert into comentarios values (default,"2018.03.03","2018.03.03","horrible",3,7);
insert into comentarios values (default,"2018.07.13","2018.07.13","buen diseño",4,7);
insert into comentarios values (default,"2018.02.04","2018.02.04","excelente",1,8);
insert into comentarios values (default,"2018.01.25","2018.01.25","muy bueno",2,8);
insert into comentarios values (default,"2018.04.17","2018.04.17","horrible",3,8);
insert into comentarios values (default,"2018.04.19","2018.04.19","buen diseño",4,8);
select * from comentarios;

