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
});
