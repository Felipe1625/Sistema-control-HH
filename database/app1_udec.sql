-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-03-2020 a las 14:06:39
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app1_udec`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `IdAdmin` int(11) NOT NULL,
  `Rut` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Apellido` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Password` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Habilitado` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`IdAdmin`, `Rut`, `Nombre`, `Apellido`, `Password`, `Habilitado`) VALUES
(17, '11.111.111-1', 'Admin', 'Prueba', '12345', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motivopausa`
--

CREATE TABLE `motivopausa` (
  `IdMotivoPausa` int(11) NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operador`
--

CREATE TABLE `operador` (
  `IdOperador` int(11) NOT NULL,
  `IdPuestoTrabajador` int(11) NOT NULL,
  `Rut` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Apellido` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Presente` tinyint(1) NOT NULL DEFAULT '1',
  `Habilitado` tinyint(1) NOT NULL DEFAULT '1',
  `Password` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ot`
--

CREATE TABLE `ot` (
  `IdOt` int(11) NOT NULL,
  `Codigo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `HorasPresupuestadas` varchar(20) COLLATE utf8_spanish2_ci NOT NULL DEFAULT '00:00:00',
  `HorasTrabajadas` varchar(20) COLLATE utf8_spanish2_ci NOT NULL DEFAULT '00:00:00',
  `Activa` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pausa`
--

CREATE TABLE `pausa` (
  `IdPausa` int(11) NOT NULL,
  `IdTrabajo` int(11) NOT NULL,
  `IdMotivoPausa` int(11) NOT NULL,
  `Fecha` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `HoraInicio` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `HoraFin` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `TotalTiempo` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puestotrabajador`
--

CREATE TABLE `puestotrabajador` (
  `IdPuestoTrabajador` int(11) NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiempo`
--

CREATE TABLE `tiempo` (
  `IdTiempo` int(11) NOT NULL,
  `IdTrabajo` int(11) NOT NULL,
  `IdOperador` int(11) NOT NULL,
  `Fecha` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `HoraInicio` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `HoraFin` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `TotalTiempo` varchar(10) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajo`
--

CREATE TABLE `trabajo` (
  `IdTrabajo` int(11) NOT NULL,
  `IdOt` int(11) NOT NULL,
  `IdOperador` int(11) NOT NULL,
  `Fecha` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `HoraInicio` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `HoraFin` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `TotalTiempo` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`IdAdmin`),
  ADD UNIQUE KEY `Rut` (`Rut`);

--
-- Indices de la tabla `motivopausa`
--
ALTER TABLE `motivopausa`
  ADD PRIMARY KEY (`IdMotivoPausa`);

--
-- Indices de la tabla `operador`
--
ALTER TABLE `operador`
  ADD PRIMARY KEY (`IdOperador`),
  ADD UNIQUE KEY `Rut` (`Rut`),
  ADD KEY `FK_puestotrabajador` (`IdPuestoTrabajador`);

--
-- Indices de la tabla `ot`
--
ALTER TABLE `ot`
  ADD PRIMARY KEY (`IdOt`),
  ADD UNIQUE KEY `Codigo` (`Codigo`);

--
-- Indices de la tabla `pausa`
--
ALTER TABLE `pausa`
  ADD PRIMARY KEY (`IdPausa`),
  ADD KEY `FK_trabajo` (`IdTrabajo`),
  ADD KEY `FK_motivopausa` (`IdMotivoPausa`);

--
-- Indices de la tabla `puestotrabajador`
--
ALTER TABLE `puestotrabajador`
  ADD PRIMARY KEY (`IdPuestoTrabajador`);

--
-- Indices de la tabla `tiempo`
--
ALTER TABLE `tiempo`
  ADD PRIMARY KEY (`IdTiempo`),
  ADD KEY `FK_operador` (`IdOperador`),
  ADD KEY `FK_trabajo` (`IdTrabajo`) USING BTREE;

--
-- Indices de la tabla `trabajo`
--
ALTER TABLE `trabajo`
  ADD PRIMARY KEY (`IdTrabajo`),
  ADD KEY `FK_ot` (`IdOt`),
  ADD KEY `FK_operador` (`IdOperador`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `IdAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `motivopausa`
--
ALTER TABLE `motivopausa`
  MODIFY `IdMotivoPausa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `operador`
--
ALTER TABLE `operador`
  MODIFY `IdOperador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `ot`
--
ALTER TABLE `ot`
  MODIFY `IdOt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `pausa`
--
ALTER TABLE `pausa`
  MODIFY `IdPausa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- AUTO_INCREMENT de la tabla `puestotrabajador`
--
ALTER TABLE `puestotrabajador`
  MODIFY `IdPuestoTrabajador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tiempo`
--
ALTER TABLE `tiempo`
  MODIFY `IdTiempo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT de la tabla `trabajo`
--
ALTER TABLE `trabajo`
  MODIFY `IdTrabajo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=325;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `operador`
--
ALTER TABLE `operador`
  ADD CONSTRAINT `FK_puestotrabajador` FOREIGN KEY (`IdPuestoTrabajador`) REFERENCES `puestotrabajador` (`IdPuestoTrabajador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pausa`
--
ALTER TABLE `pausa`
  ADD CONSTRAINT `FK_motivopausa` FOREIGN KEY (`IdMotivoPausa`) REFERENCES `motivopausa` (`IdMotivoPausa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_trabajo` FOREIGN KEY (`IdTrabajo`) REFERENCES `trabajo` (`IdTrabajo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `trabajo`
--
ALTER TABLE `trabajo`
  ADD CONSTRAINT `FK_operadorr` FOREIGN KEY (`IdOperador`) REFERENCES `operador` (`IdOperador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ot` FOREIGN KEY (`IdOt`) REFERENCES `ot` (`IdOt`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
