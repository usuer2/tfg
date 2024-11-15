-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2024 a las 01:24:56
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_usuario`
--

CREATE TABLE `datos_usuario` (
  `usuario` varchar(30) NOT NULL,
  `contrasena` varchar(40) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datos_usuario`
--

INSERT INTO `datos_usuario` (`usuario`, `contrasena`, `correo`, `telefono`) VALUES
('Miguel30', '12345', 'pruebasMBG@outlook.es', '610306423'),
('Usuario_Publico', '123456789', 'pgortells@yahoo.es', '626663545');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_vehiculo`
--

CREATE TABLE `datos_vehiculo` (
  `matricula` varchar(15) NOT NULL,
  `propietario` varchar(20) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `consumo_medio` decimal(4,2) NOT NULL,
  `deposito` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datos_vehiculo`
--

INSERT INTO `datos_vehiculo` (`matricula`, `propietario`, `marca`, `modelo`, `consumo_medio`, `deposito`) VALUES
('5697JZF', 'Miguel30', 'Mercedes', 'Clase b 180', 4.70, 50);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `datos_usuario`
--
ALTER TABLE `datos_usuario`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `datos_vehiculo`
--
ALTER TABLE `datos_vehiculo`
  ADD PRIMARY KEY (`matricula`),
  ADD KEY `propietario` (`propietario`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `datos_vehiculo`
--
ALTER TABLE `datos_vehiculo`
  ADD CONSTRAINT `datos_vehiculo_ibfk_1` FOREIGN KEY (`propietario`) REFERENCES `datos_usuario` (`usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
