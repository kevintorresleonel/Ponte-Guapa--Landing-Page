document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.services');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cards = carousel.querySelectorAll('div');
    let currentPosition = 0;
    let cardWidth;
    let visibleCards;
    let maxScroll;
    let direction = 1; // 1 para adelante, -1 para atrás
    let autoScrollInterval;
    const scrollDelay = 3000; // 3 segundos

    // Crear indicadores de carrusel
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';

    // Calcular cuántas "páginas" tendrá el carrusel
    function calculateCarouselMetrics() {
        // Obtener el ancho de cada tarjeta incluyendo el gap
        cardWidth = cards[0].offsetWidth + 32; // Ancho de tarjeta + gap

        // Determinar cuántas tarjetas son visibles según el ancho de la ventana
        if (window.innerWidth > 992) {
            visibleCards = 3;
        } else if (window.innerWidth > 768) {
            visibleCards = 2;
        } else {
            visibleCards = 1;
        }

        // Calcular el desplazamiento máximo
        maxScroll = (cards.length - visibleCards) * cardWidth;

        // Actualizar el número de indicadores
        updateIndicators();
    }

    // Crear o actualizar indicadores
    function updateIndicators() {
        // Limpiar indicadores existentes
        indicatorsContainer.innerHTML = '';

        // Calcular cuántas páginas necesitamos
        const pageCount = Math.ceil(cards.length / visibleCards);

        // Crear indicadores
        for (let i = 0; i < pageCount; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');

            indicator.addEventListener('click', () => {
                goToPage(i);
                stopAutoScroll();
                setTimeout(startAutoScroll, 5000);
            });

            indicatorsContainer.appendChild(indicator);
        }
    }

    // Ir a una página específica
    function goToPage(pageIndex) {
        currentPosition = pageIndex * (visibleCards * cardWidth);
        if (currentPosition > maxScroll) currentPosition = maxScroll;

        carousel.scrollTo({
            left: currentPosition,
            behavior: 'smooth'
        });

        // Actualizar indicadores activos
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((ind, idx) => {
            ind.classList.toggle('active', idx === pageIndex);
        });

        updateButtonStates();
    }

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

        // Actualizar indicador activo
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        const activeIndex = Math.floor(currentPosition / (visibleCards * cardWidth));

        indicators.forEach((ind, idx) => {
            ind.classList.toggle('active', idx === activeIndex);
        });
    }

    // Función para mover el carrusel
    function moveCarousel(direction) {
        // Calcular el incremento basado en cuántas tarjetas son visibles
        const moveIncrement = visibleCards * cardWidth * direction;
        const newPosition = currentPosition + moveIncrement;

        if (newPosition >= 0 && newPosition <= maxScroll) {
            currentPosition = newPosition;
        } else if (newPosition < 0) {
            currentPosition = 0;
        } else if (newPosition > maxScroll) {
            currentPosition = maxScroll;
        }

        carousel.scrollTo({
            left: currentPosition,
            behavior: 'smooth'
        });

        updateButtonStates();
    }

    // Función para el desplazamiento automático
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if ((direction === 1 && currentPosition >= maxScroll) ||
                (direction === -1 && currentPosition <= 0)) {
                direction *= -1; // Invertir dirección al llegar a un extremo
            }
            moveCarousel(direction);
        }, scrollDelay);
    }

    // Detener el desplazamiento automático
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Eventos para los botones
    prevButton.addEventListener('click', () => {
        moveCarousel(-1);
        stopAutoScroll();
        setTimeout(startAutoScroll, 5000); // Reiniciar después de 5 segundos
    });

    nextButton.addEventListener('click', () => {
        moveCarousel(1);
        stopAutoScroll();
        setTimeout(startAutoScroll, 5000); // Reiniciar después de 5 segundos
    });

    // Detener el desplazamiento al interactuar con el carrusel
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('touchstart', stopAutoScroll, {passive: true});
    carousel.addEventListener('mouseleave', startAutoScroll);
    carousel.addEventListener('touchend', () => setTimeout(startAutoScroll, 3000), {passive: true});

    // Añadir indicadores al DOM
    document.querySelector('.carousel-container').appendChild(indicatorsContainer);

    // Inicializar métricas del carrusel
    calculateCarouselMetrics();

    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', () => {
        calculateCarouselMetrics();

        // Ajustar la posición actual para que sea válida con las nuevas dimensiones
        if (currentPosition > maxScroll) {
            currentPosition = maxScroll;
        }

        carousel.scrollTo({
            left: currentPosition,
            behavior: 'instant'
        });

        updateButtonStates();
    });

    // Inicializar
    updateButtonStates();
    startAutoScroll();

    // Habilitar gestos táctiles para deslizar
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50; // Umbral mínimo para considerar un deslizamiento

        if (touchEndX < touchStartX - threshold) {
            // Deslizamiento a la izquierda
            moveCarousel(1);
        }

        if (touchEndX > touchStartX + threshold) {
            // Deslizamiento a la derecha
            moveCarousel(-1);
        }
    }
});