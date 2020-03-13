-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 25, 2020 at 11:22 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gimnasio`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(70) NOT NULL,
  `direccion` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `edad` tinyint(3) NOT NULL,
  `sexo` enum('M','F','Other') NOT NULL,
  `fecha_inscripcion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cuota` decimal(5,2) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `dni` int(10) UNSIGNED ZEROFILL NOT NULL,
  `fk_profesor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `apellidos`, `direccion`, `email`, `edad`, `sexo`, `fecha_inscripcion`, `cuota`, `fecha_nacimiento`, `dni`, `fk_profesor`) VALUES
(1, 'Juan Antonio', 'Perez Jarillo', 'Plaza de baguete 9', 'juan@gmail.com', 37, 'M', '2019-01-24 09:42:20', '39.90', '1982-03-05', 0050432567, 1),
(2, 'Pepe', 'Villuela', 'Plaza de España 12', 'pepe@gmail.com', 70, 'M', '2019-10-24 08:42:20', '19.90', '1949-03-05', 0000890765, 3),
(3, 'Maria', 'Lopez', 'Plaza de baguete 10', 'maria@gmail.com', 29, 'F', '2019-05-24 08:42:20', '19.90', '2000-10-15', 0045678990, 1),
(4, 'Lucia', 'Gimenez', 'Plaza de Lima 12', 'lucia@gmail.com', 29, 'F', '2019-10-24 08:42:20', '39.90', '1990-03-05', 0002345678, 3),
(6, 'Sergio', 'Lopez', 'Plaza de don paquito 13', 'sergio@gmail.com', 41, 'M', '2019-09-24 08:42:20', '19.90', '1979-11-05', 0000987578, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `duracion` time NOT NULL,
  `repeticiones` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `titulo`, `duracion`, `repeticiones`) VALUES
(1, 'Plancha abdominal', '00:05:00', 10),
(2, 'Cinta', '00:45:00', 1),
(12, 'Sentadillas', '00:12:00', 100),
(13, 'Pull ups', '00:05:00', 10),
(14, 'Ball Wall', '00:02:00', 10),
(15, 'Pino', '00:01:00', 20),
(16, 'Remo', '00:20:00', 1),
(17, 'backsquat', '00:01:30', 4),
(18, 'Flexiones', '00:01:00', 20);

-- --------------------------------------------------------

--
-- Table structure for table `profesores`
--

CREATE TABLE `profesores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `experiencia` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profesores`
--

INSERT INTO `profesores` (`id`, `nombre`, `experiencia`) VALUES
(1, 'Alicia', 3),
(3, 'Joaquin', 7);

-- --------------------------------------------------------

--
-- Table structure for table `tbi_cliente_ejercicios`
--

CREATE TABLE `tbi_cliente_ejercicios` (
  `id` int(11) NOT NULL,
  `fk_clientes` int(11) NOT NULL,
  `fk_ejercicios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbi_cliente_ejercicios`
--

INSERT INTO `tbi_cliente_ejercicios` (`id`, `fk_clientes`, `fk_ejercicios`) VALUES
(1, 1, 17),
(2, 1, 16),
(3, 1, 12),
(4, 4, 12),
(5, 4, 1),
(6, 4, 13),
(7, 3, 15),
(8, 3, 1),
(9, 3, 2),
(14, 1, 18),
(17, 6, 13),
(18, 6, 16),
(19, 6, 12),
(20, 6, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_profesor` (`fk_profesor`);

--
-- Indexes for table `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbi_cliente_ejercicios`
--
ALTER TABLE `tbi_cliente_ejercicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_clientes` (`fk_clientes`),
  ADD KEY `fk_ejercicios` (`fk_ejercicios`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbi_cliente_ejercicios`
--
ALTER TABLE `tbi_cliente_ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_profesores` FOREIGN KEY (`fk_profesor`) REFERENCES `profesores` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `tbi_cliente_ejercicios`
--
ALTER TABLE `tbi_cliente_ejercicios`
  ADD CONSTRAINT `clientes_tbi` FOREIGN KEY (`fk_clientes`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ejercicios_tbi` FOREIGN KEY (`fk_ejercicios`) REFERENCES `ejercicios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
