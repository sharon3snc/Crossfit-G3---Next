-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: crossfit3g
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_date` date NOT NULL,
  `class_hour` time NOT NULL,
  `duration` int NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `number_spaces` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`class_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'2023-07-28','09:30:00',60,'Crossfit',20,1),(2,'2023-07-28','10:30:00',60,'Yoga',20,2);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_classes`
--

DROP TABLE IF EXISTS `client_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_classes` (
  `client_id` int NOT NULL,
  `class_id` int NOT NULL,
  PRIMARY KEY (`client_id`,`class_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `client_classes_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  CONSTRAINT `client_classes_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_classes`
--

LOCK TABLES `client_classes` WRITE;
/*!40000 ALTER TABLE `client_classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `phone` varchar(255) NOT NULL,
  `inscription_date` date NOT NULL,
  `emergency_contact` varchar(255) NOT NULL,
  `emergency_phone` varchar(255) NOT NULL,
  `rate_id` int DEFAULT NULL,
  `available_classes` int DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'maria@gmail.com','12345','Maria','Hurtado','1990-01-01','1234567890','2023-06-29','Jane Doe','9876543210',1,5),(2,'jose@gmail.com','12345','Jose','Rodriguez','1992-01-01','1234567890','2023-06-29','Jane Doe','9876543210',1,5),(3,'maria@gmail.com','12345','Jose','Brugnoni','1990-01-01','1234567890','2023-06-29','Jane Doe','9876543210',1,5),(4,'jl@gmail.com','12345','Luis','Brugnoni','1990-01-01','1234567890','2023-06-29','Jane Doe','9876543210',1,5),(5,'jl@gmail.com','12345','Luis','Brugnoni','1990-01-01','1234567890','2023-06-29','Jane Doe','9876543210',1,5),(6,'juanperez@gmail.com','12345','Jose','Brugnoni','1992-09-28','123123412312','2023-07-02','Josew','12312312312',1,10),(7,'jl@gmail.com','12345','Jose Luis','Brugnoni','1990-01-01','1234567890','2023-06-29','Jane Doe','9876543210',1,5),(9,'juanperez@gmail.com','12345','Antonio','Trastullo','1992-09-28','123123412312','2023-07-03','Jose','12312312312',1,10),(10,'jl@gmail.com','12345','Manuel','Brugnoni','1992-09-28','123123412312','2023-07-03','Josew','12312312312',1,10),(11,'jl@gmail.com','12345','Trini','Hurtado','1992-09-28','123123412312','2023-07-03','Jose','12312312312',1,10),(12,'albalopez@gmail.com','12345','Maria Trinidad','Hurtado','1992-09-28','123123412312','2023-07-03','Josew','12312312312',1,10),(15,'lopezmario@gmail.com','12345','Mario','Lopez','1992-09-28','123123412312','2023-07-03','Jose','12312312312',1,10),(16,'elonmusk@gmai.com','12345','Elon','Musk','1970-12-12','123456789','2023-07-21','Elon','123456789',1,10);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `user_admin` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'12345',1,'Rocio','Jimenez','1990-01-01','johndoe@example.com','1234567890'),(2,'12345',0,'Antonio','Gomez','1990-01-01','johndoe@example.com','1234567890'),(4,'12345',1,'Jose Luis','Brugnoni','1992-09-28','jlbrugnoni@gmail.com','123456789');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-20 22:53:01
