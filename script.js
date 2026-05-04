// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission (mock)
const form = document.getElementById('lead-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerText = 'Sucesso! Entraremos em contato.';
            btn.style.background = '#10b981';
            form.reset();
        }, 1500);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.style.padding = '0.8rem 0';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        nav.style.padding = '1.5rem 0';
        nav.style.boxShadow = 'none';
    }
});
