// src/App.js
import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import SalonSection from './components/SalonSection/SalonSection';
import GallerySection from './components/GallerySection/GallerySection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import ReservationForm from './components/ReservationForm/ReservationForm';
import NewTestimonialForm from './components/TestimonialsSection/NewTestimonialForm';
import './App.css';
import SalonInfo from './components/SalonSection/SalonInfo';
import SalonServicios from './components/SalonSection/SalonServicios';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonialsData, setTestimonialsData] = useState([]);

  const openReservationModal = () => setIsModalOpen(true);
  const closeReservationModal = () => setIsModalOpen(false);

  // ✅ Cargar testimonios desde la API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://localhost/Backend-salon/api/v1/testimonios.php');
        const data = await response.json();

        // Formatear los datos si es necesario
        const formattedData = data.map(testimonio => ({
          name: testimonio.nombre_cliente,
          comment: testimonio.comentario,
          rating: parseInt(testimonio.calificacion)
        }));

        setTestimonialsData(formattedData);
      } catch (error) {
        console.error('Error al cargar testimonios:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const salonData = {
    name: "S&A Salón de Eventos",
    description: "Es el lugar perfecto para celebrar tus momentos más especiales...",
    amenities: [
      "Aire acondicionado central",
      "Equipo de sonido profesional",
      "Iluminación ambiental personalizable",
      "Proyector y pantalla grande",
      "Cocina equipada para catering",
      "Estacionamiento privado",
      "Wifi de alta velocidad",
      "Personal de seguridad y limpieza"
    ],
    pricePerDay: 500.00,
    pricePerNight: 700.00,
    images: [
      { src: '/assets/salon-img-1.jpg', alt: 'Vista general del salón' },
      { src: '/assets/salon-img-2.jpg', alt: 'Salón decorado para boda' },
      { src: '/assets/salon-img-3.jpg', alt: 'Área de recepción' },
    ]
  };

  const galleryImages = [
    { src: '/assets/gallery-img-1.jpg', alt: 'Evento nocturno' },
    { src: '/assets/gallery-img-2.jpg', alt: 'Decoración floral' },
    { src: '/assets/gallery-img-3.jpg', alt: 'Mesa de dulces' },
    { src: '/assets/gallery-img-4.jpg', alt: 'Pista de baile' },
    { src: '/assets/gallery-img-5.jpg', alt: 'Barra de bebidas' },
    { src: '/assets/gallery-img-6.jpg', alt: 'Fachada del salón' },
  ];

  return (
    <div className="App">
      <Header onReserveClick={openReservationModal} />
      <main>
        <Banner onReserveClick={openReservationModal} />
        <SalonSection salon={salonData} onReserveClick={openReservationModal} />
        <SalonInfo />
        <SalonServicios />
        <GallerySection images={galleryImages} />
        <TestimonialsSection testimonials={testimonialsData} />
        <NewTestimonialForm />
      </main>
      <Footer />

      <Modal isOpen={isModalOpen} onClose={closeReservationModal}>
        <ReservationForm
          onClose={closeReservationModal}
          salonPriceDay={salonData.pricePerDay}
          salonPriceNight={salonData.pricePerNight}
        />
      </Modal>
    </div>
  );
}

export default App;
