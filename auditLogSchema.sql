-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: centralmarket.cluster-c6kg7bvufwvh.ap-southeast-1.rds.amazonaws.com    Database: shs_dev_db_clonev3
-- ------------------------------------------------------
-- Server version	5.7.12-log

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

-- SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `event_history`
--

DROP TABLE IF EXISTS `event_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_history` (
  `id` varchar(45) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(45) NOT NULL,
  `application_id` varchar(45) NOT NULL,
  `action` enum('Create','Read','Update','Delete') NOT NULL,
  `record_id` varchar(45) NOT NULL,
  `event` varchar(45) NOT NULL,
  `module` varchar(45) NOT NULL,
  `field_name` varchar(255) DEFAULT NULL,
  `previous_value` text,
  `new_value` text,
  `status` tinyint(4) NOT NULL,
  `query_string` text,
  `end_point` varchar(45) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `error_message` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `record_id_UNIQUE` (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_history`
--
LOCK TABLES `event_history` WRITE;
/*!40000 ALTER TABLE `event_history` DISABLE KEYS */;




/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
-- DELIMITER ;;
-- /*!50003 CREATE*/ /*!50017 DEFINER=`serinodev_dbuser`@`%`*/ /*!50003 TRIGGER `shs_dev_db_clonev3`.`event_history_BEFORE_INSERT` BEFORE INSERT ON `event_history` FOR EACH ROW
-- BEGIN
-- 	SET new.id = (SELECT IF(MAX(id) IS NOT NULL, CONCAT('ID', LPAD((SUBSTRING_INDEX(MAX(id), 'ID', -1) + 1), 8, 0)), 'ID00000001') AS next_id from event_history);
-- 	SET new.record_id = (SELECT IF(MAX(record_id) IS NOT NULL, CONCAT(new.record_id, LPAD((SUBSTRING_INDEX(MAX(record_id), new.record_id, -1) + 1), 8, 0)), CONCAT(new.record_id,'00000001')) AS next_record_id from event_history);
-- END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'shs_dev_db_clonev3'
--

--
-- Dumping routines for database 'shs_dev_db_clonev3'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-08 17:50:50
