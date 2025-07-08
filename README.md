# 🏢 Sistema de Reservas para Salón de Eventos

Este proyecto es un sistema completo de reservas para un salón de eventos, desarrollado con un frontend en **React** y un backend en **PHP con MySQL**.
Permite a los usuarios visualizar información del salón, explorar galerías, leer testimonios y realizar reservas de manera interactiva.

## 📄 Descripción del Proyecto

El "Sistema de Reservas para Salón de Eventos" es una aplicación web diseñada para simplificar el proceso de reserva de un salón de eventos. Ofrece una experiencia de usuario intuitiva a través de una **landing page responsive** y un formulario de reserva modal dinámico. El backend gestiona la lógica de negocio, la persistencia de datos y la verificación de disponibilidad.

---
## ✨ Características

### **Frontend (React)**
- **Landing Page Responsive**:
  - Header con logo y menú de navegación con scroll suave.
  - Banner principal con carrusel de imágenes destacadas.
  - Sección del salón con descripción, amenidades y precios.
  - Galería de fotos en formato de cuadrícula de cards.
  - Testimonios con calificaciones y comentarios.
  - Footer con información de contacto y redes sociales.
- **Formulario Modal de Reservas**:
  - Validación de campos en tiempo real.
  - Calendario interactivo para selección de fechas (con fechas ocupadas deshabilitadas).
  - Cálculo automático del costo total.
  - Mensajes de confirmación/error con `react-toastify`.
- **Diseño Responsivo** y animaciones suaves para una mejor experiencia de usuario.

### **Backend (PHP + MySQL)**
- **API RESTful** para gestionar:
  - Información del salón (descripción, precios, amenidades).
  - Imágenes del salón (banner, galería).
  - Verificación de disponibilidad de fechas.
  - Creación de nuevas reservas.
  - Gestión de testimonios.
- **Base de Datos MySQL**:
  - Tablas: `salon`, `salon_imagenes`, `reservas`, `testimonios`.
  - Relaciones entre tablas y seguridad contra inyecciones SQL.
- **Seguridad**:
  - Sanitización de datos de entrada.
  - Configuración de encabezados CORS para comunicación frontend-backend.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- [React.js](https://reactjs.org/)
- HTML5 / CSS3
- CSS Modules
- [Axios](https://axios-http.com/)
- [react-datepicker](https://reactdatepicker.com/)
- [react-toastify](https://fkhadra.github.io/react-toastify/)
- [react-responsive-carousel](https://www.npmjs.com/package/react-responsive-carousel)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-scroll](https://github.com/fisshy/react-scroll)

### **Backend**
- PHP
- MySQL
- PDO (para consultas seguras)
- phpMyAdmin

---

## 📁 Estructura del Proyecto

```
/tu-proyecto/
├── frontend-salon-eventos/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── utils/api.js
│   │   └── App.css
│   ├── .env
│   ├── package.json
│   └── README.md
│
└── backend/
    ├── api/v1/
    │   ├── reservas.php
    │   ├── salon.php
    │   └── testimonios.php
    ├── config/database.php
    ├── helpers/utils.php
    └── index.php
```

---

## 🚀 Configuración y Ejecución

### **Prerrequisitos**
- [XAMPP](https://www.apachefriends.org/index.html) (Apache y MySQL activos)
- [Node.js](https://nodejs.org/) y npm

### **1. Configuración del Backend (PHP + MySQL)**
1. **Crear la Base de Datos**:
   - Abre [phpMyAdmin](http://localhost/phpmyadmin/).
   - Crea una base de datos llamada `salon_eventos_db`.
   - importa el archivo SQL y listo.
     ```
2. **Coloca los Archivos del Backend**:
   - Copia la carpeta `backend` en el directorio `htdocs` de XAMPP (`C:\xampp\htdocs\`).

### **2. Configuración del Frontend (React)**
1. **Instala Dependencias**:
   ```bash
   cd frontend-salon-eventos
   npm install
   ```
2. **Configura la URL de la API**:
   - Crea un archivo `.env` en la raíz del frontend:
     ```env
     REACT_APP_API_BASE_URL=http://localhost/backend/api/v1
     ```

### **3. Ejecutar la Aplicación**
1. Asegúrate de que **Apache** y **MySQL** estén activos en XAMPP.
2. En el frontend, ejecuta:
   ```bash
   npm start
   ```
3. La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

---

## 📸 Vistas Previas

Agrega capturas de pantalla de tu proyecto usando esta sintaxis:

```markdown
![Interfaz Principal](assets/images/landing-page.png)
![Formulario de Reserva](assets/images/reservation-modal.png)
```

---

## 📦 Despliegue

### **Frontend (React)**
1. Genera el build:
   ```bash
   npm run build
   ```
2. Usa servicios como [Netlify](https://www.netlify.com/) o [Vercel](https://vercel.com/) para desplegarlo.

### **Backend (PHP + MySQL)**
- Hospeda en servicios como [Hostinger](https://www.hostinger.com/) o [DigitalOcean](https://www.digitalocean.com/).
- Importa la base de datos con phpMyAdmin.
- Actualiza las credenciales en `config/database.php`.

---

## 📜 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE). Consulta el archivo `LICENSE` para más detalles.

## 👤 Autor: David Caro Morales🚀
