-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2025 a las 21:19:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `salon_eventos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `id_salon` int(11) NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `num_participantes` int(11) NOT NULL,
  `costo_total` decimal(10,2) NOT NULL,
  `fecha_reserva` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','confirmada','cancelada') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `id_salon`, `nombre_completo`, `email`, `telefono`, `fecha_inicio`, `fecha_fin`, `num_participantes`, `costo_total`, `fecha_reserva`, `estado`) VALUES
(1, 1, 'David Caro Morales', 'admin@admin.com', '3232231834', '2025-07-28', '2025-07-31', 1, 2100.00, '2025-07-06 20:24:37', 'pendiente'),
(3, 1, 'David Caro Morales', 'david123@gmail.com', '3232231834', '2025-08-01', '2025-08-05', 1, 2800.00, '2025-07-07 14:18:29', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salon`
--

CREATE TABLE `salon` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_dia` decimal(10,2) NOT NULL,
  `precio_noche` decimal(10,2) DEFAULT NULL,
  `amenidades` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salon`
--

INSERT INTO `salon` (`id`, `nombre`, `descripcion`, `precio_dia`, `precio_noche`, `amenidades`) VALUES
(1, 'Salón de Eventos Oasis', 'Nuestro Salón de Eventos Oasis es el lugar perfecto para celebrar tus momentos más especiales. Con una arquitectura elegante y versátil, ofrecemos un ambiente inigualable para bodas, quinceañeras, eventos corporativos y más. Contamos con una capacidad de hasta 200 personas y personal altamente capacitado para asegurar que tu evento sea un éxito rotundo.', 500.00, 700.00, 'Aire acondicionado,Equipo de sonido,Iluminación,Proyector,Cocina equipada,Estacionamiento,Wifi,Seguridad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salon_imagenes`
--

CREATE TABLE `salon_imagenes` (
  `id` int(11) NOT NULL,
  `id_salon` int(11) NOT NULL,
  `url_imagen` varchar(512) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `es_banner` tinyint(1) DEFAULT 0,
  `orden` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salon_imagenes`
--

INSERT INTO `salon_imagenes` (`id`, `id_salon`, `url_imagen`, `alt_text`, `es_banner`, `orden`) VALUES
(1, 1, '/assets/banner-img-1.jpg', 'Salón de eventos bellamente decorado', 1, 1),
(2, 1, '/assets/salon-img-1.jpg', 'Vista general del salón', 0, 2),
(3, 1, '/assets/salon-img-2.jpg', 'Salón decorado para boda', 0, 3),
(4, 1, '/assets/salon-img-3.jpg', 'Área de recepción', 0, 4),
(5, 1, '/assets/gallery-img-1.jpg', 'Evento nocturno', 0, 5),
(6, 1, '/assets/gallery-img-2.jpg', 'Decoración floral', 0, 6),
(7, 1, '/assets/gallery-img-3.jpg', 'Mesa de dulces', 0, 7),
(8, 1, '/assets/gallery-img-4.jpg', 'Pista de baile', 0, 8),
(9, 1, '/assets/gallery-img-5.jpg', 'Barra de bebidas', 0, 9),
(10, 1, '/assets/gallery-img-6.jpg', 'Fachada del salón', 0, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `testimonios`
--

CREATE TABLE `testimonios` (
  `id` int(11) NOT NULL,
  `nombre_cliente` varchar(255) NOT NULL,
  `comentario` text NOT NULL,
  `calificacion` int(11) DEFAULT NULL CHECK (`calificacion` >= 1 and `calificacion` <= 5),
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `aprobado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `testimonios`
--

INSERT INTO `testimonios` (`id`, `nombre_cliente`, `comentario`, `calificacion`, `fecha_creacion`, `aprobado`) VALUES
(1, 'Ana M.', 'El Salón superó todas nuestras expectativas. Nuestra boda fue mágica, el equipo es muy profesional. ¡Lo recomendamos al 100%!', 5, '2025-07-06 14:24:00', 1),
(2, 'Luis P.', 'Celebré mi cumpleaños aquí y todo fue perfecto. El espacio es hermoso y la atención al detalle es impecable. ¡Gracias!', 4, '2025-07-06 14:24:00', 1),
(3, 'Sofía G.', 'Un lugar increíble para eventos corporativos. El ambiente es sofisticado y la tecnología funciona de maravilla. Volveremos.', 5, '2025-07-06 14:24:00', 1),
(4, 'Diego R.', 'El personal fue muy atento y flexible con nuestras peticiones. Mi quinceañera fue un sueño hecho realidad. Muy agradecida.', 5, '2025-07-06 14:24:00', 1),
(5, 'David Caro', 'Este salón me encantó. Es de lo mejor', 5, '2025-07-07 01:27:17', 1),
(6, 'BETO MAMANI', 'nhhhhh', 5, '2025-07-07 02:30:02', 0),
(7, 'David David', 'Excelente lugar', 4, '2025-07-07 13:21:34', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_salon` (`id_salon`);

--
-- Indices de la tabla `salon`
--
ALTER TABLE `salon`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `salon_imagenes`
--
ALTER TABLE `salon_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_salon` (`id_salon`);

--
-- Indices de la tabla `testimonios`
--
ALTER TABLE `testimonios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `salon`
--
ALTER TABLE `salon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `salon_imagenes`
--
ALTER TABLE `salon_imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `testimonios`
--
ALTER TABLE `testimonios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_salon`) REFERENCES `salon` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `salon_imagenes`
--
ALTER TABLE `salon_imagenes`
  ADD CONSTRAINT `salon_imagenes_ibfk_1` FOREIGN KEY (`id_salon`) REFERENCES `salon` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
