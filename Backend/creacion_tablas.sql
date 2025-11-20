CREATE DATABASE IF NOT EXISTS TFI_BD
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
  
USE TFI_BD;

CREATE TABLE categoria (
  id_Categoria INT NOT NULL AUTO_INCREMENT,
  Nombre       VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_Categoria)
) ENGINE=InnoDB;

CREATE TABLE tipo_metodo (
  id_Tipomet INT NOT NULL AUTO_INCREMENT,
  Nombre     VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_Tipomet)
) ENGINE=InnoDB;

CREATE TABLE metodo_de_pago (
  id_Metodo      INT NOT NULL AUTO_INCREMENT,
  tipo_metodo_id INT NOT NULL,
  Nombre         VARCHAR(100) NOT NULL,
  Empresa        VARCHAR(100),
  PRIMARY KEY (id_Metodo),
  CONSTRAINT fk_metodo_tipo
    FOREIGN KEY (tipo_metodo_id)
    REFERENCES tipo_metodo (id_Tipomet)
) ENGINE=InnoDB;

CREATE TABLE moneda_cripto (
  id_Moneda INT NOT NULL AUTO_INCREMENT,
  nombre    VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_Moneda)
) ENGINE=InnoDB;

CREATE TABLE tipo_mov (
  id_TipoMov INT NOT NULL AUTO_INCREMENT,
  nombre     VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_TipoMov)
) ENGINE=InnoDB;

CREATE TABLE sucursal (
  id_Sucursal INT NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(150) NOT NULL,
  direccion   VARCHAR(255) NOT NULL,
  provincia   VARCHAR(100) NOT NULL,
  telefono    VARCHAR(25),
  PRIMARY KEY (id_Sucursal)
) ENGINE=InnoDB; 

CREATE TABLE transportista (
  id_transportista INT NOT NULL AUTO_INCREMENT,
  nombre           VARCHAR(150) NOT NULL,
  PRIMARY KEY (id_transportista)
) ENGINE=InnoDB;

CREATE TABLE estado_devolucion (
  id_EstDevol INT NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_EstDevol)
) ENGINE=InnoDB;

CREATE TABLE cliente (
  id_Cliente INT NOT NULL AUTO_INCREMENT,
  nombre     VARCHAR(100) NOT NULL,
  apellido   VARCHAR(100) NOT NULL,
  email      VARCHAR(100) NOT NULL,
  telefono   VARCHAR(25),
  PRIMARY KEY (id_Cliente)
) ENGINE=InnoDB;

CREATE TABLE producto (
  id_Producto   INT NOT NULL AUTO_INCREMENT,
  categoria_id  INT NOT NULL,
  Nombre        VARCHAR(255) NOT NULL,
  SKU           VARCHAR(50) NOT NULL,
  Precio_Lista  DECIMAL(10,2) NOT NULL,
  Estado        VARCHAR(50) NOT NULL,
  fechaAlta     DATETIME NOT NULL,
  PRIMARY KEY (id_Producto),
  CONSTRAINT fk_producto_categoria
    FOREIGN KEY (categoria_id)
    REFERENCES categoria (id_Categoria)
) ENGINE=InnoDB;

CREATE TABLE stocksucursal (
  producto_id INT NOT NULL,
  sucursal_id INT NOT NULL,
  cantidad    INT NOT NULL,
  PRIMARY KEY (producto_id, sucursal_id),
  CONSTRAINT fk_stocksuc_producto
    FOREIGN KEY (producto_id)
    REFERENCES producto (id_Producto),
  CONSTRAINT fk_stocksuc_sucursal
    FOREIGN KEY (sucursal_id)
    REFERENCES sucursal (id_Sucursal)
) ENGINE=InnoDB;

CREATE TABLE stockmovimiento (
  id_StockM   INT NOT NULL AUTO_INCREMENT,
  producto_id INT NOT NULL,
  sucursal_id INT NOT NULL,
  tipo_mov    INT NOT NULL,
  fechaHora   DATETIME NOT NULL,
  Cantidad    INT NOT NULL,
  Motivo      VARCHAR(255),
  PRIMARY KEY (id_StockM),
  CONSTRAINT fk_stockmov_producto
    FOREIGN KEY (producto_id)
    REFERENCES producto (id_Producto),
  CONSTRAINT fk_stockmov_sucursal
    FOREIGN KEY (sucursal_id)
    REFERENCES sucursal (id_Sucursal),
  CONSTRAINT fk_stockmov_tipomov
    FOREIGN KEY (tipo_mov)
    REFERENCES tipo_mov (id_TipoMov)
) ENGINE=InnoDB;

CREATE TABLE carrito_de_compra (
  id_Carrito INT NOT NULL AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  fecha      DATETIME NOT NULL,
  canal      VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_Carrito),
  CONSTRAINT fk_carrito_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES cliente (id_Cliente)
) ENGINE=InnoDB;

