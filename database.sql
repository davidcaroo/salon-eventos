-- Tabla para almacenar la información del salón (si hay múltiples salones o detalles que se puedan modificar)
CREATE TABLE IF NOT EXISTS salon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio_dia DECIMAL(10, 2) NOT NULL,
    precio_noche DECIMAL(10, 2) NOT NULL,
    capacidad INT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    
);

-- Tabla para almacenar las reservas
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_salon INT NOT NULL, -- Si hay múltiples salones
    nombre_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    num_participantes INT NOT NULL,
    costo_total DECIMAL(10, 2) NOT NULL,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (id_salon) REFERENCES salon(id)
);

-- Tabla para almacenar testimonios
CREATE TABLE IF NOT EXISTS testimonios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(255) NOT NULL,
    comentario TEXT NOT NULL,
    calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    aprobado BOOLEAN DEFAULT FALSE -- Para moderar testimonios
);