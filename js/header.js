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
});