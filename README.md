Sistema de Reservas para Salón de Eventos
Este proyecto es un sistema completo de reservas para un salón de eventos, desarrollado con un frontend en React y un backend en PHP con MySQL. Permite a los usuarios visualizar información del salón, explorar galerías, leer testimonios y realizar reservas de manera interactiva.

Descripción del Proyecto
El "Sistema de Reservas para Salón de Eventos" es una aplicación web diseñada para simplificar el proceso de reserva de un salón de eventos. Ofrece una experiencia de usuario intuitiva a través de una landing page responsive y un formulario de reserva modal dinámico. El backend gestiona la lógica de negocio, la persistencia de datos y la verificación de disponibilidad.

Características
Frontend (React)
Landing Page Responsive:

Header: Logo del salón y menú de navegación con scroll suave.

Banner Principal: Carrusel de imágenes destacadas con título y descripción.

Sección del Salón:

Imágenes de alta calidad (carrusel).

Descripción detallada del salón.

Lista de amenidades.

Precios por día/noche.

Botón "Reservar Ahora" destacado.

Sección Galería: Visualización de fotos del salón en formato de cuadrícula de cards.

Sección Testimonios: Muestra comentarios y calificaciones de clientes.

Footer: Información de contacto y enlaces a redes sociales.

Formulario Modal de Reservas:

Activado al hacer clic en "Reservar Ahora".

Campos requeridos: Nombre completo, Email, Teléfono, Fecha de inicio, Fecha de fin, Número de participantes.

Validación de campos en tiempo real.

Calendario interactivo para selección de fechas (deshabilita fechas ocupadas).

Cálculo automático del costo total.

Botón de confirmación.

Experiencia de Usuario:

Animaciones suaves para transiciones.

Mensajes de confirmación/error (usando react-toastify).

Diseño intuitivo y profesional.

Optimización completa para dispositivos móviles.

Backend (PHP con MySQL)
API RESTful: Provee endpoints para gestionar:

Información del salón (descripción, precios, amenidades).

Imágenes del salón (para galería y banner).

Verificación de disponibilidad de fechas.

Creación de nuevas reservas.

Gestión de testimonios (obtener y enviar).

Base de Datos MySQL:

Tablas para salon, salon_imagenes, reservas y testimonios.

Manejo de relaciones entre tablas.

Seguridad:

Configuración de encabezados CORS para permitir comunicación entre frontend y backend.

Sanitización de datos de entrada para prevenir inyecciones SQL y XSS.

Validación de datos en el servidor.

Modularidad: Código organizado en archivos separados para configuración, utilidades y endpoints de API.

Tecnologías Utilizadas
Frontend
React.js: Biblioteca JavaScript para construir interfaces de usuario.

HTML5 / CSS3: Estructura y estilos de la aplicación.

CSS Modules: Para evitar conflictos de estilos.

react-router-dom: Para navegación (aunque en una landing page simple se usa más react-scroll).

axios: Cliente HTTP para hacer solicitudes a la API.

react-datepicker: Selector de fechas interactivo.

react-toastify: Para notificaciones de confirmación/error.

react-responsive-carousel: Para los carruseles de imágenes.

react-icons: Para íconos (ej. estrellas en testimonios).

react-scroll: Para el scroll suave entre secciones.

Backend
PHP: Lenguaje de programación del lado del servidor.

MySQL: Sistema de gestión de bases de datos relacionales.

PDO: Extensión de PHP para acceso a bases de datos, utilizando sentencias preparadas para seguridad.

phpMyAdmin: Herramienta web para la administración de bases de datos MySQL.

Estructura del Proyecto
/tu-proyecto/
├── frontend-salon-eventos/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Banner/
│   │   │   ├── SalonSection/
│   │   │   ├── GallerySection/
│   │   │   ├── TestimonialsSection/
│   │   │   ├── Modal/
│   │   │   ├── ReservationForm/
│   │   │   └── Card/
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   └── App.css
│   ├── .env
│   ├── package.json
│   └── README.md (Este archivo)
│
└── backend/
    ├── api/
    │   └── v1/
    │       ├── reservas.php
    │       ├── salon.php
    │       └── testimonios.php
    ├── config/
    │   └── database.php
    ├── helpers/
    │   └── utils.php
    └── index.php

