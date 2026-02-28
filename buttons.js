// buttons.js
class GAUDVIBEButtons {
    constructor() {
        this.buttons = [
            { text: 'CV', url: 'https://raw.githubusercontent.com/GAUDVIBE/Portfolio/main/CV.pdf', type: 'document' },
            { text: 'GitHub', url: 'https://github.com/GAUDVIBE', type: 'github' },
            { text: 'YouTube', url: 'https://youtube.com/@antoineGAUDRY', type: 'youtube' },
            { text: 'Instagram', url: 'https://www.instagram.com/antoine_gdy/', type: 'instagram' }
        ];
        
        this.init();
    }
    
    init() {
        this.createStyles();
        this.createButtons();
    }
    
    createStyles() {
        const styles = `
            .gaudvibe-buttons-container {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                gap: 20px;
                z-index: 1000;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                max-width: 90vw;
                padding: 20px;
                background: rgba(40, 8, 40, 0.3);
                border-radius: 60px;
                backdrop-filter: blur(5px);
                border: 2px solid rgba(231, 230, 179, 0.2);
            }
            
            .gaudvibe-button {
                position: relative;
                min-width: 5em;
                display: inline-block;
                vertical-align: top;
                background-color: #280828;
                color: #e7e6b3;
                padding: 12px 25px;
                border-radius: 1px;
                transform: translateY(0);
                transition: all 0.3s ease;
                text-decoration: none;
                font-family: sans-serif;
                font-size: 1.2rem;
                font-weight: normal;
                cursor: pointer;
                border: 0;
                text-align: center;
                backdrop-filter: blur(2px);
                /* Noir par défaut */
                box-shadow:
                    0 0 0 5px #383050,
                    0 0 0 10px #000000,
                    0 0 0 12px #f7e8a8,
                    0 0 0 15px #3d3c55;
            }
            
            /* Bleu-gris au hover */
            .gaudvibe-button:hover {
                transform: translateY(-0.2em);
                box-shadow:
                    0 0 0 5px #383050,
                    0 0 0 10px #4a6b8a,
                    0 0 0 12px #f7e8a8,
                    0 0 0 15px #3d3c55;
            }
            
            .gaudvibe-button .text {
                text-shadow: 2px 2px 0 #3d3c55;
                font-weight: bold;
                display: inline-block;
            }
            
            /* Flèche pour TOUS les boutons au hover */
            .gaudvibe-button:hover::before {
                content: '' !important;
                position: absolute !important;
                left: -0.8em !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                width: 0 !important;
                height: 0 !important;
                border-top: 0.5rem solid transparent !important;
                border-bottom: 0.5rem solid transparent !important;
                border-left: 0.5rem solid #e7e6b3 !important;
                filter: drop-shadow(2px 2px 0 #3d3c55) !important;
                z-index: 1001 !important;
            }
            
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            
            @media (max-width: 768px) {
                .gaudvibe-buttons-container {
                    gap: 15px;
                    padding: 15px;
                    border-radius: 50px;
                }
                .gaudvibe-button {
                    padding: 10px 20px;
                    font-size: 1rem;
                    box-shadow: 0 0 0 4px #383050, 0 0 0 8px #000000, 0 0 0 10px #f7e8a8, 0 0 0 12px #3d3c55;
                }
                .gaudvibe-button:hover {
                    box-shadow: 0 0 0 4px #383050, 0 0 0 8px #4a6b8a, 0 0 0 10px #f7e8a8, 0 0 0 12px #3d3c55;
                }
                .gaudvibe-button:hover::before {
                    left: -0.6em !important;
                    border-top: 0.4rem solid transparent !important;
                    border-bottom: 0.4rem solid transparent !important;
                    border-left: 0.4rem solid #e7e6b3 !important;
                }
            }
            
            @media (max-width: 480px) {
                .gaudvibe-buttons-container {
                    flex-direction: column;
                    width: 90%;
                    border-radius: 40px;
                    gap: 10px;
                }
                .gaudvibe-button {
                    width: 100%;
                    justify-content: center;
                }
                .gaudvibe-button:hover::before {
                    left: -0.5em !important;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    createButtons() {
        const container = document.createElement('div');
        container.className = 'gaudvibe-buttons-container';
        
        this.buttons.forEach((button, index) => {
            const btn = document.createElement('a');
            btn.href = button.url;
            btn.className = `gaudvibe-button ${button.type}`;
            btn.target = button.url.startsWith('http') ? '_blank' : '_self';
            btn.rel = button.url.startsWith('http') ? 'noopener noreferrer' : '';
            btn.innerHTML = `<span class="text">${button.text}</span>`;
            
            // Pour le CV, on ajoute download pour forcer le téléchargement
            if (button.type === 'document') {
                btn.setAttribute('download', 'CV.pdf');
            }
            
            // Ripple effect au clic
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.createRipple(e, btn);
                setTimeout(() => {
                    if (button.type === 'document') {
                        // Pour le CV, on utilise window.open pour le téléchargement
                        window.open(btn.href, '_blank');
                    } else {
                        window.open(btn.href, btn.target);
                    }
                }, 300);
            });
            
            container.appendChild(btn);
        });
        
        document.body.appendChild(container);
    }
    
    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            position: absolute;
            border-radius: 50%;
            background-color: rgba(231, 230, 179, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1001;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

// Initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GAUDVIBEButtons();
    });
} else {
    new GAUDVIBEButtons();
}
