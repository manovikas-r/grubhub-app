CREATE DATABASE  IF NOT EXISTS `grubhub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `grubhub`;
-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: grubhub
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `customer_orders`
--

DROP TABLE IF EXISTS `customer_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_orders` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `res_id` int(10) unsigned DEFAULT NULL,
  `order_status` varchar(20) NOT NULL,
  `sub_total` float NOT NULL,
  `tax` float DEFAULT NULL,
  `delivery` float DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `total_price` float NOT NULL,
  `order_date` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  KEY `orders_user_id_idx` (`user_id`),
  KEY `res_orders_res_id_idx` (`res_id`),
  CONSTRAINT `orders_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `res_orders_res_id` FOREIGN KEY (`res_id`) REFERENCES `restaurants` (`res_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_orders`
--

LOCK TABLES `customer_orders` WRITE;
/*!40000 ALTER TABLE `customer_orders` DISABLE KEYS */;
INSERT INTO `customer_orders` VALUES (10,46,13,'DELIVERED',135,12.49,0,27,120.49,'2019-10-05 03:46:32'),(11,48,13,'PREPARING',120,11.1,0,24,107.1,'2019-10-05 03:53:43'),(12,50,14,'DELIVERED',149,13.78,0,29.8,132.98,'2019-10-05 04:06:10'),(13,50,13,'ORDER_CANCELLED',180,16.65,0,36,160.65,'2019-10-05 04:07:22'),(14,50,13,'ORDER_CONFIRMED',120,11.1,0,24,107.1,'2019-10-05 04:08:51'),(15,46,15,'OUT_FOR_DELIVERY',79.6,7.36,6,0,92.96,'2019-10-05 04:15:49'),(16,46,13,'ORDER_PLACED',480,44.4,0,96,428.4,'2019-10-05 17:43:10'),(17,57,20,'ORDER_DECLINED',15,1.39,6,0,22.39,'2019-10-09 16:42:37');
/*!40000 ALTER TABLE `customer_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `item_price` float NOT NULL,
  `res_id` int(10) unsigned NOT NULL,
  `item_image` varchar(255) DEFAULT NULL,
  `menu_section_id` int(10) unsigned DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `item_id_UNIQUE` (`item_id`),
  KEY `res_menu_res_id_idx` (`res_id`),
  KEY `menu_section_id_idx` (`menu_section_id`),
  CONSTRAINT `menu_section_id` FOREIGN KEY (`menu_section_id`) REFERENCES `menu_sections` (`menu_section_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `res_menu_res_id` FOREIGN KEY (`res_id`) REFERENCES `restaurants` (`res_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (21,'Idli','A type of savoury rice cake',20,13,'undefined',45,1),(22,'Veg Biryani','Spicy rice cooked with vegetables.',50,13,'item-1570309690857.jpg',46,1),(23,'Chappathi','Indian bread made of flour.',30,13,'undefined',47,1),(24,'Gulab Jamoon','Sweet dish made with sugar syrup',20,13,'undefined',48,1),(25,'Dosa','Pan cakes made of batter',30,13,'undefined',45,0),(26,'Chicken Biryani','Spicy rice cooked with Chicken',60,13,'item-1570309751170.jpg',46,1),(27,'Palak Paneer','Spinach gravy cooked with Paneer',45,13,'undefined',47,1),(28,'Mango Lassi','Mango shake made using yogurt.',30,13,'undefined',49,1),(30,'American Chopsuey','American Pasta dish',45,14,'undefined',54,1),(31,'Chinese Chopsuey','Form of chow mein with the addition of stir-fried noodles.',40,14,'undefined',54,1),(32,'Golden Babycorn','Crispy babycorn dipped in batter',35,14,'undefined',51,1),(33,'Honey Chilli Potato','Potato diced in chilli and honey',30,14,'undefined',51,1),(34,'Hong Kong Noodles','Authentic dish of Hong Kong',38,14,'undefined',52,1),(35,'Shezwan Noodles','Noodles dipped in Shezwan sauce.',34,14,'undefined',52,1),(36,'Burnt Garlic Fried Rice','Rice fried in garlic sauce',49.99,14,'undefined',53,1),(37,'Basic Fried Rice','Rice fried with basil leaves.',36.5,14,'undefined',53,1),(38,'Masala Dosa','Indian pan cakes stuffed with potato',35,13,'undefined',45,1),(39,'Cheese Pizza','Pizza with Mozzarella cheese',24,15,'undefined',55,1),(40,'Chicken Pizza','Pizza with chicken toppings',30,15,'undefined',56,1),(41,'Mushroom Pizza','Pizza with Mushroom toppings',27.8,15,'undefined',55,1),(42,'Pepperoni Pizza','Pizza with pepperoni and red sauce',33.6,15,'undefined',56,1),(43,'Pineapple pizza','Pizza with Pineapple toppings.',29.99,15,'undefined',55,1),(44,'Fruits Overload','Icecream with fruits and nuts',30,16,'undefined',58,1),(45,'Brownie Blast','Chocolate icecream with Brownie',28,16,'undefined',57,1),(46,'Cruncy Kitkat','Chocolate icecream with kitkat bars',32.54,16,'undefined',57,1),(47,'Kiwi Punch','Kiwi flavored icecream',23,16,'undefined',58,1),(48,'Paneer sticks','Crispy paneer fried with batter',32,17,'undefined',62,1),(49,'Upma','South Indian dish made of rice flour.',27,17,'undefined',59,1),(50,'Chicken Biryani','Biryani made with Chicken',27,18,'undefined',64,1),(51,'Paneer Biryani','Biryani cooked with Paneer gravy',28.09,18,'undefined',65,1),(52,'Coca Cola','Chilled cola drink in glass',15,18,'undefined',66,1),(55,'Manchuria','Cauliflower',15,20,'undefined',NULL,0);
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_sections`
--

DROP TABLE IF EXISTS `menu_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_sections` (
  `menu_section_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `menu_section_name` varchar(55) NOT NULL,
  `res_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`menu_section_id`),
  UNIQUE KEY `menu_section_id_UNIQUE` (`menu_section_id`),
  KEY `menu_section_res_id_idx` (`res_id`),
  CONSTRAINT `menu_section_res_id` FOREIGN KEY (`res_id`) REFERENCES `restaurants` (`res_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_sections`
--

LOCK TABLES `menu_sections` WRITE;
/*!40000 ALTER TABLE `menu_sections` DISABLE KEYS */;
INSERT INTO `menu_sections` VALUES (45,'Breakfast',13),(46,'Lunch',13),(47,'Dinner',13),(48,'Deserts',13),(49,'Juices',13),(51,'Starters',14),(52,'Noodles',14),(53,'Fried Rice',14),(54,'Chopsuey',14),(55,'Veg Pizzas',15),(56,'Non Veg Pizzas',15),(57,'Chocolate',16),(58,'Fruits',16),(59,'Breakfast',17),(60,'Lunch',17),(61,'Dinner',17),(62,'Appetizers',17),(63,'Deserts',17),(64,'Non Veg',18),(65,'Veg',18),(66,'Cool Drinks',18);
/*!40000 ALTER TABLE `menu_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_details_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  `item_quantity` int(11) NOT NULL,
  PRIMARY KEY (`order_details_id`),
  UNIQUE KEY `order_details_id_UNIQUE` (`order_details_id`),
  KEY `order_item_id_idx` (`item_id`),
  KEY `customer_orders_order_id_idx` (`order_id`),
  CONSTRAINT `customer_orders_order_id` FOREIGN KEY (`order_id`) REFERENCES `customer_orders` (`order_id`),
  CONSTRAINT `order_item_id` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (13,10,23,1),(14,10,27,1),(15,10,28,2),(16,11,24,1),(17,11,22,2),(18,12,35,1),(19,12,30,1),(20,12,32,2),(21,13,24,3),(22,13,26,2),(23,14,25,2),(24,14,24,3),(25,15,41,2),(26,15,39,1),(27,16,22,6),(28,16,26,3),(29,17,55,1);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `res_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `res_name` varchar(255) NOT NULL,
  `res_cuisine` varchar(45) NOT NULL,
  `res_zip_code` int(11) NOT NULL,
  `owner_user_id` int(10) unsigned NOT NULL,
  `res_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`res_id`),
  UNIQUE KEY `res_id_UNIQUE` (`res_id`),
  KEY `user_id_idx` (`owner_user_id`),
  CONSTRAINT `owner_user_id` FOREIGN KEY (`owner_user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (13,'Paradise','Hyderabadi',95110,47,'restaurant13-1570413359024.jpg'),(14,'Kim Fung','Chinese',98790,49,NULL),(15,'Pizza Den','Italian',98710,51,NULL),(16,'Thick Shake Factory','Icecreams',76890,52,NULL),(17,'Khana Khazana','North Indian',45678,53,NULL),(18,'Bawarchi','Hyderabadi',89700,54,NULL),(19,'Tipsy Topsy','Bakery',89007,56,NULL),(20,'Go Chinese','Chinese',98765,58,NULL);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `is_owner` tinyint(1) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (46,'Manovikas','manovikas@sjsu.edu','sha1$edb0e471$1$97265e5c1ac3f8528f67b2ebffe81a8b59d2188f','329 North 1st St, San Jose','6690006480',0,NULL),(47,'Charan','charan@sjsu.edu','sha1$98ac47c4$1$2763c56c7ad15a90430265ec966b5bace34b1447','55 W Santa Clara St, San Jose','7890001234',1,NULL),(48,'Abhinivesh','abhi@sjsu.edu','sha1$fba53e8c$1$d68470412905bedc1d5f01b15b73082e972311ab','33 S San Fernando','8870005678',0,NULL),(49,'Hari','hari@sjsu.edu','sha1$4da4f918$1$049aa6f1f3b5ca2631c89e560c1781831de77e82','45 E Sunnyvale','9987000123',1,NULL),(50,'Sachin','sachin@sjsu.edu','sha1$a604d1c8$1$fc995dc9cfa45e9fd5a20da57427efe4505084d1','38 N Saint John Street','7760099123',0,NULL),(51,'Revanth','revanth@sjsu.edu','sha1$1af75773$1$8bbccd7b06c07e8a95d4c5315b9d76d9f34d25c0','33 South Market St','9984321789',1,NULL),(52,'Mahesh','mahesh@sjsu.edu','sha1$bd88d587$1$20850e358956a5c02a82633fd6e58d0406a6b313','89 W Julian Street','99800771234',1,NULL),(53,'Pavan','pavan@sjsu.edu','sha1$0fb36937$1$d2c5376894468285d125cefc03d3148772691baf','223 South Street','77865430098',1,NULL),(54,'Sunil','sunil@sjsu.edu','sha1$e7fbf10d$1$c9241da82d9dfdab0db982a4f4f65410d4348b99','101 San Fernando','98780000789',1,NULL),(55,'Customer','customer@sjsu.edu','sha1$2fa49e30$1$8f9cb04b2584401736bff5933120609afee8c464','San Jose','9876543210',0,NULL),(56,'Owner','owner@sjsu.edu','sha1$0e0adef8$1$deefb639dba8e65a147130fe54f1eaa8b55d91f7','San Jose','1234567890',1,NULL),(57,'Prashanth','prashanth@sjsu.edu','sha1$663bfa1d$1$f3a8b794ad9d7e50e0a04f46caec378a8bbd1c16','St James Street','124568909',0,NULL),(58,'Karthik','karthik@sjsu.edu','sha1$2b5c9e4c$1$e2cf2e86ce9716067ec74901d09a4cd6a67524a6','109 Santa Clara','987654433567',1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'grubhub'
--

--
-- Dumping routines for database 'grubhub'
--
/*!50003 DROP PROCEDURE IF EXISTS `Completed_Orders_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Completed_Orders_get`(
    _user_id INT
)
BEGIN
	IF EXISTS (SELECT * FROM customer_orders WHERE user_id = _user_id) THEN
	SELECT 
        o.order_id, o.res_id, ou.address AS res_address, ou.phone_number AS res_phone_number, r.res_name, u.name, u.address, u.phone_number, r.res_zip_code, o.order_status,
        DATE_FORMAT(o.order_date, "%b %d, %Y %H : %i") as order_date, o.sub_total, o.tax, o.delivery, o.discount, o.total_price
	FROM customer_orders o
    JOIN restaurants r
    ON r.res_id = o.res_id
    JOIN users u
    ON u.user_id = o.user_id
    JOIN users ou
    ON ou.user_id = r.owner_user_id
    WHERE o.user_id = _user_id
    AND o.order_status IN ("DELIVERED", "ORDER_CANCELLED", "ORDER_DECLINED")
    ORDER BY o.order_date DESC;
	ELSE
    SELECT 'NO_COMPLETED_ORDERS' AS status;
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Customer_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Customer_get`(
    _user_id INT,
	_email_id VARCHAR(50)
)
BEGIN
	IF _user_id IS NULL THEN
		SELECT user_id INTO _user_id FROM users WHERE email_id = _email_id;
    END IF;
    
	SELECT 
        u.user_id, u.name, u.email_id, u.address, u.phone_number, u.user_image
	FROM users u
    WHERE _user_id IS NULL OR u.user_id = _user_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Customer_put` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Customer_put`(
	_name VARCHAR(50),
	_email_id VARCHAR(100),
	_password VARCHAR(100),
	_address VARCHAR(255),
    _phone_number VARCHAR(15)
)
BEGIN
	DECLARE _user_id INT;
	SELECT user_id INTO _user_id FROM users WHERE email_id = _email_id;

	IF _user_id IS NULL THEN
		INSERT INTO users (name, email_id, password,  address, phone_number, is_owner)
		VALUES (_name, _email_id, _password,  _address, _phone_number, FALSE);
        
        SELECT 'USER_ADDED' as status;
    ELSE
		SELECT user_id, 'USER_EXISTS' AS status FROM users WHERE email_id = _email_id;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Customer_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Customer_update`(
    _user_id INT,
	_email_id VARCHAR(50),
    _name VARCHAR(50),
    _password VARCHAR(100),
    _address VARCHAR(255),
    _phone_number VARCHAR(15)
)
BEGIN
    IF _user_id IS NULL THEN
		SELECT user_id INTO _user_id FROM users WHERE email_id = _email_id;
	END IF;
    
    IF _user_id IS NOT NULL THEN
    BEGIN
		UPDATE users
		SET name = _name, email_id = _email_id, address = _address, phone_number = _phone_number
		WHERE user_id = _user_id;
        
        IF _password IS NOT NULL THEN
			UPDATE users
            SET password = _password
            WHERE user_id = _user_id;
		END IF;
        
		SELECT 'CUSTOMER_UPDATED' AS status;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Items_del` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Items_del`(
	_item_id INT
    )
BEGIN
	IF EXISTS(SELECT * FROM menu_items WHERE item_id = _item_id) THEN
    BEGIN
        
        UPDATE menu_items SET is_active = 0 WHERE item_id = _item_id;
        
        SELECT 'ITEM_DELETED' AS status;
    END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Items_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Items_get`(
	    _res_id INT,
        _owner_user_id INT
)
BEGIN
	IF _res_id IS NULL THEN
		SELECT res_id INTO _res_id 
        FROM restaurants WHERE owner_user_id = _owner_user_id;
	END IF;
    
    SELECT mi.item_id, mi.item_name, mi.item_description, mi.item_price, mi.item_image,
    ms.menu_section_id, ms.menu_section_name, ms.res_id
    FROM menu_items mi
	LEFT OUTER JOIN menu_sections ms
    ON mi.menu_section_id = ms.menu_section_id
    WHERE mi.res_id = _res_id
    AND mi.is_active = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Items_put` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Items_put`(
	_owner_user_id INT,
    _res_id INT,
    _item_name VARCHAR(255),
    _item_description VARCHAR(255),
    _item_price FLOAT,
    _item_image VARCHAR(255),
    _menu_section_id INT,
    _menu_section_name VARCHAR(255)
)
BEGIN
    IF _res_id IS NULL THEN
		SELECT res_id INTO _res_id FROM restaurants
        WHERE owner_user_id = _owner_user_id;
	END IF;
    
    IF _menu_section_id IS NULL THEN
		SELECT menu_section_id INTO _menu_section_id FROM menu_sections
        WHERE menu_section_name = _menu_section_name
        AND res_id = _res_id;
	END IF;
    
    IF NOT EXISTS(SELECT * FROM menu_items WHERE item_name = _item_name AND res_id = _res_id) THEN
    BEGIN
		INSERT INTO menu_items (res_id, menu_section_id, item_name, item_description, item_image, item_price)
		VALUES(_res_id, _menu_section_id, _item_name, _item_description, _item_image, _item_price);
        
        SELECT 'ITEM_ADDED' AS status;
	END;
    ELSE
		SELECT 'ITEM_EXISTS' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Items_Record_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Items_Record_get`(
    _item_id INT
)
BEGIN
    IF EXISTS(SELECT * FROM menu_items WHERE item_id = _item_id) THEN
    BEGIN
		SELECT mi.item_id, mi.item_name, mi.item_description, mi.item_price, mi.item_image, mi.res_id,
        mi.menu_section_id, ms.menu_section_name 
        FROM menu_items mi
        INNER JOIN menu_sections ms
        ON mi.menu_section_id = ms.menu_section_id
        WHERE mi.item_id = _item_id
        AND mi.is_active = 1;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Items_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Items_update`(
	_owner_user_id INT,
    _res_id INT,
    _item_id INT,
    _item_name VARCHAR(255),
    _item_description VARCHAR(255),
    _item_price FLOAT,
    _item_image VARCHAR(255),
    _menu_section_id INT,
    _menu_section_name VARCHAR(255)
)
BEGIN
    IF _res_id IS NULL THEN
		SELECT res_id INTO _res_id FROM restaurants
        WHERE owner_user_id = _owner_user_id;
	END IF;
    
    IF _menu_section_id IS NULL THEN
		SELECT menu_section_id INTO _menu_section_id FROM menu_sections
        WHERE menu_section_name = _menu_section_name
        AND res_id = _res_id;
	END IF;
    
    IF NOT EXISTS(SELECT * FROM menu_items WHERE item_name = _item_name AND res_id = _res_id AND item_id <> _item_id) THEN
    BEGIN
		UPDATE menu_items 
        SET item_name = _item_name,
        item_description = _item_description,
        item_price = _item_price,
		menu_section_id = _menu_section_id
		WHERE item_id = _item_id AND res_id = _res_id;
	
        SELECT 'ITEM_UPDATED' AS status;
	END;
    ELSE
		SELECT 'ITEM_EXISTS' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Sections_del` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Sections_del`(
	_menu_section_id INT
    )
BEGIN
	IF EXISTS(SELECT * FROM menu_sections WHERE menu_section_id = _menu_section_id) THEN
    BEGIN
		UPDATE menu_items SET is_active = 0 WHERE menu_section_id = _menu_section_id;
        
		DELETE FROM menu_sections WHERE menu_section_id = _menu_section_id;
        
        SELECT 'SECTION_DELETED' AS status;
    END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Sections_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Sections_get`(
    _res_id INT,
    _user_id INT
)
BEGIN
    IF _res_id IS NULL THEN
		SELECT res_id INTO _res_id FROM restaurants WHERE owner_user_id = _user_id;
	END IF;
    
    IF EXISTS(SELECT * FROM menu_sections WHERE res_id = _res_id) THEN
    BEGIN
		SELECT menu_section_id, menu_section_name FROM menu_sections WHERE res_id = _res_id;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Sections_put` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Sections_put`(
    _res_id INT,
    _user_id INT,
    _menu_section_name VARCHAR(50)
)
BEGIN
	DECLARE _menu_section_id INT;
    IF _res_id IS NULL THEN
		SELECT res_id INTO _res_id FROM restaurants WHERE owner_user_id = _user_id;
	END IF;
    
    IF NOT EXISTS(SELECT * FROM menu_sections WHERE res_id = _res_id
    AND menu_section_name = _menu_section_name) THEN
    BEGIN
		INSERT INTO menu_sections(menu_section_name, res_id)
        VALUES(_menu_section_name, _res_id);
        
        SELECT menu_section_id INTO _menu_section_id FROM menu_sections 
        WHERE menu_section_name = _menu_section_name AND res_id = _res_id;
        
        SELECT _menu_section_id AS menu_section_id, _menu_section_name AS menu_section_name, 'SECTION_ADDED' AS status;
	END;
    ELSE
		SELECT 'SECTION_EXISTS' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Sections_Record_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Sections_Record_get`(
    _menu_section_id INT
)
BEGIN
    IF EXISTS(SELECT * FROM menu_sections WHERE menu_section_id = _menu_section_id) THEN
    BEGIN
		SELECT menu_section_id, menu_section_name FROM menu_sections WHERE menu_section_id = _menu_section_id;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Menu_Sections_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Menu_Sections_update`(
    _res_id INT,
    _user_id INT,
    _menu_section_id INT,
    _menu_section_name VARCHAR(50)
)
BEGIN
    IF _res_id IS NULL THEN
		SELECT res_id INTO _res_id FROM restaurants WHERE owner_user_id = _user_id;
	END IF;
    
    IF NOT EXISTS(SELECT * FROM menu_sections WHERE res_id = _res_id
    AND menu_section_name = _menu_section_name) THEN
    BEGIN
		UPDATE menu_sections SET menu_section_name = _menu_section_name
        WHERE res_id = _res_id AND menu_section_id = _menu_section_id;
        
        SELECT _menu_section_id AS menu_section_id, _menu_section_name AS menu_section_name, 'SECTION_UPDATED' AS status;
	END;
    ELSE
		SELECT 'SECTION_EXISTS' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Orders_Items_put` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Orders_Items_put`(
	_order_id INT,
    _item_id INT,
    _item_quantity INT
)
BEGIN
	IF NOT EXISTS(SELECT * FROM order_details WHERE order_id = _order_id AND item_id = _item_id) THEN
    BEGIN
		INSERT INTO order_details(order_id, item_id, item_quantity)
        VALUES(_order_id, _item_id, _item_quantity);
        
	END;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Orders_put` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Orders_put`(
	_user_id INT,
    _res_id INT,
    _order_status VARCHAR(255),
    _sub_total FLOAT,
    _tax FLOAT,
    _delivery FLOAT,
    _discount FLOAT,
    _total_price FLOAT
)
BEGIN
    DECLARE _order_datetime DATETIME;
    DECLARE _order_id INT;
    
    SELECT CURRENT_TIMESTAMP() INTO _order_datetime;
    
    IF _res_id IS NOT NULL THEN
    BEGIN
		INSERT INTO customer_orders(user_id, res_id, order_status, sub_total, tax, delivery, discount, total_price, order_date)
        VALUES(_user_id, _res_id, _order_status, _sub_total, _tax, _delivery, _discount, _total_price, CURRENT_TIMESTAMP());
		
        SELECT order_id INTO _order_id FROM customer_orders WHERE user_id = _user_id AND res_id = _res_id AND order_date = _order_datetime;
        
		SELECT _order_id AS order_id, 'ORDER_PLACED' AS status;
    END;
    ELSE
		SELECT 'ORDER_ERROR' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Order_Items_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Order_Items_get`(
    _order_id INT
)
BEGIN
	IF EXISTS (SELECT * FROM order_details WHERE order_id = _order_id) THEN
	SELECT 
        o.order_id, o.item_id, o.item_quantity, mi.item_name, mi.item_price, mi.item_description
	FROM order_details o
    JOIN menu_items mi
    ON mi.item_id = o.item_id
    WHERE o.order_id = _order_id;
	ELSE
    SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Password_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Password_get`(
	_email_id VARCHAR(100)
)
BEGIN

	IF EXISTS(SELECT user_id FROM users WHERE email_id = _email_id) THEN
		SELECT user_id, email_id, password, name, is_owner, address, phone_number, user_image, 1 AS status FROM users WHERE email_id = _email_id;
	ELSE
		SELECT 0 AS status;
	END IF;
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Pending_Orders_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Pending_Orders_get`(
    _user_id INT
)
BEGIN
	IF EXISTS (SELECT * FROM customer_orders WHERE user_id = _user_id) THEN
	SELECT 
        o.order_id, o.res_id, r.res_name, ou.address AS res_address, u.name, u.address, u.phone_number, r.res_zip_code, o.order_status,
        DATE_FORMAT(o.order_date, "%b %d, %Y %H : %i") as order_date, o.sub_total, o.tax, o.delivery, o.discount, o.total_price
	FROM customer_orders o
    JOIN restaurants r
    ON r.res_id = o.res_id
    JOIN users u
    ON u.user_id = o.user_id
    JOIN users ou
    ON ou.user_id = r.owner_user_id
    WHERE o.user_id = _user_id
    AND o.order_status NOT IN ("DELIVERED", "ORDER_CANCELLED", "ORDER_DECLINED")
    ORDER BY o.order_date DESC;
	ELSE
    SELECT 'NO_PENDING_ORDERS' AS status;
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Restaurant_Completed_Orders_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Restaurant_Completed_Orders_get`(
    _owner_user_id INT
)
BEGIN
	DECLARE _res_id INT;
    
    SELECT res_id INTO _res_id FROM restaurants WHERE owner_user_id = _owner_user_id;
    
	IF EXISTS (SELECT * FROM customer_orders WHERE res_id = _res_id) THEN
	SELECT 
        o.order_id, o.res_id, o.order_status, o.user_id, u.name, u.address, u.phone_number, r.res_name, r.res_zip_code,
        DATE_FORMAT(o.order_date, "%b %d, %Y %H : %i") as order_date, o.sub_total, o.tax, o.delivery, o.discount, o.total_price
	FROM customer_orders o
    JOIN users u
    ON u.user_id = o.user_id
    JOIN restaurants r
    ON r.res_id = o.res_id
    WHERE o.res_id = _res_id
    AND o.order_status IN ("DELIVERED", "ORDER_CANCELLED", "ORDER_DECLINED")
    ORDER BY o.order_date DESC;
	ELSE
    SELECT 'NO_COMPLETED_ORDERS' AS status;
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Restaurant_Owner_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Restaurant_Owner_get`(
    _owner_user_id INT,
	_email_id VARCHAR(50),
    _res_id INT
)
BEGIN
	IF _owner_user_id IS NULL THEN
		SELECT user_id INTO _owner_user_id FROM users WHERE email_id = _email_id;
    END IF;
    
	SELECT 
        u.user_id, u.name, u.email_id, u.address, u.phone_number, u.user_image, r.res_id, r.res_name, r.res_cuisine, r.res_zip_code, r.res_image
	FROM users u
    INNER JOIN restaurants r
    ON u.user_id = r.owner_user_id
    WHERE (_owner_user_id IS NULL OR u.user_id = _owner_user_id)
    AND (_res_id IS NULL OR r.res_id = _res_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Restaurant_Owner_put` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Restaurant_Owner_put`(
	_name VARCHAR(50),
    _res_name VARCHAR(50),
    _res_cuisine VARCHAR(50),
	_email_id VARCHAR(100),
	_password VARCHAR(100),
    _res_zip_code INT,
	_address VARCHAR(255),
	_phone_number VARCHAR(15)
)
BEGIN
	DECLARE _user_id INT;
	SELECT user_id INTO _user_id FROM users WHERE email_id = _email_id;

	IF _user_id IS NULL THEN
    BEGIN
		INSERT INTO users (name, email_id, password,  address, phone_number, is_owner)
		VALUES (_name, _email_id, _password,  _address, _phone_number, 1);
	
		SELECT user_id INTO _user_id FROM users WHERE email_id = _email_id;
        
        INSERT INTO restaurants (res_name, res_cuisine, res_zip_code, owner_user_id)
        VALUES (_res_name, _res_cuisine, _res_zip_code, _user_id);
        
        SELECT res_id, owner_user_id, 'USER_ADDED' AS status FROM restaurants WHERE owner_user_id = _user_id;
	END;
    ELSE
		SELECT 'USER_EXISTS' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Restaurant_Owner_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Restaurant_Owner_update`(
    _user_id INT,
	_email_id VARCHAR(50),
    _name VARCHAR(50),
    _res_name VARCHAR(50),
    _res_cuisine VARCHAR(50),
    _password VARCHAR(100),
    _res_zip_code INT,
    _address VARCHAR(255),
    _phone_number VARCHAR(15)
)
BEGIN
	DECLARE _res_id INT;
	IF _user_id IS NULL THEN
		SELECT user_id INTO _user_id FROM users WHERE email_id = _email_id;
    END IF;
    
    IF _user_id IS NOT NULL THEN
    BEGIN
		UPDATE users
		SET name = _name, address = _address, phone_number = _phone_number
		WHERE user_id = _user_id;
        
        IF _password IS NOT NULL THEN
			UPDATE users
            SET password = _password
            WHERE user_id = _user_id;
		END IF;
        
        SELECT res_id INTO _res_id FROM restaurants WHERE owner_user_id = _user_id;
        
        UPDATE restaurants
		SET res_name = _res_name, res_cuisine = _res_cuisine, res_zip_code = _res_zip_code
		WHERE res_id = _res_id;
        
        SELECT 'RESTAURANT_UPDATED' AS status;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
	END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Restaurant_Pending_Orders_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Restaurant_Pending_Orders_get`(
    _owner_user_id INT
)
BEGIN
	DECLARE _res_id INT;
    
    SELECT res_id INTO _res_id FROM restaurants WHERE owner_user_id = _owner_user_id;
    
	IF EXISTS (SELECT * FROM customer_orders WHERE res_id = _res_id) THEN
	SELECT 
        o.order_id, o.res_id, r.res_name, o.order_status, o.user_id, u.name, u.address, u.phone_number,
        DATE_FORMAT(o.order_date, "%b %d, %Y %H : %i") as order_date, o.sub_total, o.tax, o.delivery, o.discount, o.total_price
	FROM customer_orders o
    JOIN users u
    ON u.user_id = o.user_id
    JOIN restaurants r
    ON r.res_id = o.res_id
    WHERE o.res_id = _res_id
    AND o.order_status NOT IN ("DELIVERED", "ORDER_CANCELLED", "ORDER_DECLINED")
    ORDER BY o.order_date DESC;
	ELSE
    SELECT 'NO_PENDING_ORDERS' AS status;
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Search_Result_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Search_Result_get`(
	_search_input VARCHAR(50)
)
BEGIN
	DECLARE _search_string VARCHAR(50);
    SET _search_string = CONCAT('%', _search_input, '%');
    
    IF EXISTS(SELECT 
        r.res_id
	FROM restaurants r
	LEFT OUTER JOIN menu_items mi
    ON mi.res_id = r.res_id
    LEFT OUTER JOIN menu_sections ms
    ON ms.res_id = r.res_id
    WHERE (mi.is_active IS NULL OR mi.is_active = 1)
    AND (mi.item_name LIKE _search_string
    OR mi.item_description LIKE _search_string
    OR r.res_name LIKE _search_string
    OR r.res_cuisine LIKE _search_string
    OR ms.menu_section_name LIKE _search_string)) THEN

	SELECT DISTINCT 
    r.res_id, r.res_name, r.res_cuisine, r.res_zip_code, r.res_image, r.owner_user_id, u.address, u.phone_number
	FROM restaurants r
	LEFT OUTER JOIN menu_items mi
    ON mi.res_id = r.res_id
    LEFT OUTER JOIN menu_sections ms
    ON ms.res_id = r.res_id
    LEFT OUTER JOIN users u
    ON u.user_id = r.owner_user_id
    WHERE (mi.is_active IS NULL OR mi.is_active = 1)
    AND (mi.item_name LIKE _search_string
    OR mi.item_description LIKE _search_string
    OR r.res_name LIKE _search_string
    OR r.res_cuisine LIKE _search_string
    OR ms.menu_section_name LIKE _search_string);
    ELSE
    SELECT 'NO_RECORD' AS search_result;
    END IF;


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

-- Dump completed on 2019-10-09 22:39:32
