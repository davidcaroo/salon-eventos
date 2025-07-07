import React from 'react';
import styles from './Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.contactInfo}>
                    <h3>Contacto</h3>
                    <p>Dirección: Calle 123 #45-67, Cartagena, Colombia</p>
                    <p>Teléfono: +57 310 123 4567</p>
                    <p>Email: info@saeventos.com</p>
                </div>
                <div className={styles.socialMedia}>
                    <h3>Síguenos.</h3>
                    <div className={styles.iconContainer}>
                        <a href="https://facebook.com " target="_blank" rel="noopener noreferrer">
                            <FaFacebook className={styles.icon} />
                        </a>
                        <a href="https://twitter.com " target="_blank" rel="noopener noreferrer">
                            <FaTwitter className={styles.icon} />
                        </a>
                        <a href="https://instagram.com " target="_blank" rel="noopener noreferrer">
                            <FaInstagram className={styles.icon} />
                        </a>

                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>© {currentYear} Salón de Eventos S&A. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;