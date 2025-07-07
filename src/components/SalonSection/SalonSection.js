import React from 'react';
import styles from './SalonSection.module.css';
import { scroller } from 'react-scroll'; // Para el enlace de anclaje
import fundadoraImage from '../assets/fundadora.png'; // Import the image

function SalonSection({ salon, onReserveClick }) {
    // Función para desplazar a la sección de reserva
    const scrollToReservation = () => {
        scroller.scrollTo('reservation-form', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
        onReserveClick(); // Abre el modal de reserva
    };

    return (
        <section id="salon-section" className={styles.salonSection}>
            {/* Header Section */}
            <div className={styles.header}>
                <h2 className={styles.sectionTitle}>NUESTRA HISTORIA – MÁS DE 10 AÑOS CREANDO RECUERDOS INOLVIDABLES</h2>
                <div className={styles.divider}></div>
            </div>

            {/* Description */}
            <p className={styles.description}>
                S&A Salón de Eventos nació de la pasión por crear momentos mágicos. Fundado por Elena Fuentes, nuestra directora visionaria, hemos trabajado incansablemente para convertirnos en uno de los salones más reconocidos del país. Desde bodas hasta eventos corporativos, cada celebración es única y está diseñada con dedicación y profesionalismo. Nos enorgullece ser parte de los momentos más importantes de nuestros clientes.
            </p>

            {/* Testimonial Section */}
            <div className={styles.testimonial}>
                <div className={styles.testimonialImageContainer}>
                    <img src={fundadoraImage} alt="Elena Fuentes" className={styles.testimonialImage} />
                </div>
                <div className={styles.testimonialText}>
                    <h3 className={styles.signature}>Elena Fuentes</h3>
                    <p className={styles.position}>Fundadora y Directora</p>
                </div>
            </div>
        </section>
    );
}

export default SalonSection;