Configuración y Ejecución
Requisitos Previos
XAMPP: Con Apache y MySQL en ejecución.

Node.js y npm (o Yarn): Para el desarrollo del frontend con React.

1. Configuración del Backend (PHP y MySQL)
Crea la Base de Datos:

Abre phpMyAdmin (generalmente http://localhost/phpmyadmin/).

Crea una nueva base de datos llamada salon_eventos_db.

Ejecuta el siguiente script SQL en la pestaña "SQL" de tu nueva base de datos para crear las tablas:

-- Tabla para almacenar la información del salón
CREATE TABLE IF NOT EXISTS salon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio_dia DECIMAL(10, 2) NOT NULL,
    precio_noche DECIMAL(10, 2),
    amenidades TEXT
);

-- Tabla para almacenar las imágenes del salón
CREATE TABLE IF NOT EXISTS salon_imagenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_salon INT NOT NULL,
    url_imagen VARCHAR(512) NOT NULL,
    alt_text VARCHAR(255),
    es_banner BOOLEAN DEFAULT FALSE,
    orden INT DEFAULT 0,
    FOREIGN KEY (id_salon) REFERENCES salon(id) ON DELETE CASCADE
);

-- Tabla para almacenar las reservas
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_salon INT NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    num_participantes INT NOT NULL,
    costo_total DECIMAL(10, 2) NOT NULL,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (id_salon) REFERENCES salon(id) ON DELETE CASCADE
);

-- Tabla para almacenar testimonios
CREATE TABLE IF NOT EXISTS testimonios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(255) NOT NULL,
    comentario TEXT NOT NULL,
    calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    aprobado BOOLEAN DEFAULT FALSE
);

Inserta Datos de Ejemplo (Opcional pero recomendado):
Puedes insertar datos iniciales para el salón, imágenes y testimonios utilizando las siguientes consultas SQL en phpMyAdmin:

INSERT INTO salon (nombre, descripcion, precio_dia, precio_noche, amenidades) VALUES
('Salón de Eventos Oasis', 'Nuestro Salón de Eventos Oasis es el lugar perfecto para celebrar tus momentos más especiales. Con una arquitectura elegante y versátil, ofrecemos un ambiente inigualable para bodas, quinceañeras, eventos corporativos y más. Contamos con una capacidad de hasta 200 personas y personal altamente capacitado para asegurar que tu evento sea un éxito rotundo.', 500.00, 700.00, 'Aire acondicionado,Equipo de sonido,Iluminación,Proyector,Cocina equipada,Estacionamiento,Wifi,Seguridad');

INSERT INTO salon_imagenes (id_salon, url_imagen, alt_text, es_banner, orden) VALUES
(1, '/assets/banner-img-1.jpg', 'Salón de eventos bellamente decorado', TRUE, 1),
(1, '/assets/salon-img-1.jpg', 'Vista general del salón', FALSE, 2),
(1, '/assets/salon-img-2.jpg', 'Salón decorado para boda', FALSE, 3),
(1, '/assets/salon-img-3.jpg', 'Área de recepción', FALSE, 4),
(1, '/assets/gallery-img-1.jpg', 'Evento nocturno', FALSE, 5),
(1, '/assets/gallery-img-2.jpg', 'Decoración floral', FALSE, 6),
(1, '/assets/gallery-img-3.jpg', 'Mesa de dulces', FALSE, 7),
(1, '/assets/gallery-img-4.jpg', 'Pista de baile', FALSE, 8),
(1, '/assets/gallery-img-5.jpg', 'Barra de bebidas', FALSE, 9),
(1, '/assets/gallery-img-6.jpg', 'Fachada del salón', FALSE, 10);

