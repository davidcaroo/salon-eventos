import React, { useState } from 'react';
import './NewTestimonialForm.css'; 
import flowersImage from '../assets/flowers.png'

function NewTestimonialForm() {
    const [formData, setFormData] = useState({
        nombre_cliente: '',
        comentario: '',
        calificacion: 5,
    });

    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "calificacion" ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/Backend-salon/api/v1/nuevotestimonio.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            setMensaje(result.message);
            if (response.ok) {
                setFormData({ nombre_cliente: '', comentario: '', calificacion: 5 });
            }
        } catch (error) {
            setMensaje('Hubo un error al enviar el testimonio.');
        }
    };

    return (
        <div className="testimonial-container">
            <div className="form-section">
                <form className="testimonial-form" onSubmit={handleSubmit}>
                    <h3>Deja tu testimonio</h3>
                    {mensaje && <p className={mensaje.includes('Éxito') ? 'success' : 'error'}>{mensaje}</p>}
                    <input
                        type="text"
                        name="nombre_cliente"
                        value={formData.nombre_cliente}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                    />
                    <textarea
                        name="comentario"
                        value={formData.comentario}
                        onChange={handleChange}
                        placeholder="Tu comentario"
                        rows="4"
                        required
                    />
                    <label>Calificación:</label>
                    <select
                        name="calificacion"
                        value={formData.calificacion}
                        onChange={handleChange}
                    >
                        <option value={5}>5 - Excelente</option>
                        <option value={4}>4 - Muy bueno</option>
                        <option value={3}>3 - Bueno</option>
                        <option value={2}>2 - Regular</option>
                        <option value={1}>1 - Malo</option>
                    </select>
                    <button type="submit">Enviar Testimonio</button>
                </form>
            </div>
            <div className="image-section">
                <div className="text-overlay">
                    <h2>Cada testimonio es un regalo que nos ayuda a seguir creciendo.</h2>
                    <p>
                        Tu experiencia nos inspira a perfeccionar cada detalle ya crear eventos aún más memorables.
                        ¡Cuéntanos cómo fue tu día en S&A: qué te gustó, qué emociones viviste o cómo pudimos superar tus expectativas!
                        Tu voz es fundamental para seguir siendo el salón donde los sueños se hacen realidad.
                    </p>
                    <div className="call-to-action">
                        <p>¡Deja tu huella y ayúdanos a brillar juntos!</p>
                        <span className="star">&#9733;</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewTestimonialForm;