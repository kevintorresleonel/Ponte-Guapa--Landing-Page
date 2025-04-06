document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const viewportHeight = window.innerHeight;
    const hamburger = document.createElement('div');
    const navList = document.querySelector('.nav-list');
    let hideTimeout;

    // Crear el menú hamburguesa
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    header.insertBefore(hamburger, navList);

    function handleScroll() {
        if (window.scrollY > viewportHeight) {
            header.classList.add('transparent');
            navList.classList.add('hidden');
            hamburger.classList.add('active');
        } else {
            header.classList.remove('transparent');
            navList.classList.remove('hidden');
            hamburger.classList.remove('active');
        }
    }

    // Mostrar el menú cuando se pasa el mouse sobre el hamburguesa
    hamburger.addEventListener('mouseenter', () => {
        navList.classList.add('visible');
        navList.classList.remove('hidden');
        clearTimeout(hideTimeout);
    });

    // Ocultar el menú después de 4 segundos
    hamburger.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            navList.classList.remove('visible');
            navList.classList.add('hidden');
            setTimeout(() => {
                navList.classList.remove('hidden');
                navList.classList.remove('visible');
            }, 2000);
        }, 4000);
    });

    // Escuchar el evento scroll
    window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const viewportHeight = window.innerHeight;

    function handleScroll() {
        if (window.scrollY > viewportHeight) {
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent');
        }
    }

    // Escuchar el evento scroll
    window.addEventListener('scroll', handleScroll);
});});