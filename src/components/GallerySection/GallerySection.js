import React from 'react';
import styles from './GallerySection.module.css';
import Card from '../Card/Card'; // Usamos un componente Card genérico

function GallerySection({ images }) {
    return (
        <section id="gallery-section" className={styles.gallerySection}>
            <h2 className={styles.sectionTitle}>Nuestra Galería</h2>
            <div className={styles.galleryGrid}>
                {images.map((image, index) => (
                    <Card key={index} className={styles.galleryCard}>
                        <img src={image.src} alt={image.alt} className={styles.galleryImage} />
                        <div className={styles.imageCaption}>{image.alt}</div>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default GallerySection;