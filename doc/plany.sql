
SELECT `Clients`.`clientId`, `Clients`.`name`, `Clients`.`defaultRate`, `Clients`.`userId`, `Projects`.`projectId` AS `Projects.projectId`, `Projects`.`name` AS `Projects.name`, `Projects`.`budget` AS `Projects.budget`, `Projects`.`timeAllocated` AS `Projects.timeAllocated`, `Projects`.`realRate` AS `Projects.realRate`, `Projects`.`period` AS `Projects.period`, `Projects`.`year` AS `Projects.year`, `Projects`.`startDate` AS `Projects.startDate`, `Projects`.`clientId` AS `Projects.clientId` 
FROM `Clients` AS `Clients` 
INNER JOIN `Projects` AS `Projects` ON `Clients`.`clientId` = `Projects`.`clientId` AND `Projects`.`year` = 2023 
WHERE `Clients`.`userId` = 1 
ORDER BY `Projects`.`name` ASC;
--- 
CREATE TABLE `Clients` (
	`clientId` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`defaultRate` float,
	`userId` int,
	PRIMARY KEY (`clientId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

  CREATE TABLE `Plannings` (
	`planningId` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`startDate` datetime NOT NULL,
	`duration` int NOT NULL,
	`taskId` int,
	PRIMARY KEY (`planningId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

  CREATE TABLE `Projects` (
	`projectId` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`budget` float,
	`timeAllocated` float,
	`realRate` float NOT NULL,
	`period` varchar(255),
	`year` varchar(255) NOT NULL,
	`startDate` datetime,
	`clientId` int,
	PRIMARY KEY (`projectId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Tasks` (
	`taskId` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`steps` int NOT NULL,
	`projectId` int,
	PRIMARY KEY (`taskId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE `users` (
	`userId` int NOT NULL AUTO_INCREMENT,
	`last_name` varchar(255) NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`pwdDatetime` datetime,
	`level` tinyint NOT NULL COMMENT '1 = dealer, 2 = administrator',
	`CMR` tinyint,
	PRIMARY KEY (`userId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

