let currentIndex = 2; // Começa com o terceiro item (Faunamiga no centro)
const ongsList = document.querySelector('.ongs-list');
const ongItems = document.querySelectorAll('.ong-item');
const totalItems = ongItems.length;

function updateCarousel() {
    // Remove classe center de todos
    ongItems.forEach(item => item.classList.remove('center'));
    
    // Adiciona classe center ao item atual
    ongItems[currentIndex].classList.add('center');
    
    // Calcula o deslocamento para centralizar
    const offset = -(currentIndex * (145 + 40)) + 210;
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
