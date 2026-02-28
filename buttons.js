// buttons.js
class GAUDVIBEButtons {
    constructor() {
        this.buttons = [
            { text: 'CV', icon: '📄', url: '/CV.pdf', type: 'document' },
            { text: 'GitHub', icon: '🐙', url: 'https://github.com/GAUDVIBE', type: 'github' },
            { text: 'YouTube', icon: '🎥', url: 'https://youtube.com/@antoineGAUDRY', type: 'youtube' },
            { text: 'Instagram', icon: '📷', url: 'https://www.instagram.com/antoine_gdy/', type: 'instagram' }
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
                gap: 30px;
                z-index: 1000;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                max-width: 90vw;
                padding: 20px;
            }
            
            /* EARTHBOUND STYLE BUTTONS - Bordure du milieu noire */
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
                /* Bordure du milieu noire par défaut */
                box-shadow:
                    0 0 0 5px #383050,  /* dark grey */
                    0 0 0 10px #000000, /* black */
                    0 0 0 12px #f7e8a8, /* white */
                    0 0 0 15px #3d3c55; /* black */
            }
            
            /* Supprimer tout style :hover qui pourrait interférer */
            .gaudvibe-button:hover {
                transform: translateY(-0.2em);
                /* Pas de box-shadow ici pour laisser JS faire le travail */
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
                        0 0 0 8px #000000,
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
            
            // Au hover, appliquer une couleur aléatoire du shader
            btn.addEventListener('mouseenter', (e) => {
                e.preventDefault();
                this.applyRandomShaderColor(btn);
            });
            
            // Au mouseleave, revenir à la couleur noire par défaut
            btn.addEventListener('mouseleave', (e) => {
                e.preventDefault();
                this.resetToDefaultColor(btn);
            });
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.createRipple(e, btn);
                setTimeout(() => window.open(btn.href, btn.target), 300);
            });
            
            container.appendChild(btn);
        });
        
        document.body.appendChild(container);
    }
    
    applyRandomShaderColor(button) {
        const canvas = document.getElementById('shaderCanvas');
        if (!canvas) {
            console.log('Canvas non trouvé');
            return;
        }
        
        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.log('WebGL non disponible');
            return;
        }
        
        try {
            // S'assurer que le canvas a une taille valide
            if (canvas.width === 0 || canvas.height === 0) {
                console.log('Canvas pas encore dimensionné');
                return;
            }
            
            // Prendre une position aléatoire dans le canvas
            const x = Math.floor(Math.random() * canvas.width);
            const y = Math.floor(Math.random() * canvas.height);
            
            const pixels = new Uint8Array(4);
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            
            const r = pixels[0];
            const g = pixels[1];
            const b = pixels[2];
            
            console.log(`Couleur appliquée: rgb(${r}, ${g}, ${b})`);
            
            // Appliquer la nouvelle couleur
            const newBoxShadow = `0 0 0 5px #383050, 0 0 0 10px rgb(${r}, ${g}, ${b}), 0 0 0 12px #f7e8a8, 0 0 0 15px #3d3c55`;
            
            // Forcer le style avec !important pour éviter les conflits CSS
            button.style.setProperty('box-shadow', newBoxShadow, 'important');
            button.style.transition = 'box-shadow 0.3s ease';
            
        } catch (error) {
            console.error('Erreur lors de l\'application de la couleur:', error);
        }
    }
    
    resetToDefaultColor(button) {
        // Revenir à la couleur noire par défaut avec !important
        const defaultBoxShadow = `0 0 0 5px #383050, 0 0 0 10px #000000, 0 0 0 12px #f7e8a8, 0 0 0 15px #3d3c55`;
        button.style.setProperty('box-shadow', defaultBoxShadow, 'important');
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
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM chargé, initialisation des boutons...');
        new GAUDVIBEButtons();
    });
} else {
    console.log('Initialisation immédiate des boutons...');
    new GAUDVIBEButtons();
}
