ALTER TABLE recetas_insumos
DROP FOREIGN KEY FK_RecetaInsumo;
ALTER TABLE recetas_insumos
DROP FOREIGN KEY FK_InsumoReceta;
ALTER TABLE productos
DROP FOREIGN KEY FK_RecetaProducto;
ALTER TABLE ingredientes
DROP FOREIGN KEY FK_ProductoIngrediente;
ALTER TABLE ingredientes
DROP FOREIGN KEY FK_InsumoIngrediente;

DROP TABLE IF EXISTS recetas;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS recetas_insumos;
DROP TABLE IF EXISTS insumos;
DROP TABLE IF EXISTS ingredientes;

CREATE TABLE recetas (
  id int PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(255) NOT NULL,
  peso DECIMAL(3,1) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE insumos (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    barras varchar(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE recetas_insumos (
    id int PRIMARY KEY AUTO_INCREMENT,
    receta_id int NOT NULL,
    insumo_id int NOT NULL,
    peso DECIMAL(10,3) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT FK_RecetaInsumo FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE,
    CONSTRAINT FK_InsumoReceta FOREIGN KEY (insumo_id) REFERENCES insumos(id) ON DELETE CASCADE
);

CREATE TABLE productos (
    id int PRIMARY KEY AUTO_INCREMENT,
    receta_id int,
    pedido DECIMAL(10,3) NOT NULL,
    nucleo DECIMAL(10,3),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT FK_RecetaProducto FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE
);

CREATE TABLE ingredientes (
    id int PRIMARY KEY AUTO_INCREMENT,
    producto_id int,
    insumo_id int,
    peso DECIMAL(10,3),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT FK_ProductoIngrediente FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    CONSTRAINT FK_InsumoIngrediente FOREIGN KEY (insumo_id) REFERENCES insumos(id) ON DELETE CASCADE
);



describe insumos;describe recetas;describe productos;describe ingredientes;


insert into recetas (nombre, peso) values ('receta1', 4.5);
insert into recetas (nombre, peso) values ('receta2', 6.5);
insert into recetas (nombre, peso) values ('receta3', 7.5);
INSERT INTO recetas (nombre, peso) VALUES ('receta4', 4.3);
INSERT INTO recetas (nombre, peso) VALUES ('receta5', 2.2);

insert into insumos (nombre, barras) values ('insumo1', 'codigo1');
insert into insumos (nombre, barras) values ('insumo2', 'codigo2');
insert into insumos (nombre, barras) values ('insumo3', 'codigo3');
insert into insumos (nombre, barras) values ('insumo4', 'codigo4');
INSERT INTO insumos (nombre, barras) VALUES ('insumo5', 'codigo5');
INSERT INTO insumos (nombre, barras) VALUES ('insumo6', 'codigo6');
INSERT INTO insumos (nombre, barras) VALUES ('insumo7', 'codigo7');
INSERT INTO insumos (nombre, barras) VALUES ('insumo8', 'codigo8');
INSERT INTO insumos (nombre, barras) VALUES ('insumo9', 'codigo9');
INSERT INTO insumos (nombre, barras) VALUES ('insumo10', 'codigo10');

insert into recetas_insumos (receta_id, insumo_id, peso) values (2, 3, 1.123);
insert into recetas_insumos (receta_id, insumo_id, peso) values (1, 2, 2.223);
insert into recetas_insumos (receta_id, insumo_id, peso) values (1, 1, 3.323);
insert into recetas_insumos (receta_id, insumo_id, peso) values (3, 4, 4.423);
insert into recetas_insumos (receta_id, insumo_id, peso) values (1, 5, 5.523);
insert into recetas_insumos (receta_id, insumo_id, peso) values (2, 6, 6.623);
insert into recetas_insumos (receta_id, insumo_id, peso) values (3, 7, 7.723);
insert into recetas_insumos (receta_id, insumo_id, peso) values (4, 8, 8.823);
insert into recetas_insumos (receta_id, insumo_id, peso) values (5, 9, 9.923);
insert into recetas_insumos (receta_id, insumo_id, peso) values (1, 10, 10.023);

INSERT INTO productos (receta_id, pedido, nucleo) VALUES (1, 100.6, 100.8);
INSERT INTO productos (receta_id, pedido, nucleo) VALUES (2, 200.6, 200.8);
INSERT INTO productos (receta_id, pedido, nucleo) VALUES (3, 300.6, 300.8);
INSERT INTO productos (receta_id, pedido, nucleo) VALUES (4, 400.6, 400.8);
INSERT INTO productos (receta_id, pedido, nucleo) VALUES (5, 500.6, 500.8);
INSERT INTO productos (receta_id, pedido, nucleo) VALUES (1, 600.6, 600.8);
INSERT INTO productos (receta_id, pedido, nucleo) VALUES (2, 700.6, 700.8);
INSERT INTO productos (receta_id, pedido, nucleo) VALUES (3, 800.6, 800.8);
INSERT INTO productos (receta_id, pedido, nucleo) VALUES (4, 900.6, 900.8);
INSERT INTO productos (receta_id, pedido, nucleo) VALUES (5, 1000.6, 1000.8);

INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (1, 1, 10.123);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (2, 2, 20.223);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (3, 3, 30.323);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (4, 4, 40.423);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (5, 5, 50.523);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (1, 6, 60.623);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (2, 7, 70.723);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (3, 8, 80.823);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (4, 9, 90.923);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (5, 10, 10.023);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (1, 1, 11.123);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (2, 2, 12.223);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (3, 3, 13.323);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (4, 4, 14.423);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (5, 5, 15.523);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (1, 6, 16.623);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (2, 7, 17.723);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (3, 8, 18.823);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (4, 9, 19.923);
INSERT INTO ingredientes (producto_id, insumo_id, peso) VALUES (5, 10, 20.023);


INSERT INTO productos (receta_id, pedido) VALUES (1, 100.6);
INSERT INTO productos (receta_id, pedido) VALUES (2, 200.6);
INSERT INTO productos (receta_id, pedido) VALUES (3, 300.6);







