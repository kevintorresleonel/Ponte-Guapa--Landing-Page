document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.services');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cards = carousel.querySelectorAll('div');
    const cardWidth = cards[0].offsetWidth + 32; // Ancho de tarjeta + gap
    let currentPosition = 0;
    const visibleCards = 3;
    const maxScroll = (cards.length - visibleCards) * cardWidth;
    let direction = 1; // 1 para adelante, -1 para atrás
    let autoScrollInterval;
    const scrollDelay = 3000; // 3 segundos

    // Función para actualizar estado de los botones
    function updateButtonStates() {
        prevButton.disabled = currentPosition <= 0;
        nextButton.disabled = currentPosition >= maxScroll;

        // Actualizar estilos visuales de los botones
        prevButton.style.opacity = prevButton.disabled ? "0.5" : "1";
        nextButton.style.opacity = nextButton.disabled ? "0.5" : "1";

        // Cambiar dirección si llegamos a los límites
        if (currentPosition >= maxScroll) {
            direction = -1;
        } else if (currentPosition <= 0) {
            direction = 1;
        }
    }

    // Función para mover el carrusel
    function moveCarousel(direction) {
        const newPosition = currentPosition + (direction * cardWidth);

        if (newPosition >= 0 && newPosition <= maxScroll) {
            currentPosition = newPosition;
            carousel.scrollTo({
                left: currentPosition,
                behavior: 'smooth'
            });
        }
        updateButtonStates();
    }

    // Función para el desplazamiento automático
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            moveCarousel(direction);
        }, scrollDelay);
    }

    // Detener el desplazamiento automático al interactuar
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Reiniciar el desplazamiento automático después de la interacción
    function restartAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }

    // Eventos para los botones
    prevButton.addEventListener('click', () => {
        moveCarousel(-1);
        stopAutoScroll();
        setTimeout(restartAutoScroll, 5000); // Reiniciar después de 5 segundos
    });

    nextButton.addEventListener('click', () => {
        moveCarousel(1);
        stopAutoScroll();
        setTimeout(restartAutoScroll, 5000); // Reiniciar después de 5 segundos
    });

    // Detener el desplazamiento al pasar el mouse por encima
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', () => {
        const newCardWidth = cards[0].offsetWidth + 32;
        currentPosition = Math.min(currentPosition, (cards.length - visibleCards) * newCardWidth);
        carousel.scrollTo({
            left: currentPosition,
            behavior: 'instant'
        });
        updateButtonStates();
    });

    // Inicializar
    updateButtonStates();
    startAutoScroll();
});