// ====================================================== //
// GESTION DU MENU BURGER MOBILE                          //
// ====================================================== //

// Attend que tout le document HTML soit chargé avant d'exécuter le script.
document.addEventListener("DOMContentLoaded", () => {
    // Selection des elements du DOM
    //on recupère le bouton de menu mobile et la navigation principale
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const primaryNav = document.querySelector(".main-nav");

     // --- Vérification de l'existence des éléments ---
    // C'est une bonne pratique de s'assurer que les éléments existent avant d'agir dessus.

    if (mobileNavToggle && primaryNav) {
        // Ajout d'un écouteur d'événement pour le clic sur le bouton de menu mobile
        mobileNavToggle.addEventListener("click", () => {
             // --- Logique de bascule (Toggle) ---
            // On ajoute ou retire la classe 'nav-open' sur le menu.
            // Le CSS se chargera de l'afficher ou de le cacher en fonction de cette classe.
            primaryNav.classList.toggle("nav-open");
            // On ajoute ou retire la classe 'is-active' sur le bouton lui-même
            // pour animer le burger en croix (X).
            mobileNavToggle.classList.toggle("is-active");
            // Bonus : On bloque le défilement du corps de la page quand le menu est ouvert.
            document.body.classList.toggle("no-scroll");
        });
    }
    // --- Fin de la vérification ---


});

// ====================================================== //
// ANIMATION DU COMPTEUR POUR LA SECTION STATS            //
// ====================================================== //

// On sélectionne la section des stats
const statsSection = document.querySelector('.stats-section');

// Fonction pour l'animation de comptage
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Vitesse de l'animation

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+ de ', '').replace('%', ''); // Nettoie le texte actuel pour obtenir un nombre

            const increment = target / speed;

            if (count < target) {
                const newCount = Math.ceil(count + increment);
                // Gère l'affichage pour les différents formats
                if (counter.getAttribute('data-target') === '100') {
                    counter.innerText = newCount + '%';
                } else {
                    counter.innerText = '+ de ' + newCount;
                }
                setTimeout(updateCount, 10); // Répète l'opération
            } else {
                // S'assure que la valeur finale est exacte
                if (counter.getAttribute('data-target') === '100') {
                    counter.innerText = target + '%';
                } else {
                    counter.innerText = '+ de ' + target;
                }
            }
        };
        updateCount();
    });
};
// Utilise l'API Intersection Observer pour ne lancer l'animation qu'une seule fois
// quand la section devient visible. C'est très performant.
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Si la section est visible à l'écran
        if (entry.isIntersecting) {
            animateCounters(); // On lance l'animation
            observer.unobserve(entry.target); // On arrête d'observer pour ne pas la relancer
        }
    });
}, { threshold: 0.5 }); // Se déclenche quand 50% de la section est visible

// S'assure que la section existe avant d'observer
if (statsSection) {
    observer.observe(statsSection);
}

// ====================================================== //
// GESTION DE L'ÉTAT ACTIF POUR LES FILTRES PRODUITS      //
// ====================================================== //
// ====================================================== //
// GESTION COMPLÈTE DU FILTRE DE PRODUITS (Logique + Style) //
// ====================================================== //

    // Sélection des éléments avec les NOUVELLES classes
    const filtreBoutons = document.querySelectorAll('.product-filters .btn-filter');
    const produitCartes = document.querySelectorAll('.produits-grid .produit-carte');

    // On vérifie que les éléments existent sur la page
    if (filtreBoutons.length > 0 && produitCartes.length > 0) {
        
        // On ajoute un écouteur d'événement sur chaque bouton de filtre
        filtreBoutons.forEach(bouton => {
            bouton.addEventListener('click', () => {
                
                // --- 1. Gestion de l'état "actif" du bouton cliqué ---
                // On retire d'abord la classe 'active' de tous les boutons
                filtreBoutons.forEach(btn => btn.classList.remove('active'));
                // On ajoute la classe 'active' uniquement au bouton qui vient d'être cliqué
                bouton.classList.add('active');


                // --- 2. Logique de filtrage des produits ---
                const categorieCible = bouton.getAttribute('data-categorie');

                produitCartes.forEach(carte => {
                    const carteCategorie = carte.getAttribute('data-categorie');
                    
                    // Condition pour afficher ou cacher la carte
                    const doitEtreVisible = categorieCible === 'tous' || carteCategorie === categorieCible;

                    // Pour une animation professionnelle, on utilise des classes plutôt que style.display
                    if (doitEtreVisible) {
                        carte.classList.remove('hidden');
                    } else {
                        carte.classList.add('hidden');
                    }
                });
            });
        });
    }