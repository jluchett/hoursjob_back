// Welcome Screen Logic
document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const playWithSound = document.getElementById('playWithSound');
    const playWithoutSound = document.getElementById('playWithoutSound');
    const weddingMusic = document.getElementById('weddingMusic');
    
    // Set wedding date (2 months from now)
    const weddingDate = new Date();
    weddingDate.setMonth(weddingDate.getMonth() + 2);
    document.getElementById('weddingDate').textContent = formatDate(weddingDate);
    
    // Welcome screen buttons
    playWithSound.addEventListener('click', function() {
        welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';
        weddingMusic.play().catch(e => console.log('Audio playback prevented:', e));
        checkScroll(); // Trigger scroll animations
    });
    
    playWithoutSound.addEventListener('click', function() {
        welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';
        checkScroll(); // Trigger scroll animations
    });
    
    // Countdown Timer
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, "0");
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, "0");
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Scroll Animations
    function checkScroll() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    
    // Form Submission
    document.getElementById('wedding-rsvp').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por confirmar tu asistencia! Nos vemos en la boda.');
        this.reset();
    });
    
    // Helper function to format date
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }
});