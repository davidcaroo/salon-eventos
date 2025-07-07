import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, children }) {
    const modalRef = useRef();
    const [shouldRender, setShouldRender] = useState(false); // Estado para controlar el renderizado y animaciones

    // Función para manejar el evento de escape
    const handleEscape = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true); // Empezar a renderizar el modal
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Evita el scroll del cuerpo
        } else {
            // Cuando el modal se cierra, esperamos la duración de la transición antes de dejar de renderizar
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset'; // Restaura el scroll
            const timer = setTimeout(() => setShouldRender(false), 300); // 300ms es la duración de la transición CSS
            return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta o isOpen cambia de nuevo
        }

        // Función de limpieza para remover el event listener y restaurar el scroll
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]); // Dependencias: isOpen y onClose

    // Si no debe renderizarse, no devuelve nada
    if (!shouldRender) return null;

    // Renderiza el modal usando un portal en el 'modal-root'
    return ReactDOM.createPortal(
        <div
            className={`${styles.modalOverlay} ${isOpen ? styles.isOpen : ''}`}
            onClick={onClose}
        >
            <div
                className={`${styles.modalContent} ${isOpen ? styles.isOpen : ''}`}
                onClick={(e) => e.stopPropagation()} // Evita que el click en el contenido cierre el modal
                ref={modalRef}
            >
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') // ¡Aquí está el cambio clave!
    );
}

export default Modal;