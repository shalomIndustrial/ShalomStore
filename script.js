// ==========================================
// ShalomIndustrial - Scripts Principales
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Menú Móvil (Responsive Toggle)
    // ----------------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const header = document.getElementById('site-header');

    if (navToggle && primaryNav) {
        const closeNav = () => {
            navToggle.classList.remove('is-active');
            primaryNav.classList.remove('is-active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        const openNav = () => {
            navToggle.classList.add('is-active');
            primaryNav.classList.add('is-active');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        navToggle.addEventListener('click', () => {
            if (primaryNav.classList.contains('is-active')) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Cerrar menú al hacer clic en cualquier enlace
        const navLinks = primaryNav.querySelectorAll('.nav-link, .btn-nav');
        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!header.contains(event.target) && primaryNav.classList.contains('is-active')) {
                closeNav();
            }
        });

        // Cerrar menú con la tecla ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && primaryNav.classList.contains('is-active')) {
                closeNav();
            }
        });

        // Restaurar estado si se redimensiona a pantalla grande
        window.addEventListener('resize', () => {
            if (window.innerWidth > 860 && primaryNav.classList.contains('is-active')) {
                closeNav();
            }
        });
    }

    // ----------------------------------------------------
    // 2. Efecto de elevación en el Header al hacer scroll
    // ----------------------------------------------------
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // ----------------------------------------------------
    // 3. Formulario de Contacto (Landing Page)
    // ----------------------------------------------------
    const formulario = document.getElementById('form-contacto');
    if (formulario) {
        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();
            const boton = formulario.querySelector('button');
            const originalText = boton.textContent;
            boton.textContent = '¡Enviado! Te contactaremos pronto';
            boton.disabled = true;
            boton.style.opacity = '0.85';
            boton.style.cursor = 'default';
        });
    }

    // ----------------------------------------------------
    // 4. Lógica de Redirección (Página de Documentación)
    // ----------------------------------------------------
    const countdownEl = document.getElementById('redirect-countdown');
    const redirectBtn = document.getElementById('redirect-btn');
    const cancelBtn = document.getElementById('cancel-redirect-btn');
    const progressBar = document.getElementById('redirect-progress');
    const destinationUrlEl = document.getElementById('destination-url-text');

    if (countdownEl && redirectBtn) {
        // >>> CONFIGURACIÓN: Coloca aquí el link al sitio que deseas redirigir <<<
        const TARGET_URL = redirectBtn.getAttribute('href') || 'https://google.com';
        
        let secondsLeft = 5;
        let isCancelled = false;

        if (destinationUrlEl) {
            destinationUrlEl.textContent = TARGET_URL;
        }

        const interval = setInterval(() => {
            if (isCancelled) {
                clearInterval(interval);
                return;
            }

            secondsLeft--;
            if (countdownEl) {
                countdownEl.textContent = secondsLeft;
            }

            if (secondsLeft <= 0) {
                clearInterval(interval);
                window.location.href = TARGET_URL;
            }
        }, 1000);

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                isCancelled = true;
                clearInterval(interval);
                if (progressBar) {
                    progressBar.style.animationPlayState = 'paused';
                }
                countdownEl.parentElement.innerHTML = '<em>Redirección automática pausada.</em> Puedes acceder manualmente con el botón.';
                cancelBtn.style.display = 'none';
            });
        }
    }
});