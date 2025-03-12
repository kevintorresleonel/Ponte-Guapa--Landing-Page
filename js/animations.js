// Script para animaciones
document.addEventListener('DOMContentLoaded', function() {

    // Función para verificar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Elementos a animar
    const elementsToAnimate = [
        document.querySelector('.hero-content'),
        document.querySelector('.product-card'),
        document.querySelector('.description-section'),
        document.querySelector('.our-services h2'),
        ...document.querySelectorAll('.services > div'),
        document.querySelector('#formulario-contacto'),
        document.querySelector('.map-section h2 '),
    ];

    // Función para activar animaciones
    function checkScroll() {
        elementsToAnimate.forEach(element => {
            if (isElementInViewport(element) && element) {
                element.classList.add('animate');
            }
        });
    }

    // Verificar al cargar la página
    checkScroll();

    // Verificar al hacer scroll
    window.addEventListener('scroll', checkScroll);

    // Animar hero section inmediatamente
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate');
        }
    }, 300);

    // Añadir manejo de scroll suave para los enlaces de navegación
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // manejo de menú hamburguesa
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    hamburger.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // evitar scroll cuando el menú está abierto
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .no-scroll {
                overflow: hidden;
            }
        </style>
    `);
});