document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Background Parallax Effect ---
    const body = document.body;
    const parallaxStrength = 0.005; // Adjust this value to change the effect intensity

    function handleMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate movement based on mouse position relative to center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (mouseX - centerX) * parallaxStrength * -1; // -1 to invert the movement direction
        const moveY = (mouseY - centerY) * parallaxStrength * -1;
        
        // Apply movement using the CSS variables
        body.style.setProperty('--bg-x', ${moveX}px);
        body.style.setProperty('--bg-y', ${moveY}px);
    }

    // Attach event listener to the body
    document.addEventListener('mousemove', handleMouseMove);

    // --- 2. Fade-in on Scroll ---
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    faders.forEach(fader => observer.observe(fader));

    // --- 3. Blueprint Grid Animation Setup ---
    const grid = document.querySelector('.blueprint-grid');
    if (grid) {
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('span');
            grid.appendChild(line);
        }
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            node.classList.add('node');
            node.style.top = Math.random() * 90 + '%';
            node.style.left = Math.random() * 90 + '%';
            grid.appendChild(node);
        }
    }

    // --- 4. Newsletter Submission ---
    const form = document.getElementById('newsletter-form');
    const message = document.getElementById('form-message');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            message.style.display = 'block';
            message.textContent = 'Success! Email received for beta access.';
            setTimeout(() => {
                message.style.display = 'none';
                message.textContent = '';
                form.reset();
            }, 3000);
        });
    }

    // --- 5. Responsive Navigation Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // --- 6. Upload Section Logic ---
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');

    if (uploadBox && fileInput) {
        uploadBox.addEventListener('click', () => fileInput.click());
        
        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.style.background = '#E8F4FF';
        });
        
        uploadBox.addEventListener('dragleave', () => {
            uploadBox.style.background = '#F8FBFF';
        });
        
        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
            uploadBox.style.background = '#F8FBFF'; // Reset background after drop
        });

        fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

        function handleFile(file) {
            if (!file) return;

            // Reset previous states
            uploadPreview.style.display = 'none';
            loading.style.display = 'none';
            result.style.display = 'none';

            // Show preview and loading
            previewImage.src = URL.createObjectURL(file);
            uploadPreview.style.display = 'block';
            loading.style.display = 'block';

            // Simulate AI Analysis time
            setTimeout(() => {
                loading.style.display = 'none';
                result.style.display = 'block';
            }, 3000);
        }
    }
});