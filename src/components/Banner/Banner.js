import React from 'react';
import styles from './Banner.module.css';
// Asegúrate que la ruta a tu imagen sea la correcta
import bannerImage from '../assets/banner.png'; 

function Banner() {
    return (
        <section className={styles.banner}>
            {/* Background Image */}
            <div
                className={styles.backgroundImage}
                style={{ backgroundImage: `url(${bannerImage})` }}
            ></div>

            {/* Overlay for better text visibility */}
            <div className={styles.overlay}></div>

            {/* Main Content */}
            <div className={styles.content}>
                <h2 className={styles.subtitle}>SANDRA Y AMANDA</h2>
                <h1 className={styles.title}>Eventos</h1>
                <p className={styles.tagline}>EL SALÓN DE TUS SUEÑOS</p>
                <a href="https://www.saeventos.com" className={styles.websiteLink}>
                    www.saeventos.com
                </a>
            </div>
        </section>
    );
}

export default Banner;