ALTER TABLE insumos
DROP FOREIGN KEY FK_RecetaInsumo;
ALTER TABLE productos
DROP FOREIGN KEY FK_RecetaProducto;
ALTER TABLE ingredientes
DROP FOREIGN KEY FK_ProductoIngrediente;
ALTER TABLE ingredientes
DROP FOREIGN KEY FK_InsumoIngrediente;

DROP TABLE IF EXISTS recetas;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS insumos;
DROP TABLE IF EXISTS ingredientes;

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

CREATE TABLE ingredientes (
    id int PRIMARY KEY AUTO_INCREMENT,
    producto_id int,
    insumo_id int,
    peso DECIMAL(10,3),
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_ProductoIngrediente FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    CONSTRAINT FK_InsumoIngrediente FOREIGN KEY (insumo_id) REFERENCES insumos(id) ON DELETE CASCADE
);



describe insumos;describe recetas;describe productos;describe ingredientes;


insert into recetas (nombre) values ('receta1');
insert into recetas (nombre) values ('receta2');
insert into recetas (nombre) values ('receta3');

insert into insumos (nombre, peso, barras, receta_id) values ('insumo1',300.323,'codigo1',1);
insert into insumos (nombre, peso, barras, receta_id) values ('insumo2',200.223,'codigo2',1);
insert into insumos (nombre, peso, barras, receta_id) values ('insumo3',100.123,'codigo3',2);
insert into insumos (nombre, peso, barras, receta_id) values ('insumo4',400.423,'codigo4',3);

insert into productos (receta_id, nucleo, batch) values (1, 100.123, 200.432);
insert into productos (receta_id, nucleo, batch) values (2, 20.123, 40.432);
insert into productos (receta_id, nucleo, batch) values (3, 50.123, 100.432);
insert into productos (receta_id, nucleo, batch) values (1, 10.865, 20.432);

insert into ingredientes (producto_id, insumo_id, peso) values (1, 1, 210.432);
insert into ingredientes (producto_id, insumo_id, peso) values (1, 2, 41.432);
insert into ingredientes (producto_id, insumo_id, peso) values (2, 3, 63.432);
insert into ingredientes (producto_id, insumo_id, peso) values (3, 4, 101.432);
insert into ingredientes (producto_id, insumo_id, peso) values (1, 1, 204.666);
insert into ingredientes (producto_id, insumo_id, peso) values (1, 2, 1401.432);








