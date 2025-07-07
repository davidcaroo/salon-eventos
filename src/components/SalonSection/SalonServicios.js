import React from 'react';
import styles from './SalonServicios.module.css';
import servicio1 from '../assets/servicio1.png'; // Imagen de la boda
import servicio2 from '../assets/servicio2.png'; // Tienda con luces
import servicio3 from '../assets/servicio3.png'; // Mesa de banquete

function SalonServicios() {
    return (
        <section className={styles.servicios}>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>Servicios Exclusivos para Tu Evento Perfecto</h2>
                    <p className={styles.description}>
                        Con más de 10 años de experiencia, ofrecemos un servicio integral que abarca todas las áreas necesarias para un evento exitoso. Contamos con un equipo interdisciplinario de expertos comprometidos con la excelencia.
                    </p>
                    <ul className={styles.featuresList}>
                        <li className={styles.feature}>Servicio de Excelencia</li>
                        <li className={styles.feature}>Diseño y Últimas Tendencias</li>
                        <li className={styles.feature}>Acompañamiento integral</li>
                        <li className={styles.feature}>Equipo de especialistas</li>
                    </ul>
                </div>
                <div className={styles.imageContainer}>
                    <img src={servicio1} alt="Bodas" className={styles.mainImage} />
                    <div className={styles.secondaryImages}>
                        <img src={servicio2} alt="Eventos" className={styles.secondaryImage} />
                        <img src={servicio3} alt="Banquetes" className={styles.secondaryImage} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SalonServicios;