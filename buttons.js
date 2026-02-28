// buttons.js
class GAUDVIBEButtons {
    constructor() {
        this.buttons = [
            { text: 'CV', icon: '📄', url: '/CV.pdf', type: 'document' },
            { text: 'GitHub', icon: '🐙', url: 'https://github.com/GAUDVIBE', type: 'github' },
            { text: 'YouTube', icon: '🎥', url: 'https://youtube.com/@antoineGAUDRY', type: 'youtube' },
            { text: 'Instagram', icon: '📷', url: 'https://www.instagram.com/antoine_gdy/', type: 'instagram' }
        ];
        
        this.shaderColors = [];
        this.init();
    }
    
    init() {
        this.createStyles();
        this.createButtons();
        this.startColorSampling();
    }
    
    createStyles() {
        const styles = `
            .gaudvibe-buttons-container {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                gap: 30px;
                z-index: 1000;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                max-width: 90vw;
                padding: 20px;
            }
            
            /* EARTHBOUND STYLE BUTTONS */
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
                transition: transform linear 150ms, box-shadow 0.3s ease;
                text-decoration: none;
                font-family: sans-serif;
                font-size: 1.2rem;
                font-weight: normal;
                cursor: pointer;
                border: 0;
                display: flex;
                align-items: center;
                gap: 10px;
                letter-spacing: 1px;
                backdrop-filter: blur(2px);
                box-shadow:
                    0 0 0 5px #383050,  /* dark grey */
                    0 0 0 12px #f7e8a8, /* white */
                    0 0 0 15px #3d3c55; /* black */
            }
            
            .gaudvibe-button:hover {
                transform: translateY(-0.2em);
            }
            
            /* Style de l'icône */
            .gaudvibe-button .icon {
                font-size: 1.4rem;
                filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
                transition: transform 0.2s ease;
            }
            
            .gaudvibe-button:hover .icon {
                transform: scale(1.1);
            }
            
            /* Style du texte */
            .gaudvibe-button .text {
                text-shadow: 2px 2px 0 #3d3c55;
                font-weight: bold;
            }
            
            /* Effet de flèche au hover (style Earthbound) */
            .gaudvibe-button:hover::before {
                content: '';
                position: absolute;
                left: -0.8em;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 0.5rem solid transparent;
                border-bottom: 0.5rem solid transparent;
                border-left: 0.5rem solid #e7e6b3;
                filter: drop-shadow(2px 2px 0 #3d3c55);
            }
            
            /* Animation ripple */
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .gaudvibe-buttons-container {
                    gap: 20px;
                }
                
                .gaudvibe-button {
                    padding: 10px 20px;
                    font-size: 1rem;
                    box-shadow:
                        0 0 0 4px #383050,
                        0 0 0 10px #f7e8a8,
                        0 0 0 12px #3d3c55;
                }
                
                .gaudvibe-button .icon {
                    font-size: 1.2rem;
                }
            }
            
            @media (max-width: 480px) {
                .gaudvibe-buttons-container {
                    flex-direction: column;
                    width: 80%;
                }
                
                .gaudvibe-button {
                    width: 100%;
                    justify-content: center;
                }
                
                .gaudvibe-button:hover::before {
                    left: -0.5em;
                    border-top: 0.4rem solid transparent;
                    border-bottom: 0.4rem solid transparent;
                    border-left: 0.4rem solid #e7e6b3;
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
            btn.innerHTML = `<span class="icon">${button.icon}</span><span class="text">${button.text}</span>`;
            
            // Stocker l'index pour les couleurs
            btn.dataset.index = index;
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.createRipple(e, btn);
                setTimeout(() => window.open(btn.href, btn.target), 300);
            });
            
            container.appendChild(btn);
        });
        
        document.body.appendChild(container);
    }
    
    startColorSampling() {
        const canvas = document.getElementById('shaderCanvas');
        if (!canvas) return;
        
        const sampleColors = () => {
            const gl = canvas.getContext('webgl');
            if (!gl) return;
            
            const buttons = document.querySelectorAll('.gaudvibe-button');
            if (buttons.length === 0) return;
            
            const width = canvas.width;
            const height = canvas.height;
            
            // Positions différentes pour chaque bouton
            const positions = [
                {x: width * 0.2, y: height * 0.2},
                {x: width * 0.8, y: height * 0.2},
                {x: width * 0.2, y: height * 0.8},
                {x: width * 0.8, y: height * 0.8}
            ];
            
            const pixels = new Uint8Array(4);
            
            buttons.forEach((button, index) => {
                const pos = positions[index % positions.length];
                gl.readPixels(pos.x, pos.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                
                const r = pixels[0];
                const g = pixels[1];
                const b = pixels[2];
                
                // Mettre à jour le box-shadow avec la couleur du shader
                const currentBoxShadow = button.style.boxShadow;
                const newBoxShadow = `0 0 0 5px #383050, 0 0 0 10px rgb(${r}, ${g}, ${b}), 0 0 0 12px #f7e8a8, 0 0 0 15px #3d3c55`;
                
                if (currentBoxShadow !== newBoxShadow) {
                    button.style.boxShadow = newBoxShadow;
                }
            });
            
            requestAnimationFrame(sampleColors);
        };
        
        // Attendre que le canvas soit prêt
        setTimeout(sampleColors, 1000);
        requestAnimationFrame(sampleColors);
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

// Initialisation immédiate
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new GAUDVIBEButtons());
} else {
    new GAUDVIBEButtons();
}