CREATE TABLE carrito_producto (
  carrito_id  INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad    INT NOT NULL,
  PRIMARY KEY (carrito_id, producto_id),
  CONSTRAINT fk_carritop_carrito
    FOREIGN KEY (carrito_id)
    REFERENCES carrito_de_compra (id_Carrito),
  CONSTRAINT fk_carritop_producto
    FOREIGN KEY (producto_id)
    REFERENCES producto (id_Producto)
) ENGINE=InnoDB;

CREATE TABLE orden_de_compra (
  id_Orden          INT NOT NULL AUTO_INCREMENT,
  cliente_id        INT NOT NULL,
  sucursalOrigen_id INT NOT NULL,
  fecha             DATETIME NOT NULL,
  total             DECIMAL(10,2) NOT NULL,
  canal             VARCHAR(50) NOT NULL,
  estado            VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_Orden),
  CONSTRAINT fk_orden_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES cliente (id_Cliente),
  CONSTRAINT fk_orden_sucursal
    FOREIGN KEY (sucursalOrigen_id)
    REFERENCES sucursal (id_Sucursal)
) ENGINE=InnoDB;

CREATE TABLE orden_producto (
  orden_id      INT NOT NULL,
  producto_id   INT NOT NULL,
  cantidad      INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (orden_id, producto_id),
  CONSTRAINT fk_ordenprod_orden
    FOREIGN KEY (orden_id)
    REFERENCES orden_de_compra (id_Orden),
  CONSTRAINT fk_ordenprod_producto
    FOREIGN KEY (producto_id)
    REFERENCES producto (id_Producto)
) ENGINE=InnoDB;

CREATE TABLE direccion (
  id_Direccion INT NOT NULL AUTO_INCREMENT,
  cliente_id   INT NOT NULL,
  calle        VARCHAR(255) NOT NULL,
  numero       VARCHAR(10),
  ciudad       VARCHAR(100) NOT NULL,
  provincia    VARCHAR(100) NOT NULL,
  pais         VARCHAR(100) NOT NULL,
  alias        VARCHAR(100),
  esPrincipal  TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id_Direccion),
  CONSTRAINT fk_direccion_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES cliente (id_Cliente)
) ENGINE=InnoDB;

CREATE TABLE envio (
  id_envio        INT NOT NULL AUTO_INCREMENT,
  orden_id        INT NOT NULL,
  direccion_id    INT NOT NULL,
  transportista_id INT NOT NULL,
  costo           DECIMAL(10,2) NOT NULL,
  trackingCode    VARCHAR(100),
  estado          VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_envio),
  CONSTRAINT fk_envio_orden
    FOREIGN KEY (orden_id)
    REFERENCES orden_de_compra (id_Orden),
  CONSTRAINT fk_envio_direccion
    FOREIGN KEY (direccion_id)
    REFERENCES direccion (id_Direccion),
  CONSTRAINT fk_envio_transportista
    FOREIGN KEY (transportista_id)
    REFERENCES transportista (id_transportista)
) ENGINE=InnoDB;

CREATE TABLE orden_de_pago (
  id_Pago    INT NOT NULL AUTO_INCREMENT,
  orden_id   INT NOT NULL,
  metodo_id  INT NOT NULL,
  total_pagado DECIMAL(10,2) NOT NULL,
  moneda     VARCHAR(10) NOT NULL,
  PRIMARY KEY (id_Pago),
  CONSTRAINT fk_pago_orden
    FOREIGN KEY (orden_id)
    REFERENCES orden_de_compra (id_Orden),
  CONSTRAINT fk_pago_metodo
    FOREIGN KEY (metodo_id)
    REFERENCES metodo_de_pago (id_Metodo)
) ENGINE=InnoDB;

CREATE TABLE transaccioncripto (
  pago_id          INT NOT NULL,
  moneda_cripto_id INT NOT NULL,
  hash             VARCHAR(255) NOT NULL,
  PRIMARY KEY (pago_id),
  CONSTRAINT fk_txcripto_pago
    FOREIGN KEY (pago_id)
    REFERENCES orden_de_pago (id_Pago),
  CONSTRAINT fk_txcripto_moneda
    FOREIGN KEY (moneda_cripto_id)
    REFERENCES moneda_cripto (id_Moneda)
) ENGINE=InnoDB;

CREATE TABLE devolucion (
  id_Devolucion        INT NOT NULL AUTO_INCREMENT,
  orden_id             INT NOT NULL,
  estado_devolucion_id INT NOT NULL,
  fecha                DATETIME NOT NULL,
  motivo               TEXT,
  PRIMARY KEY (id_Devolucion),
  CONSTRAINT fk_devolucion_orden
    FOREIGN KEY (orden_id)
    REFERENCES orden_de_compra (id_Orden),
  CONSTRAINT fk_devolucion_estado
    FOREIGN KEY (estado_devolucion_id)
    REFERENCES estado_devolucion (id_EstDevol)
) ENGINE=InnoDB;