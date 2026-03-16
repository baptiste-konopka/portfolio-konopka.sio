// Fonction pour basculer entre le mode clair et sombre
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Ajouter une animation de transition
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (newTheme === 'light') {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }
    
    // Sauvegarder la préférence dans le localStorage
    localStorage.setItem('theme', newTheme);
}

// Système de zoom d'images
function initImageZoom() {
    // Créer la modal si elle n'existe pas
    let modal = document.getElementById('image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.className = 'image-modal';
        document.body.appendChild(modal);
    }
    
    // Sélectionner toutes les images dans les sections
    const images = document.querySelectorAll('section img, .content img');
    
    images.forEach(img => {
        // Ajouter la classe zoomable si elle n'existe pas
        if (!img.classList.contains('zoomable-image')) {
            img.classList.add('zoomable-image');
            img.style.cursor = 'pointer';
        }
        
        // Événement de clic sur l'image
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            modal.innerHTML = `<img src="${this.src}" alt="${this.alt}">`;
            modal.classList.add('active');
        });
    });
    
    // Fermer la modal en cliquant dessus
    modal.addEventListener('click', function() {
        this.classList.remove('active');
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Charger le thème sauvegardé au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // Ajouter l'écouteur d'événement au bouton
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Initialiser le système de zoom d'images
    initImageZoom();
    
    // Initialiser le bouton scroll to top
    initScrollToTop();
});

// Système de scroll to top
function initScrollToTop() {
    // Créer le bouton s'il n'existe pas
    let scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scroll-to-top';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Retour en haut');
        scrollBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z"/>
            </svg>
        `;
        document.body.appendChild(scrollBtn);
    }
    
    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Retour en haut au clic
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
