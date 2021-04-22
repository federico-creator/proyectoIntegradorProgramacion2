create schema parcialautos;
use parcialautos;
create table usuarios (
id int unsigned primary key auto_increment,
nombre varchar(50) not null,
apellido varchar (50) not null,
documento int unsigned not null,
fecha_de_nacimiento date not null,
password varchar (50) not null
);

create table productos (
id int unsigned primary key auto_increment,
url varchar(100),
nombre varchar (100) not null,
fecha_de_creacion date
);

create table productos_usuarios (
id int unsigned primary key auto_increment,
usuarios_id int unsigned,
productos_id int unsigned,

foreign key (usuarios_id) references usuarios (id),
foreign key (productos_id) references productos (id)
);

create table comentarios (
id int unsigned primary key auto_increment,
fecha_de_creacion date,
texto varchar(500),
usuarios_id int unsigned,
productos_id int unsigned,

foreign key (usuarios_id) references usuarios (id),
foreign key (productos_id) references productos (id)
);

alter table productos
modify url varchar (500);

insert into usuarios values (default,"Eze","Martin",13229842,"1980.12.30","escuela3123");
insert into usuarios values (default,"Efasdze","Maadrtin",132229842,"2080.12.30","etcuela3123");
insert into usuarios values (default,"Efasze","Marfaftin",132298422,"1680.12.30","escuelafgd3123");
insert into usuarios values (default,"Efasdze","Maasfrtin",132298242,"1910.12.30","escuelgfa3123");
insert into usuarios values (default,"Ezasde","Martfadfin",132298242,"1970.12.30","escuelafg3123");
select * from usuarios;

insert into productos values (default,"/images/products/chevrolet-cruze.jpeg","chevrolet Cruze","2020.12.30");
insert into productos values (default,"/images/products/toyota-corolla.jpeg","toyota corolla","2021.2.10");
insert into productos values (default,"/images/products/honda-civic.jpeg","honda civic","2018.10.11");
insert into productos values (default,"/images/products/volkswagen-T-Cross.jpeg","volkswagen T-Cross","2021.9.14");
insert into productos values (default,"/images/products/ford-f-150.jpeg","ford f-150","2020.5.15");
insert into productos values (default,"https://www.google.com/search?q=Jeep+Compass+2.0+Td+At9+4x4+Limited+Plus,+(2020)&rlz=1C1CHBF_esUS858US858&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjT5IX4v4DwAhX3GbkGHb7RBvUQ_AUoAXoECAEQAw#imgrc=NloanFeokOTqiM","Jeep compass","2020.4.25");
insert into productos values (default,"","Peugeot 3008","2020.10.30");
insert into productos values (default,"","Peugeot 3009","2021.1.30");
select * from productos;

insert into comentarios values (default,"1980.12.30","excelente",1,10);
insert into comentarios values (default,"2001.12.30","muy bueno",2,10);
insert into comentarios values (default,"2021.12.30","horrible",3,10);
insert into comentarios values (default,"2020.11.13","buen diseño",4,10);
insert into comentarios values (default,"1980.12.30","excelente",1,1);
insert into comentarios values (default,"2001.12.30","muy bueno",2,1);
insert into comentarios values (default,"2021.12.30","horrible",3,1);
insert into comentarios values (default,"2020.11.13","buen diseño",4,1);
insert into comentarios values (default,"1980.12.30","excelente",1,2);
insert into comentarios values (default,"2001.12.30","muy bueno",2,2);
insert into comentarios values (default,"2021.12.30","horrible",3,2);
insert into comentarios values (default,"2020.11.13","buen diseño",4,2);
insert into comentarios values (default,"1980.12.30","excelente",1,3);
insert into comentarios values (default,"2001.12.30","muy bueno",2,3);
insert into comentarios values (default,"2021.12.30","horrible",3,3);
insert into comentarios values (default,"2020.11.13","buen diseño",4,3);
insert into comentarios values (default,"1980.12.30","excelente",1,4);
insert into comentarios values (default,"2001.12.30","muy bueno",2,4);
insert into comentarios values (default,"2021.12.30","horrible",3,4);
insert into comentarios values (default,"2020.11.13","buen diseño",4,4);
insert into comentarios values (default,"1980.12.30","excelente",1,5);
insert into comentarios values (default,"2001.12.30","muy bueno",2,5);
insert into comentarios values (default,"2021.12.30","horrible",3,5);
insert into comentarios values (default,"2020.11.13","buen diseño",4,5);
insert into comentarios values (default,"1980.12.30","excelente",1,6);
insert into comentarios values (default,"2001.12.30","muy bueno",2,6);
insert into comentarios values (default,"2021.12.30","horrible",3,6);
insert into comentarios values (default,"2020.11.13","buen diseño",4,6);
insert into comentarios values (default,"1980.12.30","excelente",1,7);
insert into comentarios values (default,"2001.12.30","muy bueno",2,7);
insert into comentarios values (default,"2021.12.30","horrible",3,7);
insert into comentarios values (default,"2020.11.13","buen diseño",4,7);
insert into comentarios values (default,"1980.12.30","excelente",1,8);
insert into comentarios values (default,"2001.12.30","muy bueno",2,8);
insert into comentarios values (default,"2021.12.30","horrible",3,8);
insert into comentarios values (default,"2020.11.13","buen diseño",4,8);
insert into comentarios values (default,"1980.12.30","excelente",1,9);
insert into comentarios values (default,"2001.12.30","muy bueno",2,9);
insert into comentarios values (default,"2021.12.30","horrible",3,9);
insert into comentarios values (default,"2020.11.13","buen diseño",4,9);
select * from comentarios;

delete from comentarios where id=5;

insert into productos_usuarios values (default,5,7);
select * from productos_usuarios;

drop table productos_usuarios;

alter table productos
add usuario_cargo_id int unsigned;

alter table productos 
add foreign key (usuario_cargo_id) references usuarios (id);

update productos
set usuario_cargo_id=1
where id=1;

update productos
set usuario_cargo_id=1
where id=2;

update productos
set usuario_cargo_id=2
where id=3;

update productos
set usuario_cargo_id=3
where id=4;

update productos
set usuario_cargo_id=3
where id=5;

update productos
set usuario_cargo_id=3
where id=6;

update productos
set usuario_cargo_id=6
where id=7;

update productos
set usuario_cargo_id=6
where id=8;

alter table usuarios
add mail varchar(100);

update usuarios
set mail="mimail@yahoo.com.ar"
where id=1;

update usuarios
set mail="mimail2@yahoo.com.ar"
where id=2;

update usuarios
set mail="mimail@gmail.com.ar"
where id=3;

update usuarios
set mail="mimail@oulook.com"
where id=4;

update usuarios
set mail="dsada@yahoo.com.ar"
where id=5;




