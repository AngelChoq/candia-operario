ALTER TABLE productos
DROP FOREIGN KEY FK_RecetaInsumo;
ALTER TABLE recetas
DROP FOREIGN KEY FK_RecetaProducto;

DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS insumos;
DROP TABLE IF EXISTS recetas;

CREATE TABLE recetas (
  id int PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(255) NOT NULL,
  createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE insumos (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    peso DECIMAL(10,3) NOT NULL,
    barras varchar(255) NOT NULL,
    receta_id int,
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_RecetaInsumo FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE
);

CREATE TABLE productos (
    id int PRIMARY KEY AUTO_INCREMENT,
    receta_id int,
    nucleo DECIMAL(10,3),
    batch DECIMAL(10,3),
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_RecetaProducto FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE
);


describe insumos;describe recetas;describe productos;


insert into recetas (nombre) values ('receta1');
insert into recetas (nombre) values ('receta2');
insert into recetas (nombre) values ('receta3');

insert into insumos (nombre, peso, barras, receta_id) values ('insumo1',300.323,'codigo1',1);
insert into insumos (nombre, peso, barras, receta_id) values ('insumo2',200.223,'codigo2',1);
insert into insumos (nombre, peso, barras, receta_id) values ('insumo3',100.123,'codigo3',2);
insert into insumos (nombre, peso, barras, receta_id) values ('insumo4',400.423,'codigo4',3);

insert into productos (receta_id, nucleo, batch) values (1, 100.123, 200.432);
insert into productos (receta_id, nucleo, batch) values (2, 20.123, 40.432);
insert into productos (receta_id, nucleo, batch) values (2, 30.123, 60.432);
insert into productos (receta_id, nucleo, batch) values (3, 50.123, 100.432);
insert into productos (receta_id, nucleo, batch) values (3, 100.333, 200.666);
insert into productos (receta_id, nucleo, batch) values (3, 700.000, 1400.432);
insert into productos (receta_id, nucleo, batch) values (1, 10.865, 20.432);








