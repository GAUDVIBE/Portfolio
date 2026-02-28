// buttons.js - Version avec support mobile pour les flèches
class GAUDVIBEButtons {
    constructor() {
        this.links = [
            { text: 'CV', url: 'https://raw.githubusercontent.com/GAUDVIBE/Portfolio/main/CV.pdf' },
            { text: 'GitHub', url: 'https://github.com/GAUDVIBE' },
            { text: 'YouTube', url: 'https://youtube.com/@antoineGAUDRY' },
            { text: 'Instagram', url: 'https://www.instagram.com/antoine_gdy/' }
        ];
        
        this.init();
    }
    
    init() {
        this.injectStyles();
        this.buildUI();
    }
    
    injectStyles() {
        const styles = `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body { 
                font-family: 'Courier New', monospace; 
                font-size: 1.2rem; 
                padding: 2em; 
                background: transparent; 
                margin: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            main { 
                max-width: 600px; 
                width: 100%;
                margin: auto; 
                display: flex; 
                flex-direction: column; 
                gap: 30px; 
                z-index: 1000;
                position: relative;
            }
            
            /* Style Earthbound box */
            .box {
                background-color: #280828;
                color: #e7e6b3;
                padding: 25px 30px;
                border-radius: 1px;
                width: 100%;
                box-shadow: 
                    0 0 0 5px #383050,
                    0 0 0 10px #68d0b8,
                    0 0 0 12px #f7e8a8,
                    0 0 0 15px #3d3c55;
            }
            
            /* Container texte - aligné à gauche */
            .text-container { 
                width: 100%; 
            }
            
            .text-container .main-text { 
                font-size: 1.4rem; 
                font-weight: bold; 
                text-align: left;
                text-shadow: 2px 2px 0 #3d3c55; 
                font-family: 'Courier New', monospace;
                color: #e7e6b3;
                padding-left: 10px;
            }
            
            /* Container boutons */
            .buttons-container { 
                width: 100%; 
            }
            
            .buttons-container .box { 
                padding: 30px 35px; 
            }
            
            .button-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 25px;
                justify-items: center;
                align-items: center;
                min-width: 300px;
                width: 100%;
            }
            
            /* Style des boutons */
            .box button {
                position: relative;
                cursor: pointer;
                background-color: #280828;
                border: none;
                color: #e7e6b3;
                font-family: 'Courier New', monospace;
                font-size: 1.4rem;
                font-weight: bold;
                padding: 12px 25px;
                min-width: 120px;
                text-align: center;
                text-shadow: 2px 2px 0 #3d3c55;
                transition: all 0.3s ease;
                border-radius: 1px;
                width: 100%;
                -webkit-tap-highlight-color: transparent; /* Supprime le highlight sur mobile */
            }
            
            /* Hover et Active (pour mobile) */
            .box button:hover,
            .box button:active {
                background-color: transparent;
                color: #e7e6b3;
                text-shadow: 2px 2px 0 #3d3c55;
                transform: translateY(-2px);
            }
            
            /* Flèche au hover et au clic (pour mobile) */
            .box button:hover::before,
            .box button:active::before {
                content: '';
                position: absolute;
                left: -0.8em;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 0.6rem solid transparent;
                border-bottom: 0.6rem solid transparent;
                border-left: 0.6rem solid #e7e6b3;
                filter: drop-shadow(2px 2px 0 #3d3c55);
                z-index: 10;
            }
            
            /* Animation ripple */
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            /* Responsive - Version mobile */
            @media (max-width: 768px) {
                body { 
                    padding: 1em; 
                    font-size: 1rem; 
                    align-items: flex-start; /* Aligner en haut sur mobile */
                    padding-top: 2em;
                }
                
                main { 
                    gap: 20px; 
                }
                
                .box { 
                    padding: 20px 25px; 
                    box-shadow: 
                        0 0 0 4px #383050,
                        0 0 0 8px #68d0b8,
                        0 0 0 10px #f7e8a8,
                        0 0 0 12px #3d3c55;
                }
                
                .buttons-container .box { 
                    padding: 25px 20px; 
                }
                
                .button-grid { 
                    gap: 15px; 
                    min-width: auto; 
                }
                
                .box button { 
                    font-size: 1.2rem; 
                    padding: 10px 15px; 
                    min-width: auto; 
                }
                
                .text-container .main-text { 
                    font-size: 1.2rem; 
                    padding-left: 5px;
                }
                
                /* Ajustement flèche pour mobile */
                .box button:hover::before,
                .box button:active::before { 
                    left: -0.6em; 
                    border-top: 0.5rem solid transparent;
                    border-bottom: 0.5rem solid transparent;
                    border-left: 0.5rem solid #e7e6b3;
                }
            }
            
            @media (max-width: 600px) {
                .button-grid { 
                    grid-template-columns: 1fr; 
                    gap: 12px; 
                }
                
                .box button { 
                    width: 100%; 
                    padding: 12px 20px;
                }
                
                /* Flèche pour très petits écrans */
                .box button:hover::before,
                .box button:active::before { 
                    left: -0.5em; 
                    border-top: 0.4rem solid transparent;
                    border-bottom: 0.4rem solid transparent;
                    border-left: 0.4rem solid #e7e6b3;
                }
            }
            
            /* Pour les écrans tactiles, on garde l'effet après le clic */
            @media (hover: none) and (pointer: coarse) {
                .box button:active {
                    background-color: transparent;
                    color: #e7e6b3;
                    text-shadow: 2px 2px 0 #3d3c55;
                    transform: translateY(-2px);
                }
                
                .box button:active::before {
                    content: '';
                    position: absolute;
                    left: -0.6em;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-top: 0.5rem solid transparent;
                    border-bottom: 0.5rem solid transparent;
                    border-left: 0.5rem solid #e7e6b3;
                    filter: drop-shadow(2px 2px 0 #3d3c55);
                    z-index: 10;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    buildUI() {
        // Créer le main
        const main = document.createElement('main');
        
        // === CONTAINER TEXTE ===
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        
        const textBox = document.createElement('section');
        textBox.className = 'box';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'main-text';
        textDiv.textContent = '• Que voulez-vous faire ?';
        
        textBox.appendChild(textDiv);
        textContainer.appendChild(textBox);
        main.appendChild(textContainer);
        
        // === CONTAINER BOUTONS ===
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        
        const buttonsBox = document.createElement('section');
        buttonsBox.className = 'box';
        
        const buttonGrid = document.createElement('div');
        buttonGrid.className = 'button-grid';
        
        // Créer les boutons
        this.links.forEach(link => {
            const button = document.createElement('button');
            button.textContent = link.text;
            
            // Ajouter un gestionnaire tactile pour s'assurer que l'effet fonctionne
            button.addEventListener('touchstart', (e) => {
                // Forcer l'effet visuel au toucher
                button.classList.add('touch-active');
            });
            
            button.addEventListener('touchend', (e) => {
                // Enlever l'effet après le toucher
                button.classList.remove('touch-active');
                this.rippleEffect(e, button);
                setTimeout(() => window.open(link.url, '_blank'), 300);
            });
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.rippleEffect(e, button);
                setTimeout(() => window.open(link.url, '_blank'), 300);
            });
            
            buttonGrid.appendChild(button);
        });
        
        buttonsBox.appendChild(buttonGrid);
        buttonsContainer.appendChild(buttonsBox);
        main.appendChild(buttonsContainer);
        
        // Ajouter au body
        document.body.appendChild(main);
    }
    
    rippleEffect(event, button) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
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
