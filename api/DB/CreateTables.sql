CREATE DATABASE db_fiap;
USE db_fiap;

CREATE TABLE `db_fiap`.`tb_feedback` (
  `id_feedback` INT NOT NULL AUTO_INCREMENT,
  `feedback` TEXT NULL,
  `stars` INT NOT NULL,
  PRIMARY KEY (`id_feedback`));
