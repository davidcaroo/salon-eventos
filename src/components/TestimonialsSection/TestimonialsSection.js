import React, { useEffect, useState } from 'react';
import styles from './TestimonialsSection.module.css';
import Card from '../Card/Card';
import { FaStar } from 'react-icons/fa';

function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los testimonios desde la API
    useEffect(() => {
        fetch('http://localhost/Backend-salon/api/v1/testimonios.php')
            .then((response) => response.json())
            .then((data) => {
                setTestimonials(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener testimonios:', error);
                setLoading(false);
            });
    }, []);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    color={i < rating ? '#ffc107' : '#e4e5e9'}
                    className={styles.star}
                />
            );
        }
        return stars;
    };

    return (
        <section id="testimonials-section" className={styles.testimonialsSection}>
            <h2 className={styles.sectionTitle}>Lo que dicen nuestros clientes</h2>

            {loading ? (
                <p>Cargando testimonios...</p>
            ) : testimonials.length === 0 ? (
                <p>No hay testimonios disponibles.</p>
            ) : (
                <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className={styles.testimonialCard}>
                            <div className={styles.rating}>
                                {renderStars(Number(testimonial.rating))}
                            </div>
                            <p className={styles.comment}>"{testimonial.comment}"</p>
                            <p className={styles.clientName}>- {testimonial.name}</p>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}

export default TestimonialsSection;