INSERT INTO testimonios (nombre_cliente, comentario, calificacion, aprobado) VALUES
('Ana M.', 'El Salón Oasis superó todas nuestras expectativas. Nuestra boda fue mágica, el equipo es muy profesional. ¡Lo recomendamos al 100%!', 5, TRUE),
('Luis P.', 'Celebré mi cumpleaños aquí y todo fue perfecto. El espacio es hermoso y la atención al detalle es impecable. ¡Gracias!', 4, TRUE),
('Sofía G.', 'Un lugar increíble para eventos corporativos. El ambiente es sofisticado y la tecnología funciona de maravilla. Volveremos.', 5, TRUE),
('Diego R.', 'El personal fue muy atento y flexible con nuestras peticiones. Mi quinceañera fue un sueño hecho realidad. Muy agradecida.', 5, TRUE);

Coloca los Archivos del Backend:

Copia la carpeta backend (que contiene api, config, helpers, index.php) dentro del directorio htdocs de tu instalación de XAMPP.

Asegúrate de que Apache y MySQL estén corriendo en tu panel de control de XAMPP.

2. Configuración del Frontend (React)
Instala Dependencias:

Navega a la carpeta frontend-salon-eventos en tu terminal.

Ejecuta npm install (o yarn install) para instalar todas las dependencias del proyecto.

Configura la URL de la API:

Crea un archivo llamado .env en la raíz de la carpeta frontend-salon-eventos.

Añade la siguiente línea, ajustando la URL si tu configuración de XAMPP es diferente (por ejemplo, si tu carpeta backend no está directamente en htdocs):

REACT_APP_API_BASE_URL=http://localhost/backend/api/v1

Prepara las Imágenes del Frontend:

Crea la carpeta src/assets dentro de frontend-salon-eventos.

Coloca las imágenes que se usan en el frontend (logo, banner, salón, galería) en esta carpeta. Los nombres de archivo deben coincidir con los usados en el código (ej. banner-img-1.jpg, salon-img-1.jpg, logo.png).

Asegura el public/index.html:

Verifica que tu public/index.html tenga un div con id="modal-root" justo antes del cierre de la etiqueta </body> y que no haya etiquetas </body> duplicadas.

<body>
  <div id="root"></div>
  <div id="modal-root"></div> <!-- Asegúrate de que este div existe -->
</body>
</html>

3. Ejecución del Proyecto
Inicia el Backend:

Asegúrate de que Apache y MySQL estén corriendo en tu panel de control de XAMPP.

Inicia el Frontend:

Abre tu terminal.

Navega a la carpeta frontend-salon-eventos.

Ejecuta npm start.

Esto abrirá la aplicación React en tu navegador (normalmente en http://localhost:3000).

Cómo Agregar Imágenes al README
Para agregar imágenes a tu README.md y mostrar partes de tu proyecto, puedes usar la sintaxis estándar de Markdown para imágenes.

1. Imágenes Locales (dentro de tu repositorio)
Si las imágenes están en tu repositorio (por ejemplo, en una carpeta docs/screenshots o images dentro de la raíz de tu proyecto), puedes referenciarlas con rutas relativas:

![Captura de pantalla de la Landing Page](docs/screenshots/landing-page.png)
![Formulario de Reserva Modal](docs/screenshots/reservation-modal.png)

Recomendación: Crea una carpeta específica para las capturas de pantalla del README, por ejemplo, screenshots/ o docs/images/ en la raíz de tu repositorio.

2. Imágenes Alojadas en la Web
Si tus imágenes están alojadas en un servicio externo (como Imgur, GitHub Pages, etc.), puedes usar su URL directa:

![Captura de pantalla de la Sección del Salón](https://ejemplo.com/tu-imagen-de-salon.jpg)

Consejos para Mostrar tu Proyecto:
Capturas de Pantalla: Toma capturas de pantalla claras de las secciones clave de tu aplicación:

La landing page completa.

El modal de reserva abierto.

La sección de galería.

La sección de testimonios.

(Opcional) Una captura de phpMyAdmin mostrando las tablas o datos.

GIFs Animados: Para mostrar la interactividad (como el modal abriéndose, las validaciones en tiempo real, o el carrusel), considera crear un GIF animado de corta duración. Herramientas como ScreenToGif o LICEcap pueden ayudarte.

Calidad: Asegúrate de que las imágenes tengan buena resolución y sean legibles.

Autor
Ing. David Caro Morales

Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
