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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_de_compra`
--

LOCK TABLES `carrito_de_compra` WRITE;
/*!40000 ALTER TABLE `carrito_de_compra` DISABLE KEYS */;
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
  PRIMARY KEY (`id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Cocina','Cosas de la cocina');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Mauricio','Mitre','mitremauricio@gmail.com','3814');
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
  PRIMARY KEY (`id_Devolucion`),
  KEY `fk_devolucion_orden` (`orden_id`),
  KEY `fk_devolucion_estado` (`estado_devolucion_id`),
  CONSTRAINT `fk_devolucion_estado` FOREIGN KEY (`estado_devolucion_id`) REFERENCES `estado_devolucion` (`id_EstDevol`),
  CONSTRAINT `fk_devolucion_orden` FOREIGN KEY (`orden_id`) REFERENCES `orden_de_compra` (`id_Orden`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devolucion`
--

LOCK TABLES `devolucion` WRITE;
/*!40000 ALTER TABLE `devolucion` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
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
  PRIMARY KEY (`id_envio`),
  KEY `fk_envio_orden` (`orden_id`),
  KEY `fk_envio_direccion` (`direccion_id`),
  KEY `fk_envio_transportista` (`transportista_id`),
  CONSTRAINT `fk_envio_direccion` FOREIGN KEY (`direccion_id`) REFERENCES `direccion` (`id_Direccion`),
  CONSTRAINT `fk_envio_orden` FOREIGN KEY (`orden_id`) REFERENCES `orden_de_compra` (`id_Orden`),
  CONSTRAINT `fk_envio_transportista` FOREIGN KEY (`transportista_id`) REFERENCES `transportista` (`id_transportista`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio`
--

LOCK TABLES `envio` WRITE;
/*!40000 ALTER TABLE `envio` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_devolucion`
--

LOCK TABLES `estado_devolucion` WRITE;
/*!40000 ALTER TABLE `estado_devolucion` DISABLE KEYS */;
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
  KEY `fk_metodo_tipo` (`tipo_metodo_id`),
  CONSTRAINT `fk_metodo_tipo` FOREIGN KEY (`tipo_metodo_id`) REFERENCES `tipo_metodo` (`id_Tipomet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_de_pago`
--

LOCK TABLES `metodo_de_pago` WRITE;
/*!40000 ALTER TABLE `metodo_de_pago` DISABLE KEYS */;
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
  PRIMARY KEY (`id_Moneda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moneda_cripto`
--

LOCK TABLES `moneda_cripto` WRITE;
/*!40000 ALTER TABLE `moneda_cripto` DISABLE KEYS */;
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
  PRIMARY KEY (`id_Orden`),
  KEY `fk_orden_cliente` (`cliente_id`),
  KEY `fk_orden_sucursal` (`sucursalOrigen_id`),
  CONSTRAINT `fk_orden_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_Cliente`),
  CONSTRAINT `fk_orden_sucursal` FOREIGN KEY (`sucursalOrigen_id`) REFERENCES `sucursal` (`id_Sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_de_compra`
--

LOCK TABLES `orden_de_compra` WRITE;
/*!40000 ALTER TABLE `orden_de_compra` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_de_pago`
--

LOCK TABLES `orden_de_pago` WRITE;
/*!40000 ALTER TABLE `orden_de_pago` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `orden_producto` ENABLE KEYS */;
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
  KEY `fk_producto_categoria` (`categoria_id`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,1,'Aceite Buena vibra','999975846521',4500.00,'Agotado','2025-11-21 09:34:22'),(2,1,'Aceite Mala vibra','666',1000.00,'Disponible','2025-11-21 09:49:45');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockmovimiento`
--

LOCK TABLES `stockmovimiento` WRITE;
/*!40000 ALTER TABLE `stockmovimiento` DISABLE KEYS */;
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
  KEY `fk_stocksuc_sucursal` (`sucursal_id`),
  CONSTRAINT `fk_stocksuc_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id_Producto`),
  CONSTRAINT `fk_stocksuc_sucursal` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id_Sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocksucursal`
--

LOCK TABLES `stocksucursal` WRITE;
/*!40000 ALTER TABLE `stocksucursal` DISABLE KEYS */;
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
  PRIMARY KEY (`id_Sucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal`
--

LOCK TABLES `sucursal` WRITE;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
INSERT INTO `sucursal` VALUES (1,'Bella Vista','Av. Independencia 1580','Tucumán','3815648');
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
  PRIMARY KEY (`id_Tipomet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_metodo`
--

LOCK TABLES `tipo_metodo` WRITE;
/*!40000 ALTER TABLE `tipo_metodo` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_mov`
--

LOCK TABLES `tipo_mov` WRITE;
/*!40000 ALTER TABLE `tipo_mov` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportista`
--

LOCK TABLES `transportista` WRITE;
/*!40000 ALTER TABLE `transportista` DISABLE KEYS */;
/*!40000 ALTER TABLE `transportista` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21 10:59:21
