let currentIndex = 2; // Começa com o terceiro item (Faunamiga no centro)
const ongsList = document.querySelector('.ongs-list');
const ongItems = document.querySelectorAll('.ong-item');
const totalItems = ongItems.length;

function updateCarousel() {
    ongItems.forEach(item => item.classList.remove('center'));
    ongItems[currentIndex].classList.add('center');
    
    // Detectar tamanho da tela para ajustar offset
    const isMobile = window.innerWidth <= 768;
    const itemWidth = isMobile ? 100 : 145;
    const gap = isMobile ? 25 : 40;
    const centerOffset = isMobile ? 125 : 210;
    
    const offset = -(currentIndex * (itemWidth + gap)) + centerOffset;
    ongsList.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

// Inicializa
updateCarousel();

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
