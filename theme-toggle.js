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
});
