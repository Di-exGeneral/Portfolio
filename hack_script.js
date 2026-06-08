document.addEventListener('DOMContentLoaded', () => {

    function initCarousel(track, slides, dotsContainer, leftBtn, rightBtn, viewport, interval) {
        if (!slides.length) return;

        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);

        const all = track.children;
        let current = 1;
        let transitioning = false;
        let timer;

        track.style.transition = 'none';
        track.style.transform = `translateX(-${current * 100}%)`;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goTo(i + 1, i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function updateDots(realIndex) {
            dots.forEach((d, i) => d.classList.toggle('active', i === realIndex));
        }

        function goTo(index, dotIndex) {
            if (transitioning) return;
            transitioning = true;
            current = index;
            track.style.transition = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
            track.style.transform = `translateX(-${current * 100}%)`;
            if (dotIndex !== undefined) updateDots(dotIndex);
            resetTimer();
        }

        track.addEventListener('transitionend', () => {
            transitioning = false;
            if (current === 0) {
                track.style.transition = 'none';
                current = slides.length;
                track.style.transform = `translateX(-${current * 100}%)`;
                updateDots(slides.length - 1);
            }
            if (current === all.length - 1) {
                track.style.transition = 'none';
                current = 1;
                track.style.transform = `translateX(-${current * 100}%)`;
                updateDots(0);
            }
        });

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(() => {
                const dotIndex = current >= slides.length ? 0 : current;
                goTo(current + 1, dotIndex);
            }, interval);
        }

        leftBtn.addEventListener('click', () => {
            const dotIndex = current - 2 < 0 ? slides.length - 1 : current - 2;
            goTo(current - 1, dotIndex);
        });

        rightBtn.addEventListener('click', () => {
            const dotIndex = current >= slides.length ? 0 : current;
            goTo(current + 1, dotIndex);
        });

        if (viewport) {
            viewport.addEventListener('mouseenter', () => clearInterval(timer));
            viewport.addEventListener('mouseleave', resetTimer);
        }

        resetTimer();
    }


    // ── HACKATHON CARD CAROUSELS ──
    document.querySelectorAll('.hack-card').forEach(card => {
        const track = card.querySelector('.carousel-track');
        const slides = Array.from(track.querySelectorAll('img'));
        const dotsContainer = card.querySelector('.carousel-dots');
        const leftBtn = card.querySelector('.carousel-arrow.left');
        const rightBtn = card.querySelector('.carousel-arrow.right');
        const viewport = card.querySelector('.hack-carousel');

        initCarousel(track, slides, dotsContainer, leftBtn, rightBtn, viewport, 3500);
    });


    // ── CERTIFICATES CAROUSEL ──
    const certTrack = document.querySelector('.cert-track');
    const certSlides = Array.from(document.querySelectorAll('.cert-slide'));
    const certDotsContainer = document.querySelector('.cert-dots');
    const certLeft = document.querySelector('.cert-arrow.left');
    const certRight = document.querySelector('.cert-arrow.right');
    const certViewport = document.querySelector('.cert-viewport');

    if (certTrack && certSlides.length) {
        initCarousel(certTrack, certSlides, certDotsContainer, certLeft, certRight, certViewport, 4000);
    }

});
