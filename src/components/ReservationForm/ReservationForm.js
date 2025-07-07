import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import styles from './ReservationForm.module.css';
import { calculateTotalCost, formatDateForAPI } from '../../utils/helpers';
import { checkAvailability, submitReservation } from '../../utils/api';
import 'react-datepicker/dist/react-datepicker.css';

function ReservationForm({ onClose, salonPriceDay, salonPriceNight }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        startDate: null,
        endDate: null,
        participants: 1,
    });

    const [errors, setErrors] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [fechasOcupadas, setFechasOcupadas] = useState([]);

    // 🔁 Obtener fechas ocupadas desde el backend
    useEffect(() => {
        fetch('http://localhost/Backend-salon/api/v1/reservas.php?action=fechasOcupadas')
            .then(res => res.json())
            .then(data => {
                const fechas = data.map(f => new Date(f));
                setFechasOcupadas(fechas);
            })
            .catch(err => console.error('Error cargando fechas ocupadas:', err));
    }, []);

    // ✅ Validación y cálculo de costo
    useEffect(() => {
        const validateForm = () => {
            const newErrors = {};
            if (!formData.fullName.trim()) newErrors.fullName = 'El nombre completo es requerido.';
            if (!formData.email.trim()) {
                newErrors.email = 'El email es requerido.';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'El email no es válido.';
            }
            if (!formData.phone.trim()) {
                newErrors.phone = 'El teléfono es requerido.';
            } else if (!/^\d{7,15}$/.test(formData.phone)) {
                newErrors.phone = 'El teléfono debe contener solo números (7-15 dígitos).';
            }
            if (!formData.startDate) newErrors.startDate = 'La fecha de inicio es requerida.';
            if (!formData.endDate) {
                newErrors.endDate = 'La fecha de fin es requerida.';
            } else if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
                newErrors.endDate = 'La fecha de fin no puede ser anterior a la de inicio.';
            }
            if (formData.participants < 1) newErrors.participants = 'El número de participantes debe ser al menos 1.';

            setErrors(newErrors);
            setIsFormValid(Object.keys(newErrors).length === 0 && formData.startDate && formData.endDate);
        };

        validateForm();

        if (formData.startDate && formData.endDate && salonPriceDay && salonPriceNight) {
            const calculatedCost = calculateTotalCost(formData.startDate, formData.endDate, salonPriceDay, salonPriceNight);
            setTotalCost(calculatedCost);
        } else {
            setTotalCost(0);
        }
    }, [formData, salonPriceDay, salonPriceNight]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date, name) => {
        setFormData(prev => ({ ...prev, [name]: date }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            toast.error('Por favor, corrige los errores del formulario.');
            return;
        }

        setLoading(true);
        try {
            const availabilityResponse = await checkAvailability(
                formatDateForAPI(formData.startDate),
                formatDateForAPI(formData.endDate)
            );

            if (!availabilityResponse.disponible) {
                toast.error(`Las fechas seleccionadas no están disponibles. Fechas ocupadas: ${availabilityResponse.fechas_ocupadas.join(', ')}`);
                setLoading(false);
                return;
            }

            const reservationData = {
                nombre_completo: formData.fullName,
                email: formData.email,
                telefono: formData.phone,
                fecha_inicio: formatDateForAPI(formData.startDate),
                fecha_fin: formatDateForAPI(formData.endDate),
                num_participantes: parseInt(formData.participants),
                costo_total: totalCost,
            };

            const response = await submitReservation(reservationData);

            if (response.status === 'success') {
                toast.success('¡Reserva realizada con éxito! Recibirás un email de confirmación.');
                onClose();
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    startDate: null,
                    endDate: null,
                    participants: 1,
                });
            } else {
                toast.error(response.message || 'Error al procesar la reserva. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error en el envío de la reserva:', error);
            toast.error('Hubo un problema de conexión o servidor. Por favor, inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    // ✅ Clase roja para días ocupados
    const asignarClaseDia = (date) => {
        return fechasOcupadas.some(
            disabled =>
                date.getFullYear() === disabled.getFullYear() &&
                date.getMonth() === disabled.getMonth() &&
                date.getDate() === disabled.getDate()
        ) ? 'dia-ocupado' : undefined;
    };

    return (
        <div id="reservation-form" className={styles.reservationForm}>
            <h2>Realiza tu Reserva</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="fullName">Nombre Completo:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>

                <div className={`${styles.formGroup} ${styles.dateInputs}`}>
                    <div>
                        <label htmlFor="startDate">Fecha de Inicio:</label>
                        <DatePicker
                            id="startDate"
                            selected={formData.startDate}
                            onChange={(date) => handleDateChange(date, 'startDate')}
                            selectsStart
                            startDate={formData.startDate}
                            endDate={formData.endDate}
                            minDate={new Date()}
                            excludeDates={fechasOcupadas}
                            dayClassName={asignarClaseDia}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha de inicio"
                            required
                        />
                        {errors.startDate && <p className="error-message">{errors.startDate}</p>}
                    </div>
                    <div>
                        <label htmlFor="endDate">Fecha de Fin:</label>
                        <DatePicker
                            id="endDate"
                            selected={formData.endDate}
                            onChange={(date) => handleDateChange(date, 'endDate')}
                            selectsEnd
                            startDate={formData.startDate}
                            endDate={formData.endDate}
                            minDate={formData.startDate || new Date()}
                            excludeDates={fechasOcupadas}
                            dayClassName={asignarClaseDia}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona fecha de fin"
                            required
                        />
                        {errors.endDate && <p className="error-message">{errors.endDate}</p>}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="participants">Número de Participantes:</label>
                    <input
                        type="number"
                        id="participants"
                        name="participants"
                        value={formData.participants}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                    {errors.participants && <p className="error-message">{errors.participants}</p>}
                </div>

                <div className={styles.totalCost}>
                    <h3>Costo Total Estimado: <span>${totalCost.toFixed(2)}</span></h3>
                </div>

                <button type="submit" className="btn" disabled={!isFormValid || loading}>
                    {loading ? 'Enviando...' : 'Confirmar Reserva'}
                </button>
            </form>
        </div>
    );
}

export default ReservationForm;
