--Creacion de las tablas prueba 1
CREATE SEQUENCE public.tb_sector_id_sector_seq;

CREATE TABLE public.tb_sector (
                id_sector INTEGER NOT NULL DEFAULT nextval('public.tb_sector_id_sector_seq'),
                hora_inicio TIME NOT NULL,
                hora_fin TIME NOT NULL,
                nombre_sector VARCHAR NOT NULL,
                coordenadas VARCHAR NOT NULL,
                CONSTRAINT id_sector PRIMARY KEY (id_sector)
);


ALTER SEQUENCE public.tb_sector_id_sector_seq OWNED BY public.tb_sector.id_sector;

CREATE SEQUENCE public.tb_cliente_id_clie_seq;

CREATE TABLE public.tb_cliente (
                id_clie INTEGER NOT NULL DEFAULT nextval('public.tb_cliente_id_clie_seq'),
                ci VARCHAR(10) NOT NULL,
                cord_domicilio VARCHAR NOT NULL,
                nombres VARCHAR NOT NULL,
                apellidos VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                user_clie VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                CONSTRAINT id_clie PRIMARY KEY (id_clie)
);


ALTER SEQUENCE public.tb_cliente_id_clie_seq OWNED BY public.tb_cliente.id_clie;


--Prueba 1 Insercion de datos
Select * from tb_cliente

INSERT INTO tb_cliente (ci, cord_domicilio, nombres,apellidos, email, user_clie, password) VALUES ('12345356890','guapulo','dorival','pichamba','dori@live.com','dpichamba','12345');

Select * from tb_sector

Insert into tb_sector (hora_inicio,hora_fin,nombre_sector,cord) values ('04:05','05:08','guapulo','{"latitud": "19.1571124", "longitud": "19.4875414"}')

DELETE FROM tb_sector;


--PRUEBA 2 insercion

Select * from tb_cliente
INSERT INTO tb_cliente (ci,nombres,apellidos, email, user_clie, password,dom_long,dom_lat) VALUES ('1234567890','dorival','pichamba','dori@live.com','dpichamba','12345',-0.1841235,-78.4872125);

Select * from tb_sector
Insert into tb_sector (hora_inicio,hora_fin,nombre_sector,sec_long,sec_lat) values ('04:05','05:08','guapulo',-0.1841235,-78.4872125)


