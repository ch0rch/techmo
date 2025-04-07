document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos
    const solutionsSection = document.querySelector('.solutions-stack-section');
    if (!solutionsSection) return;
  
    const solutionCards = document.querySelectorAll('.solution-card');
    if (!solutionCards.length) return;
  
    // Configuración
    let currentCardIndex = 0;
    let isScrolling = false;
    const cardCount = solutionCards.length;
    
    // Inicializar la primera tarjeta como activa
    solutionCards[0].style.opacity = '1';
    solutionCards[0].style.transform = 'translateY(0)';
    solutionCards[0].style.zIndex = '20';
    
    // Función para mostrar una tarjeta específica
    function showCard(index) {
      // Asegurarse de que el índice esté dentro del rango
      index = Math.max(0, Math.min(cardCount - 1, index));
      
      // Actualizar el índice actual
      currentCardIndex = index;
      
      // Actualizar todas las tarjetas
      solutionCards.forEach((card, i) => {
        if (i === index) {
          // Tarjeta activa
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.style.zIndex = '20';
        } else if (i < index) {
          // Tarjetas anteriores
          card.style.opacity = '0.7';
          card.style.transform = 'translateY(-30px) scale(0.95)';
          card.style.zIndex = '10';
        } else {
          // Tarjetas siguientes
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          card.style.zIndex = '5';
        }
      });
    }
    
    // Manejar el evento de scroll
    function handleScroll(e) {
      if (isScrolling) return;
      
      isScrolling = true;
      
      // Determinar la dirección del scroll
      const delta = e.deltaY || e.detail || e.wheelDelta;
      
      if (delta > 0 && currentCardIndex < cardCount - 1) {
        // Scroll hacia abajo - mostrar la siguiente tarjeta
        showCard(currentCardIndex + 1);
        e.preventDefault();
      } else if (delta < 0 && currentCardIndex > 0) {
        // Scroll hacia arriba - mostrar la tarjeta anterior
        showCard(currentCardIndex - 1);
        e.preventDefault();
      } else {
        // Permitir el scroll normal si estamos en la primera o última tarjeta
        isScrolling = false;
        return;
      }
      
      // Desbloquear el scroll después de la animación
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    }
    
    // Agregar el evento de scroll a la sección
    solutionsSection.addEventListener('wheel', handleScroll, { passive: false });
    
    // También manejar eventos táctiles para dispositivos móviles
    let touchStartY = 0;
    
    solutionsSection.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    solutionsSection.addEventListener('touchmove', function(e) {
      if (isScrolling) return;
      
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      
      // Umbral para considerar un swipe
      if (Math.abs(diff) > 50) {
        isScrolling = true;
        
        if (diff > 0 && currentCardIndex < cardCount - 1) {
          // Swipe hacia arriba - mostrar la siguiente tarjeta
          showCard(currentCardIndex + 1);
          e.preventDefault();
        } else if (diff < 0 && currentCardIndex > 0) {
          // Swipe hacia abajo - mostrar la tarjeta anterior
          showCard(currentCardIndex - 1);
          e.preventDefault();
        } else {
          // Permitir el scroll normal
          isScrolling = false;
          return;
        }
        
        // Actualizar el punto de inicio para el próximo movimiento
        touchStartY = touchY;
        
        // Desbloquear el scroll después de la animación
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    }, { passive: false });
    
    // Observador de intersección para activar/desactivar el control de scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // La sección está visible, activar el control de scroll
          document.body.style.overflow = 'hidden';
        } else {
          // La sección no está visible, desactivar el control de scroll
          document.body.style.overflow = '';
        }
      });
    }, { threshold: 0.5 }); // Activar cuando al menos el 50% de la sección esté visible
    
    observer.observe(solutionsSection);
  });

  // Agregar funcionalidad a los indicadores de navegación
const navDots = document.querySelectorAll('.nav-dot');
navDots.forEach(dot => {
  dot.addEventListener('click', function() {
    const index = parseInt(this.getAttribute('data-index'));
    showCard(index);
    
    // Actualizar los indicadores
    navDots.forEach((d, i) => {
      d.style.opacity = i === index ? '1' : '0.3';
    });
  });
});

// Actualizar los indicadores cuando cambia la tarjeta activa
function updateNavDots() {
  navDots.forEach((dot, i) => {
    dot.style.opacity = i === currentCardIndex ? '1' : '0.3';
  });
}

// Modificar la función showCard para actualizar los indicadores
const originalShowCard = showCard;
showCard = function(index) {
  originalShowCard(index);
  updateNavDots();
};