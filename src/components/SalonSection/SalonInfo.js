import React from 'react';
import styles from './SalonInfo.module.css';
import salonImage from '../assets/salon-image.png'; // Asegúrate de tener esta imagen en tu proyecto

function SalonInfo() {
    return (
        <section className={styles.salonInfo}>
            <div className={styles.imageContainer}>
                <img src={salonImage} alt="Decoración de evento" className={styles.image} />
            </div>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>¿Qué hacemos?</h2>
                <p className={styles.description}>
                    Planificamos, coordinamos y dirigimos tu evento soñado.
                </p>
                <p className={styles.paragraph}>
                    Nos encargamos de todo para que puedas disfrutar sin preocupaciones. Desde la conceptualización hasta la ejecución, nuestro objetivo es hacer realidad tus ideas más ambiciosas.
                </p>
            </div>
        </section>
    );
}

export default SalonInfo;