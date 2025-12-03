-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tfi_bd
-- ------------------------------------------------------
-- Server version	8.4.7

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito_de_compra`
--

DROP TABLE IF EXISTS `carrito_de_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_de_compra` (
  `id_Carrito` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `fecha` datetime NOT NULL,
  `canal` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Carrito`),
  KEY `fk_carrito_cliente` (`cliente_id`),
  CONSTRAINT `fk_carrito_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_de_compra`
--

LOCK TABLES `carrito_de_compra` WRITE;
/*!40000 ALTER TABLE `carrito_de_compra` DISABLE KEYS */;
INSERT INTO `carrito_de_compra` VALUES (1,2,'2025-12-03 12:04:44','ONLINE');
/*!40000 ALTER TABLE `carrito_de_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_producto`
--

DROP TABLE IF EXISTS `carrito_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_producto` (
  `carrito_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`carrito_id`,`producto_id`),
  UNIQUE KEY `uq_carrito_producto` (`carrito_id`,`producto_id`),
  KEY `fk_carritop_producto` (`producto_id`),
  CONSTRAINT `fk_carritop_carrito` FOREIGN KEY (`carrito_id`) REFERENCES `carrito_de_compra` (`id_Carrito`),
  CONSTRAINT `fk_carritop_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_producto`
--

LOCK TABLES `carrito_producto` WRITE;
/*!40000 ALTER TABLE `carrito_producto` DISABLE KEYS */;
INSERT INTO `carrito_producto` VALUES (1,3,1);
/*!40000 ALTER TABLE `carrito_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_Categoria` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Categoria`),
  UNIQUE KEY `uq_categoria_nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Cocina','Cosas de la cocina'),(2,'Hardware','22'),(3,'Software','Licencias y servicios'),(4,'Accesori','Hola'),(5,'Sillas','Comodidad'),(6,'Cuchao','El rayo maquin');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_Cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Mauricio','Mitremendo','mitremauricio@gmail.com','3814'),(2,'Juan','Ramírez','juan@example.com','3815000000'),(3,'María','Suárez','maria@example.com','3815111111'),(4,'Pedro','Luna','pedro@example.com','3815222222'),(29,'Mitreee','Joseee','mitremauwwricio@gmail.com','03814093864');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devolucion`
--

DROP TABLE IF EXISTS `devolucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devolucion` (
  `id_Devolucion` int NOT NULL AUTO_INCREMENT,
  `orden_id` int NOT NULL,
  `estado_devolucion_id` int NOT NULL,
  `fecha` datetime NOT NULL,
  `motivo` text COLLATE utf8mb4_unicode_ci,
  `personal_id` int DEFAULT NULL,
  PRIMARY KEY (`id_Devolucion`),
  KEY `fk_devolucion_orden` (`orden_id`),
  KEY `fk_devolucion_estado` (`estado_devolucion_id`),
  KEY `fk_devolucion_personal` (`personal_id`),
  CONSTRAINT `fk_devolucion_estado` FOREIGN KEY (`estado_devolucion_id`) REFERENCES `estado_devolucion` (`id_EstDevol`),
  CONSTRAINT `fk_devolucion_orden` FOREIGN KEY (`orden_id`) REFERENCES `orden_de_compra` (`id_Orden`),
  CONSTRAINT `fk_devolucion_personal` FOREIGN KEY (`personal_id`) REFERENCES `personal` (`id_Personal`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devolucion`
--

LOCK TABLES `devolucion` WRITE;
/*!40000 ALTER TABLE `devolucion` DISABLE KEYS */;
INSERT INTO `devolucion` VALUES (1,1,1,'2025-12-03 12:04:44','Producto con artefactos en pantalla',5);
/*!40000 ALTER TABLE `devolucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion`
--

DROP TABLE IF EXISTS `direccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion` (
  `id_Direccion` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `calle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ciudad` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provincia` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pais` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `esPrincipal` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_Direccion`),
  KEY `fk_direccion_cliente` (`cliente_id`),
  CONSTRAINT `fk_direccion_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
INSERT INTO `direccion` VALUES (1,2,'San Martín','1000','San Miguel de Tucumán','Tucumán','Argentina','Casa',1),(2,3,'Belgrano','200','San Miguel de Tucumán','Tucumán','Argentina','Depto',1),(3,4,'Mitre','300','San Miguel de Tucumán','Tucumán','Argentina','Casa',1),(13,29,'Álvarez Codarco','865','San Miguel De Tucuman','Tucumán','Argentina','Casa',1);
/*!40000 ALTER TABLE `direccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio`
--

DROP TABLE IF EXISTS `envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio` (
  `id_envio` int NOT NULL AUTO_INCREMENT,
  `orden_id` int NOT NULL,
  `direccion_id` int NOT NULL,
  `transportista_id` int NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `trackingCode` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_id` int DEFAULT NULL,
  `servicio_tracking` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_tracking` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_envio`),
  KEY `fk_envio_orden` (`orden_id`),
  KEY `fk_envio_direccion` (`direccion_id`),
  KEY `fk_envio_transportista` (`transportista_id`),
  KEY `fk_envio_personal` (`personal_id`),
  CONSTRAINT `fk_envio_direccion` FOREIGN KEY (`direccion_id`) REFERENCES `direccion` (`id_Direccion`),
  CONSTRAINT `fk_envio_orden` FOREIGN KEY (`orden_id`) REFERENCES `orden_de_compra` (`id_Orden`),
  CONSTRAINT `fk_envio_personal` FOREIGN KEY (`personal_id`) REFERENCES `personal` (`id_Personal`),
  CONSTRAINT `fk_envio_transportista` FOREIGN KEY (`transportista_id`) REFERENCES `transportista` (`id_transportista`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio`
--

LOCK TABLES `envio` WRITE;
/*!40000 ALTER TABLE `envio` DISABLE KEYS */;
INSERT INTO `envio` VALUES (1,1,1,1,2500.00,'TRACK123456AR','EN CAMINO',6,'Correo Argentino','https://www.correoargentino.com.ar/formularios/oidn?tracking=TRACK123456AR');
/*!40000 ALTER TABLE `envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_devolucion`
--

DROP TABLE IF EXISTS `estado_devolucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_devolucion` (
  `id_EstDevol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_EstDevol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_devolucion`
--

LOCK TABLES `estado_devolucion` WRITE;
/*!40000 ALTER TABLE `estado_devolucion` DISABLE KEYS */;
INSERT INTO `estado_devolucion` VALUES (1,'Pendiente revisión'),(2,'Aceptada'),(3,'Rechazada');
/*!40000 ALTER TABLE `estado_devolucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_de_pago`
--

DROP TABLE IF EXISTS `metodo_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_de_pago` (
  `id_Metodo` int NOT NULL AUTO_INCREMENT,
  `tipo_metodo_id` int NOT NULL,
  `Nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Empresa` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_Metodo`),
  UNIQUE KEY `uq_metodo_nombre` (`Nombre`),
  KEY `fk_metodo_tipo` (`tipo_metodo_id`),
  CONSTRAINT `fk_metodo_tipo` FOREIGN KEY (`tipo_metodo_id`) REFERENCES `tipo_metodo` (`id_Tipomet`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_de_pago`
--

LOCK TABLES `metodo_de_pago` WRITE;
/*!40000 ALTER TABLE `metodo_de_pago` DISABLE KEYS */;
INSERT INTO `metodo_de_pago` VALUES (1,1,'Visa Crédito','Visa'),(2,2,'Wallet BTC','Binance'),(3,3,'Transferencia Banco Nación','Banco Nación');
/*!40000 ALTER TABLE `metodo_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moneda_cripto`
--

DROP TABLE IF EXISTS `moneda_cripto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moneda_cripto` (
  `id_Moneda` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `simbolo` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Moneda`),
  UNIQUE KEY `uq_moneda_cripto_nombre` (`nombre`),
  UNIQUE KEY `uq_moneda_cripto_simbolo` (`simbolo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moneda_cripto`
--

LOCK TABLES `moneda_cripto` WRITE;
/*!40000 ALTER TABLE `moneda_cripto` DISABLE KEYS */;
INSERT INTO `moneda_cripto` VALUES (1,'Bitcoin','BTC'),(2,'Ethereum','ETH'),(3,'Tether USDT','USDT');
/*!40000 ALTER TABLE `moneda_cripto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden_de_compra`
--

DROP TABLE IF EXISTS `orden_de_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_de_compra` (
  `id_Orden` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `sucursalOrigen_id` int NOT NULL,
  `fecha` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `canal` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_creacion_id` int DEFAULT NULL,
  PRIMARY KEY (`id_Orden`),
  KEY `fk_orden_cliente` (`cliente_id`),
  KEY `fk_orden_sucursal` (`sucursalOrigen_id`),
  KEY `fk_orden_usuario_crea` (`usuario_creacion_id`),
  CONSTRAINT `fk_orden_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_Cliente`),
  CONSTRAINT `fk_orden_sucursal` FOREIGN KEY (`sucursalOrigen_id`) REFERENCES `sucursal` (`id_Sucursal`),
  CONSTRAINT `fk_orden_usuario_crea` FOREIGN KEY (`usuario_creacion_id`) REFERENCES `personal` (`id_Personal`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_de_compra`
--

LOCK TABLES `orden_de_compra` WRITE;
/*!40000 ALTER TABLE `orden_de_compra` DISABLE KEYS */;
INSERT INTO `orden_de_compra` VALUES (1,2,2,'2025-12-03 12:04:44',450000.00,'ONLINE','PAGADA',4),(2,3,3,'2025-12-03 12:04:44',205000.00,'FISICO','PENDIENTE',4),(3,1,1,'2025-12-01 00:00:00',1000.00,'Teléfono','Entregado',1),(7,1,4,'2025-12-03 20:09:08',1000.00,'Web','PAGADA',NULL),(8,1,1,'2025-12-03 00:00:00',86666.00,'Teléfono','En proceso',1),(9,1,4,'2025-12-03 20:16:41',86666.00,'Web','PAGADA',NULL);
/*!40000 ALTER TABLE `orden_de_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden_de_pago`
--

DROP TABLE IF EXISTS `orden_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_de_pago` (
  `id_Pago` int NOT NULL AUTO_INCREMENT,
  `orden_id` int NOT NULL,
  `metodo_id` int NOT NULL,
  `total_pagado` decimal(10,2) NOT NULL,
  `moneda` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Pago`),
  KEY `fk_pago_orden` (`orden_id`),
  KEY `fk_pago_metodo` (`metodo_id`),
  CONSTRAINT `fk_pago_metodo` FOREIGN KEY (`metodo_id`) REFERENCES `metodo_de_pago` (`id_Metodo`),
  CONSTRAINT `fk_pago_orden` FOREIGN KEY (`orden_id`) REFERENCES `orden_de_compra` (`id_Orden`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_de_pago`
--

LOCK TABLES `orden_de_pago` WRITE;
/*!40000 ALTER TABLE `orden_de_pago` DISABLE KEYS */;
INSERT INTO `orden_de_pago` VALUES (1,1,1,450000.00,'ARS'),(2,2,2,205000.00,'USDT'),(3,7,1,1000.00,'USD'),(4,8,2,86666.00,'ARS'),(5,9,1,86666.00,'USD');
/*!40000 ALTER TABLE `orden_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden_producto`
--

DROP TABLE IF EXISTS `orden_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_producto` (
  `orden_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`orden_id`,`producto_id`),
  UNIQUE KEY `uq_orden_producto` (`orden_id`,`producto_id`),
  KEY `fk_ordenprod_producto` (`producto_id`),
  CONSTRAINT `fk_ordenprod_orden` FOREIGN KEY (`orden_id`) REFERENCES `orden_de_compra` (`id_Orden`),
  CONSTRAINT `fk_ordenprod_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_producto`
--

LOCK TABLES `orden_producto` WRITE;
/*!40000 ALTER TABLE `orden_producto` DISABLE KEYS */;
INSERT INTO `orden_producto` VALUES (1,3,1,450000.00),(2,4,2,180000.00),(2,6,1,25000.00),(3,2,1,1000.00),(9,7,1,86666.00);
/*!40000 ALTER TABLE `orden_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal`
--

DROP TABLE IF EXISTS `personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal` (
  `id_Personal` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol_id` int NOT NULL,
  `sucursal_id` int DEFAULT NULL,
  PRIMARY KEY (`id_Personal`),
  UNIQUE KEY `uq_personal_email` (`email`),
  KEY `fk_personal_rol` (`rol_id`),
  KEY `fk_personal_sucursal` (`sucursal_id`),
  CONSTRAINT `fk_personal_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol_personal` (`id_Rol`),
  CONSTRAINT `fk_personal_sucursal` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id_Sucursal`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal`
--

LOCK TABLES `personal` WRITE;
/*!40000 ALTER TABLE `personal` DISABLE KEYS */;
INSERT INTO `personal` VALUES (1,'Juan','García','juan.admin@tienda.com',1,2),(2,'Lucía','Pérez','lucia.soporte@tienda.com',2,2),(3,'Carlos','López','carlos.logistica@tienda.com',1,4),(4,'Ana','García','ana.admin@tienda.com',1,2),(5,'Luis','Pérez','luis.soporte@tienda.com',2,2),(6,'Carla','López','carla.logistica@tienda.com',3,2),(7,'marcelo','mitre','marceloe@mitre.com',3,1);
/*!40000 ALTER TABLE `personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_Producto` int NOT NULL AUTO_INCREMENT,
  `categoria_id` int NOT NULL,
  `Nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SKU` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Precio_Lista` decimal(10,2) NOT NULL,
  `Estado` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fechaAlta` datetime NOT NULL,
  PRIMARY KEY (`id_Producto`),
  UNIQUE KEY `uq_producto_sku` (`SKU`),
  UNIQUE KEY `uq_producto_nombre` (`Nombre`),
  KEY `fk_producto_categoria` (`categoria_id`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,1,'Aceite Buena vibra','999975846521',4500.00,'Agotado','2025-11-21 09:34:22'),(2,5,'Aceite Mala vibra','666',1000.00,'Disponible','2025-11-21 09:49:45'),(3,2,'Placa de video RTX 4060','RTX4060',450000.00,'ACTIVO','2025-12-03 12:04:44'),(4,6,'Motherboard B550M','MB-B550M',180000.00,'Disponible','2025-12-03 12:04:44'),(5,3,'Licencia Windows 11 Pro','WIN11PRO',120000.00,'ACTIVO','2025-12-03 12:04:44'),(6,4,'Mouse Gamer RGB','MOUSE-RGB',25000.00,'ACTIVO','2025-12-03 12:04:44'),(7,4,'Teclado','67676',86666.00,'Disponible','2025-12-03 15:26:15');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_personal`
--

DROP TABLE IF EXISTS `rol_personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_personal` (
  `id_Rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Rol`),
  UNIQUE KEY `uq_rol_personal_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_personal`
--

LOCK TABLES `rol_personal` WRITE;
/*!40000 ALTER TABLE `rol_personal` DISABLE KEYS */;
INSERT INTO `rol_personal` VALUES (1,'ADMIN'),(3,'LOGISTICA'),(2,'SOPORTE');
/*!40000 ALTER TABLE `rol_personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockmovimiento`
--

DROP TABLE IF EXISTS `stockmovimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stockmovimiento` (
  `id_StockM` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `sucursal_id` int NOT NULL,
  `tipo_mov` int NOT NULL,
  `fechaHora` datetime NOT NULL,
  `Cantidad` int NOT NULL,
  `Motivo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_StockM`),
  KEY `fk_stockmov_producto` (`producto_id`),
  KEY `fk_stockmov_sucursal` (`sucursal_id`),
  KEY `fk_stockmov_tipomov` (`tipo_mov`),
  CONSTRAINT `fk_stockmov_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id_Producto`),
  CONSTRAINT `fk_stockmov_sucursal` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id_Sucursal`),
  CONSTRAINT `fk_stockmov_tipomov` FOREIGN KEY (`tipo_mov`) REFERENCES `tipo_mov` (`id_TipoMov`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockmovimiento`
--

LOCK TABLES `stockmovimiento` WRITE;
/*!40000 ALTER TABLE `stockmovimiento` DISABLE KEYS */;
INSERT INTO `stockmovimiento` VALUES (1,3,2,1,'2025-12-03 12:04:44',10,'Carga inicial'),(2,5,2,1,'2025-12-03 12:04:44',15,'Carga inicial'),(3,7,1,1,'2025-12-03 15:26:15',20,'Stock inicial de alta de producto');
/*!40000 ALTER TABLE `stockmovimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocksucursal`
--

DROP TABLE IF EXISTS `stocksucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocksucursal` (
  `producto_id` int NOT NULL,
  `sucursal_id` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`producto_id`,`sucursal_id`),
  UNIQUE KEY `uq_stocksucursal_sucursal_producto` (`sucursal_id`,`producto_id`),
  CONSTRAINT `fk_stocksuc_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id_Producto`),
  CONSTRAINT `fk_stocksuc_sucursal` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id_Sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocksucursal`
--

LOCK TABLES `stocksucursal` WRITE;
/*!40000 ALTER TABLE `stocksucursal` DISABLE KEYS */;
INSERT INTO `stocksucursal` VALUES (3,2,10),(4,3,8),(5,2,15),(6,3,20),(7,1,20);
/*!40000 ALTER TABLE `stocksucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal`
--

DROP TABLE IF EXISTS `sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursal` (
  `id_Sucursal` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provincia` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_Sucursal`),
  UNIQUE KEY `uq_sucursal_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal`
--

LOCK TABLES `sucursal` WRITE;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
INSERT INTO `sucursal` VALUES (1,'Bella Vista','Av. Independencia 1580','Tucumán','3815648'),(2,'Sucursal Centro','Av. Principal 123','Tucumán','3814000000'),(3,'Sucursal Norte','Av. Norte 456','Tucumán','3814111111'),(4,'Digicom','Álvarez Codarco 866','Tucumán','03814093864');
/*!40000 ALTER TABLE `sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_metodo`
--

DROP TABLE IF EXISTS `tipo_metodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_metodo` (
  `id_Tipomet` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Tipomet`),
  UNIQUE KEY `uq_tipo_metodo_nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_metodo`
--

LOCK TABLES `tipo_metodo` WRITE;
/*!40000 ALTER TABLE `tipo_metodo` DISABLE KEYS */;
INSERT INTO `tipo_metodo` VALUES (2,'CRIPTO'),(1,'TARJETA'),(3,'TRANSFERENCIA');
/*!40000 ALTER TABLE `tipo_metodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_mov`
--

DROP TABLE IF EXISTS `tipo_mov`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_mov` (
  `id_TipoMov` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_TipoMov`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_mov`
--

LOCK TABLES `tipo_mov` WRITE;
/*!40000 ALTER TABLE `tipo_mov` DISABLE KEYS */;
INSERT INTO `tipo_mov` VALUES (1,'Ingreso inicial'),(2,'Venta'),(3,'Ajuste inventario');
/*!40000 ALTER TABLE `tipo_mov` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaccioncripto`
--

DROP TABLE IF EXISTS `transaccioncripto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaccioncripto` (
  `pago_id` int NOT NULL,
  `moneda_cripto_id` int NOT NULL,
  `hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wallet_cliente` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`pago_id`),
  KEY `fk_txcripto_moneda` (`moneda_cripto_id`),
  CONSTRAINT `fk_txcripto_moneda` FOREIGN KEY (`moneda_cripto_id`) REFERENCES `moneda_cripto` (`id_Moneda`),
  CONSTRAINT `fk_txcripto_pago` FOREIGN KEY (`pago_id`) REFERENCES `orden_de_pago` (`id_Pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaccioncripto`
--

LOCK TABLES `transaccioncripto` WRITE;
/*!40000 ALTER TABLE `transaccioncripto` DISABLE KEYS */;
INSERT INTO `transaccioncripto` VALUES (2,3,'0xABC123DEF456','bc1qejemplo_wallet_maria');
/*!40000 ALTER TABLE `transaccioncripto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportista`
--

DROP TABLE IF EXISTS `transportista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportista` (
  `id_transportista` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_transportista`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportista`
--

LOCK TABLES `transportista` WRITE;
/*!40000 ALTER TABLE `transportista` DISABLE KEYS */;
INSERT INTO `transportista` VALUES (1,'Correo Argentino'),(2,'Andreani'),(3,'OCA');
/*!40000 ALTER TABLE `transportista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tfi_bd'
--

--
-- Dumping routines for database 'tfi_bd'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizar_categoria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_categoria`(
    IN p_id          INT,
    IN p_nombre      VARCHAR(100),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    UPDATE categoria
    SET Nombre      = p_nombre,
        Descripcion = p_descripcion
    WHERE id_Categoria = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizar_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_cliente`(
    IN p_id        INT,
    IN p_nombre    VARCHAR(100),
    IN p_apellido  VARCHAR(100),
    IN p_email     VARCHAR(100),
    IN p_telefono  VARCHAR(25)
)
BEGIN
    UPDATE cliente
    SET nombre   = p_nombre,
        apellido = p_apellido,
        email    = p_email,
        telefono = p_telefono
    WHERE id_Cliente = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizar_pedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_pedido`(
    IN p_id                 INT,
    IN p_cliente_id         INT,
    IN p_sucursalOrigen_id  INT,
    IN p_fecha              DATETIME,
    IN p_total              DECIMAL(10,2),
    IN p_canal              VARCHAR(50),
    IN p_estado             VARCHAR(50),
    IN p_usuario_creacion_id INT
)
BEGIN
    UPDATE orden_de_compra
    SET cliente_id         = p_cliente_id,
        sucursalOrigen_id  = p_sucursalOrigen_id,
        fecha              = p_fecha,
        total              = p_total,
        canal              = p_canal,
        estado             = p_estado,
        usuario_creacion_id = p_usuario_creacion_id
    WHERE id_Orden = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizar_personal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_personal`(
    IN p_id          INT,
    IN p_nombre      VARCHAR(100),
    IN p_apellido    VARCHAR(100),
    IN p_email       VARCHAR(100),
    IN p_rol_id      INT,
    IN p_sucursal_id INT
)
BEGIN
    UPDATE personal
    SET nombre      = p_nombre,
        apellido    = p_apellido,
        email       = p_email,
        rol_id      = p_rol_id,
        sucursal_id = p_sucursal_id
    WHERE id_Personal = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizar_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_producto`(
    IN p_id INT,
    IN p_nombre VARCHAR(255),
    IN p_categoria_id INT,
    IN p_sku VARCHAR(100),
    IN p_precio DECIMAL(10,2),
    IN p_estado VARCHAR(50)
)
BEGIN
    UPDATE producto 
    SET Nombre = p_nombre,
        categoria_id = p_categoria_id,
        SKU = p_sku,
        Precio_Lista = p_precio,
        Estado = p_estado
    WHERE id_Producto = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizar_sucursal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_sucursal`(
    IN p_id        INT,
    IN p_nombre    VARCHAR(150),
    IN p_direccion VARCHAR(255),
    IN p_provincia VARCHAR(100),
    IN p_telefono  VARCHAR(25)
)
BEGIN
    UPDATE sucursal
    SET nombre    = p_nombre,
        direccion = p_direccion,
        provincia = p_provincia,
        telefono  = p_telefono
    WHERE id_Sucursal = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_agregar_orden_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregar_orden_producto`(
    IN p_orden_id    INT,
    IN p_producto_id INT,
    IN p_cantidad    INT
)
BEGIN
    DECLARE v_precio DECIMAL(10,2);

    -- Validación básica
    IF p_cantidad <= 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'La cantidad debe ser mayor a cero';
    END IF;

    -- Obtener precio de lista del producto
    SELECT Precio_Lista
    INTO v_precio
    FROM producto
    WHERE id_Producto = p_producto_id;

    IF v_precio IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Producto no encontrado';
    END IF;

    -- Insertar / actualizar detalle de la orden
    INSERT INTO orden_producto (
        orden_id,
        producto_id,
        cantidad,
        precio_unitario
    ) VALUES (
        p_orden_id,
        p_producto_id,
        p_cantidad,
        v_precio
    )
    ON DUPLICATE KEY UPDATE
        cantidad       = cantidad + VALUES(cantidad),
        precio_unitario = VALUES(precio_unitario);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_agregar_producto_carrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregar_producto_carrito`(
   IN p_carrito_id INT,
    IN p_producto_id INT,
    IN p_cantidad INT
)
BEGIN
    INSERT INTO carrito_producto (carrito_id, producto_id, cantidad)
    VALUES (p_carrito_id, p_producto_id, p_cantidad)
    ON DUPLICATE KEY UPDATE
        cantidad = cantidad + VALUES(cantidad);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_agregar_stock_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregar_stock_producto`(
    IN p_producto_id INT,
    IN p_sucursal_id INT,
    IN p_cantidad    INT,
    IN p_motivo      VARCHAR(255)
)
BEGIN
    DECLARE v_tipo_mov_ingreso INT;

    -- Buscar el id_TipoMov correspondiente a "Ingreso inicial"
    SELECT id_TipoMov
    INTO v_tipo_mov_ingreso
    FROM tipo_mov
    WHERE nombre = 'Ingreso inicial'
    LIMIT 1;

    -- Si no existe el tipo de movimiento, lanzar error
    IF v_tipo_mov_ingreso IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No existe el tipo_mov "Ingreso inicial" en la tabla tipo_mov';
    END IF;

    -- 1) Insertar / actualizar stock por sucursal
    INSERT INTO stocksucursal (producto_id, sucursal_id, cantidad)
    VALUES (p_producto_id, p_sucursal_id, p_cantidad)
    ON DUPLICATE KEY UPDATE
        cantidad = cantidad + p_cantidad;

    -- 2) Registrar el movimiento de stock
    INSERT INTO stockmovimiento (producto_id, sucursal_id, tipo_mov, fechaHora, Cantidad, Motivo)
    VALUES (p_producto_id, p_sucursal_id, v_tipo_mov_ingreso, NOW(), p_cantidad, p_motivo);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_categoria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_categoria`(
    IN p_nombre VARCHAR(100),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    -- Insertar la nueva categoría
    INSERT INTO categoria (Nombre, Descripcion) 
    VALUES (p_nombre, p_descripcion);
    
    -- Devolver el ID de la categoría recién creada
    SELECT LAST_INSERT_ID() AS id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_cliente`(
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_telefono VARCHAR(25)
)
BEGIN
    INSERT INTO cliente (nombre, apellido, email, telefono) 
    VALUES (p_nombre, p_apellido, p_email, p_telefono);
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_direccion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_direccion`(
    IN p_cliente_id  INT,
    IN p_calle       VARCHAR(255),
    IN p_numero      VARCHAR(10),
    IN p_ciudad      VARCHAR(100),
    IN p_provincia   VARCHAR(100),
    IN p_pais        VARCHAR(100),
    IN p_alias       VARCHAR(100),
    IN p_esPrincipal TINYINT
)
BEGIN
    -- Si esta dirección va a ser la principal,
    -- desmarcamos cualquier otra principal del mismo cliente
    IF p_esPrincipal = 1 THEN
        UPDATE direccion
        SET esPrincipal = 0
        WHERE cliente_id = p_cliente_id;
    END IF;

    -- Insertar la nueva dirección
    INSERT INTO direccion (
        cliente_id,
        calle,
        numero,
        ciudad,
        provincia,
        pais,
        alias,
        esPrincipal
    ) VALUES (
        p_cliente_id,
        p_calle,
        p_numero,
        p_ciudad,
        p_provincia,
        p_pais,
        p_alias,
        p_esPrincipal
    );

    -- Devolver el id de la dirección creada
    SELECT LAST_INSERT_ID() AS id_Direccion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_orden` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_orden`(
	IN p_cliente_id INT,
    IN p_sucursalOrigen_id INT,
    IN p_fecha DATETIME,
    IN p_total DECIMAL(10,2),
    IN p_canal VARCHAR(50),
    IN p_estado VARCHAR(50),
    IN p_usuario_creacion_id INT
)
BEGIN
    INSERT INTO orden_de_compra (
		cliente_id,
        sucursalOrigen_id,
        fecha,
        total,
        canal,
        estado,
        usuario_creacion_id) 
    VALUES (
		p_cliente_id,
        p_sucursalOrigen_id,
        p_fecha,
        p_total,
        p_canal,
        p_estado,
        p_usuario_creacion_id);
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_orden_pago` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_orden_pago`(
    IN p_orden_id     INT,
    IN p_metodo_id    INT,
    IN p_total_pagado DECIMAL(10,2),
    IN p_moneda       VARCHAR(10)
)
BEGIN
    DECLARE v_pago_id INT;

    -- 1) Insertar el registro de pago
    INSERT INTO orden_de_pago (
        orden_id,
        metodo_id,
        total_pagado,
        moneda
    ) VALUES (
        p_orden_id,
        p_metodo_id,
        p_total_pagado,
        p_moneda
    );

    SET v_pago_id = LAST_INSERT_ID();

    -- 2) (Opcional pero recomendado) marcar la orden como PAGADA
    UPDATE orden_de_compra
    SET estado = 'PAGADA'
    WHERE id_Orden = p_orden_id;

    -- 3) Devolver el id del pago
    SELECT v_pago_id AS id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_pedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_pedido`(
	IN p_cliente_id INT,
    IN p_sucursalOrigen_id INT,
    IN p_fecha DATETIME,
    IN p_total DECIMAL(10,2),
    IN p_canal VARCHAR(50),
    IN p_estado VARCHAR(50),
    IN p_usuario_creacion_id INT
)
BEGIN
    INSERT INTO orden_de_compra (
		cliente_id,
        sucursalOrigen_id,
        fecha,
        total,
        canal,
        estado,
        usuario_creacion_id) 
    VALUES (
		p_cliente_id,
        p_sucursalOrigen_id,
        p_fecha,
        p_total,
        p_canal,
        p_estado,
        p_usuario_creacion_id);
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_personal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_personal`(
    IN p_nombre      VARCHAR(100),
    IN p_apellido    VARCHAR(100),
    IN p_email       VARCHAR(100),
    IN p_rol_id      INT,
    IN p_sucursal_id INT      -- puede venir NULL para ADMIN global
)
BEGIN
    INSERT INTO personal (nombre, apellido, email, rol_id, sucursal_id)
    VALUES (p_nombre, p_apellido, p_email, p_rol_id, p_sucursal_id);

    SELECT LAST_INSERT_ID() AS id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_producto`(
    IN p_nombre VARCHAR(255),
    IN p_categoria_id INT,
    IN p_sku VARCHAR(100),
    IN p_precio DECIMAL(10,2),
    IN p_estado VARCHAR(50)
)
BEGIN
    INSERT INTO producto (Nombre, categoria_id, SKU, Precio_Lista, Estado, fechaAlta) 
    VALUES (p_nombre, p_categoria_id, p_sku, p_precio, p_estado, NOW());
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_sucursal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_sucursal`(
    IN p_nombre VARCHAR(255),
    IN p_direccion VARCHAR(255),
    IN p_provincia VARCHAR(100),
    IN p_telefono VARCHAR(25)
)
BEGIN
    INSERT INTO sucursal (nombre, direccion, provincia, telefono) 
    VALUES (p_nombre, p_direccion, p_provincia, p_telefono);
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminar_categoria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_categoria`(
    IN p_id INT
)
BEGIN
    DELETE FROM categoria
    WHERE id_Categoria = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminar_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_cliente`(
    IN p_id INT
)
BEGIN
    -- 1) Borrar productos de carritos del cliente
    DELETE cp
    FROM carrito_producto cp
    JOIN carrito_de_compra c ON cp.carrito_id = c.id_Carrito
    WHERE c.cliente_id = p_id;

    -- 2) Borrar carritos del cliente
    DELETE FROM carrito_de_compra
    WHERE cliente_id = p_id;

    -- 3) Borrar envíos de órdenes del cliente
    DELETE e
    FROM envio e
    JOIN orden_de_compra o ON e.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 4) Borrar devoluciones de órdenes del cliente
    DELETE d
    FROM devolucion d
    JOIN orden_de_compra o ON d.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 5) Borrar transacciones cripto de pagos de órdenes del cliente
    DELETE tc
    FROM transaccioncripto tc
    JOIN orden_de_pago op ON tc.pago_id = op.id_Pago
    JOIN orden_de_compra o ON op.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 6) Borrar pagos de órdenes del cliente
    DELETE op
    FROM orden_de_pago op
    JOIN orden_de_compra o ON op.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 7) Borrar detalle de productos de órdenes del cliente
    DELETE opdet
    FROM orden_producto opdet
    JOIN orden_de_compra o ON opdet.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 8) Borrar órdenes del cliente
    DELETE FROM orden_de_compra
    WHERE cliente_id = p_id;

    -- 9) Borrar direcciones del cliente
    DELETE FROM direccion
    WHERE cliente_id = p_id;

    -- 10) Finalmente borrar el cliente
    DELETE FROM cliente
    WHERE id_Cliente = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminar_pedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_pedido`(
    IN p_id INT
)
BEGIN
    -- 1) Envíos de la orden
    DELETE FROM envio
    WHERE orden_id = p_id;

    -- 2) Devoluciones de la orden
    DELETE FROM devolucion
    WHERE orden_id = p_id;

    -- 3) Transacciones cripto de pagos de la orden
    DELETE tc
    FROM transaccioncripto tc
    JOIN orden_de_pago op ON tc.pago_id = op.id_Pago
    WHERE op.orden_id = p_id;

    -- 4) Pagos de la orden
    DELETE FROM orden_de_pago
    WHERE orden_id = p_id;

    -- 5) Detalle de productos de la orden
    DELETE FROM orden_producto
    WHERE orden_id = p_id;

    -- 6) Finalmente la orden
    DELETE FROM orden_de_compra
    WHERE id_Orden = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminar_personal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_personal`(
    IN p_id INT
)
BEGIN
    -- Quitar referencias al empleado en órdenes, devoluciones y envíos
    UPDATE orden_de_compra
    SET usuario_creacion_id = NULL
    WHERE usuario_creacion_id = p_id;

    UPDATE devolucion
    SET personal_id = NULL
    WHERE personal_id = p_id;

    UPDATE envio
    SET personal_id = NULL
    WHERE personal_id = p_id;

    -- Finalmente borrar el registro de personal
    DELETE FROM personal
    WHERE id_Personal = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminar_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_producto`(
    IN p_id INT
)
BEGIN
    DELETE FROM producto 
    WHERE id_Producto = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminar_sucursal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_sucursal`(
    IN p_id INT
)
BEGIN
    -- 1) Borrar envíos de órdenes de esta sucursal
    DELETE e
    FROM envio e
    JOIN orden_de_compra o ON e.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 2) Borrar devoluciones de órdenes de esta sucursal
    DELETE d
    FROM devolucion d
    JOIN orden_de_compra o ON d.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 3) Borrar transacciones cripto de pagos de órdenes de esta sucursal
    DELETE tc
    FROM transaccioncripto tc
    JOIN orden_de_pago op ON tc.pago_id = op.id_Pago
    JOIN orden_de_compra o ON op.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 4) Borrar pagos de órdenes de esta sucursal
    DELETE op
    FROM orden_de_pago op
    JOIN orden_de_compra o ON op.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 5) Borrar detalle de productos de órdenes de esta sucursal
    DELETE opdet
    FROM orden_producto opdet
    JOIN orden_de_compra o ON opdet.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 6) Borrar órdenes de esta sucursal
    DELETE FROM orden_de_compra
    WHERE sucursalOrigen_id = p_id;

    -- 7) Borrar movimientos de stock y stock por sucursal
    DELETE FROM stockmovimiento WHERE sucursal_id = p_id;
    DELETE FROM stocksucursal    WHERE sucursal_id = p_id;

    -- 8) Finalmente borrar la sucursal
    DELETE FROM sucursal
    WHERE id_Sucursal = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_categorias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_categorias`()
BEGIN
    SELECT id_Categoria as id, Nombre as nombre
    FROM categoria;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_clientes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_clientes`()
BEGIN
    SELECT id_Cliente as id, nombre, apellido, email, telefono
    FROM cliente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_metodos_pago` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_metodos_pago`()
BEGIN
    SELECT mp.id_Metodo as id, 
           mp.Nombre as nombre, 
           mp.Empresa as empresa, 
           tm.Nombre as tipo_metodo
    FROM metodo_de_pago mp
    JOIN tipo_metodo tm ON mp.tipo_metodo_id = tm.id_Tipomet;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_ordenes_compra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_ordenes_compra`()
BEGIN
    SELECT o.id_Orden AS id, 
           CONCAT(c.nombre, ' ', c.apellido) AS cliente,
           s.nombre AS sucursal, 
           o.fecha, 
           o.total, 
           o.canal,
           o.estado
    FROM orden_de_compra o
    JOIN cliente c ON o.cliente_id = c.id_Cliente
    JOIN sucursal s ON o.sucursalOrigen_id = s.id_Sucursal;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_orden_detalle` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_orden_detalle`(IN p_orden_id INT)
BEGIN
    SELECT o.id_Orden AS id, 
           CONCAT(c.nombre, ' ', c.apellido) AS cliente,
           s.nombre AS sucursal, 
           o.fecha, 
           o.total, 
           o.canal,
           o.estado
    FROM orden_de_compra o
    JOIN cliente c ON o.cliente_id = c.id_Cliente
    JOIN sucursal s ON o.sucursalOrigen_id = s.id_Sucursal
    WHERE o.id_Orden = p_orden_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_orden_pago` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_orden_pago`(IN p_orden_id INT)
BEGIN
    SELECT op.id_Pago as id, 
           op.total_pagado, 
           op.moneda, 
           mp.Nombre as metodo
    FROM orden_de_pago op
    JOIN metodo_de_pago mp ON op.metodo_id = mp.id_Metodo
    WHERE op.orden_id = p_orden_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_orden_productos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_orden_productos`(IN p_orden_id INT)
BEGIN
    SELECT p.Nombre as nombre, 
           op.cantidad, 
           op.precio_unitario
    FROM orden_producto op
    JOIN producto p ON op.producto_id = p.id_Producto
    WHERE op.orden_id = p_orden_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_pedidos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_pedidos`()
BEGIN
    SELECT o.id_Orden AS id, 
           CONCAT(c.nombre, ' ', c.apellido) AS cliente,
           s.nombre AS sucursal, 
           o.fecha, 
           o.total, 
           o.canal,
           o.estado
    FROM orden_de_compra o
    JOIN cliente c ON o.cliente_id = c.id_Cliente
    JOIN sucursal s ON o.sucursalOrigen_id = s.id_Sucursal;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_personal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_personal`()
BEGIN
    SELECT
  p.id_Personal AS id,
  p.nombre,
  p.apellido,
  p.email,
  r.nombre      AS rol,
  s.id_Sucursal AS sucursalId,
  s.nombre      AS sucursalNombre
FROM personal p
JOIN rol_personal r ON p.rol_id = r.id_Rol
LEFT JOIN sucursal s ON p.sucursal_id = s.id_Sucursal;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_precio_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_precio_producto`(IN p_producto_id INT)
BEGIN
    SELECT Precio_Lista as precio 
    FROM producto 
    WHERE id_Producto = p_producto_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_productos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_productos`()
BEGIN
    SELECT p.id_Producto as id, p.Nombre as nombre, 
           c.Nombre as categoria, p.SKU as sku, 
           p.Precio_Lista as precio, p.Estado as estado 
    FROM producto p 
    JOIN categoria c ON p.categoria_id = c.id_Categoria;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_roles_personal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_roles_personal`()
BEGIN
    SELECT
        id_Rol  AS id,
        nombre  AS nombre
    FROM rol_personal
    ORDER BY nombre;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_sucursales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_sucursales`()
BEGIN
    SELECT id_Sucursal as id, nombre, direccion, provincia, telefono 
    FROM sucursal;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_transaccion_cripto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_transaccion_cripto`(IN p_pago_id INT)
BEGIN
    SELECT mc.nombre as moneda, 
           tc.hash, 
           tc.wallet_cliente
    FROM transaccioncripto tc
    JOIN moneda_cripto mc ON tc.moneda_cripto_id = mc.id_Moneda
    WHERE tc.pago_id = p_pago_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03 19:48:33
