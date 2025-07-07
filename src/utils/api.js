// src/utils/api.js
import axios from 'axios';

// La URL base de tu API de PHP (asegúrate de que coincida con tu configuración de XAMPP)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost/Backend-salon/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/**
 * Envía una solicitud de reserva al backend.
 * @param {Object} reservationData Datos de la reserva (nombre, email, fechas, etc.)
 * @returns {Promise<Object>} La respuesta de la API.
 */
export const submitReservation = async (reservationData) => {
    try {
        const response = await apiClient({
            method: 'post',
            url: '/reservas.php',
            data: JSON.stringify(reservationData),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar la reserva:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Verifica la disponibilidad del salón para un rango de fechas.
 * @param {string} startDate Fecha de inicio en formato YYYY-MM-DD
 * @param {string} endDate Fecha de fin en formato YYYY-MM-DD
 * @returns {Promise<Object>} Objeto con 'disponible' (boolean) y 'fechas_ocupadas' (array)
 */
export const checkAvailability = async (startDate, endDate) => {
    try {
        const response = await apiClient.get(`/reservas.php?action=checkAvailability&fecha_inicio=${startDate}&fecha_fin=${endDate}`);
        return response.data;
    } catch (error) {
        console.error('Error al verificar disponibilidad:', error.response ? error.response.data : error.message);
        return { disponible: false, fechas_ocupadas: [] };
    }
};

/**
 * Obtiene los datos del salón (descripción, amenidades, precios).
 * @returns {Promise<Object>} Datos del salón.
 */
export const getSalonData = async () => {
    try {
        const response = await apiClient.get('/salon.php');
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos del salón:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Obtiene las imágenes de la galería del salón.
 * @returns {Promise<Array>} Array de objetos de imagen.
 */
export const getGalleryImages = async () => {
    try {
        const response = await apiClient.get('/salon.php?action=getGalleryImages');
        return response.data;
    } catch (error) {
        console.error('Error al obtener imágenes de la galería:', error.response ? error.response.data : error.message);
        return [];
    }
};

/**
 * Obtiene los testimonios.
 * @returns {Promise<Array>} Array de objetos de testimonio.
 */
export const getTestimonials = async () => {
    try {
        const response = await apiClient.get('/testimonios.php');
        return response.data;
    } catch (error) {
        console.error('Error al obtener testimonios:', error.response ? error.response.data : error.message);
        return [];
    }
};
