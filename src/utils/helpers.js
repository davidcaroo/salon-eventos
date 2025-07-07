/**
 * Calcula el costo total de la reserva basado en las fechas de inicio y fin.
 * Asume que el día de inicio cuenta como un día completo y el día de fin NO cuenta (check-out).
 * Si la reserva termina en el mismo día que inicia, se cobra por día.
 * Si la reserva incluye una noche (termina al día siguiente o después), se cobra por noches.
 *
 * @param {Date} startDate Fecha de inicio de la reserva
 * @param {Date} endDate Fecha de fin de la reserva
 * @param {number} pricePerDay Precio por día
 * @param {number} pricePerNight Precio por noche
 * @returns {number} Costo total calculado
 */
export const calculateTotalCost = (startDate, endDate, pricePerDay, pricePerNight) => {
    if (!startDate || !endDate || startDate > endDate) {
        return 0;
    }

    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    const timeDiff = end.getTime() - start.getTime(); // Diferencia en milisegundos
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Diferencia en días

    if (diffDays === 0) {
        // Si la reserva es para el mismo día (ej. 10 de Julio a 10 de Julio), se cobra por un día
        return pricePerDay;
    } else {
        // Si la reserva es por más de un día, cobramos por el número de noches
        // Ej: 10-Jul al 11-Jul -> 1 noche
        // Ej: 10-Jul al 12-Jul -> 2 noches
        return diffDays * pricePerNight;
    }
};


/**
 * Formatea una fecha a 'YYYY-MM-DD' para la API.
 * @param {Date} date Objeto de fecha
 * @returns {string} Fecha formateada
 */
export const formatDateForAPI = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-index
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Formatea un número como moneda.
 * @param {number} amount Monto a formatear
 * @param {string} currency Símbolo de la moneda (ej. 'USD', 'COP')
 * @param {string} locale Localización (ej. 'en-US', 'es-CO')
 * @returns {string} Monto formateado
 */
export const formatCurrency = (amount, currency = 'COP', locale = 'es-CO') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};