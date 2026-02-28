// buttons.js
class GAUDVIBEButtons {
    constructor() {
        this.links = [
            { text: 'CV', url: 'https://raw.githubusercontent.com/GAUDVIBE/Portfolio/main/CV.pdf', type: 'document' },
            { text: 'GitHub', url: 'https://github.com/GAUDVIBE', type: 'github' },
            { text: 'YouTube', url: 'https://youtube.com/@antoineGAUDRY', type: 'youtube' },
            { text: 'Instagram', url: 'https://www.instagram.com/antoine_gdy/', type: 'instagram' }
        ];
        
        this.init();
    }
    
    init() {
        this.createStyles();
        this.createContainers();
    }
    
    createStyles() {
        const styles = `
            /* Style général */
            body {
                font-size: 1.2rem;
                font-family: 'Courier New', Courier, monospace;
                margin: 0;
                padding: 2em;
                background-color: transparent;
            }
            
            main {
                max-width: 600px;
                margin: auto;
                position: relative;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                gap: 30px;  /* Espace entre les deux containers */
            }
            
            /* EARTHBOUND STYLE BOX */
            .box {
                min-width: 5em;
                display: inline-block;
                position: relative;
                vertical-align: top;
                background-color: #280828;
                color: #e7e6b3;
                padding: 25px 30px;
                border-radius: 1px;
                font-family: 'Courier New', Courier, monospace;
                box-shadow:
                    0 0 0 5px #383050,
                    0 0 0 10px #68d0b8,
                    0 0 0 12px #f7e8a8,
                    0 0 0 15px #3d3c55;
                width: 100%;
                box-sizing: border-box;
            }
            
            .box.full {
                width: 100%;
                display: block;
                box-sizing: border-box;
            }
            
            /* Container pour le texte */
            .text-container {
                text-align: center;
            }
            
            .text-container .box {
                background-color: #280828;
            }
            
            .text-container .main-text {
                color: #e7e6b3;
                text-shadow: 2px 2px 0 #3d3c55;
                font-size: 1.4rem;  /* Plus grand */
                font-family: 'Courier New', Courier, monospace;
                font-weight: bold;
                letter-spacing: 1px;
                margin: 0;
            }
            
            /* Container pour les boutons */
            .buttons-container {
                display: flex;
                justify-content: center;
            }
            
            .buttons-container .box {
                padding: 30px 35px;
            }
            
            /* Grille carrée pour les boutons */
            .button-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 25px;  /* Plus d'espace entre les boutons */
                justify-items: center;
                align-items: center;
                min-width: 300px;
            }
            
            /* Style des boutons */
            .box button {
                position: relative;
                cursor: pointer;
                background: #280828;
                border: 0;
                color: #e7e6b3;
                font-size: 1.4rem;  /* Plus grand */
                font-family: 'Courier New', Courier, monospace;
                font-weight: bold;
                padding: 12px 25px;  /* Plus de padding */
                min-width: 120px;  /* Plus large */
                text-align: center;
                transition: all 0.3s ease;
                border-radius: 1px;
                text-shadow: 2px 2px 0 #3d3c55;
                letter-spacing: 1px;
            }
            
            /* Au hover, fond plus clair */
            .box button:hover {
                background: #383050;
                color: #e7e6b3;
                text-shadow: 2px 2px 0 #3d3c55;
                transform: translateY(-2px);
            }
            
            /* Flèche au hover */
            .box button:hover::before {
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
            
            /* Responsive */
            @media (max-width: 768px) {
                body {
                    padding: 1em;
                    font-size: 1rem;
                }
                
                main {
                    max-width: 95%;
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
                    padding: 25px 30px;
                }
                
                .button-grid {
                    gap: 20px;
                    min-width: 250px;
                }
                
                .box button {
                    font-size: 1.2rem;
                    padding: 10px 20px;
                    min-width: 100px;
                }
                
                .text-container .main-text {
                    font-size: 1.2rem;
                }
                
                .box button:hover::before {
                    left: -0.6em;
                    border-top: 0.5rem solid transparent;
                    border-bottom: 0.5rem solid transparent;
                    border-left: 0.5rem solid #e7e6b3;
                }
            }
            
            @media (max-width: 600px) {
                .button-grid {
                    grid-template-columns: 1fr;  /* Passe en colonne sur mobile */
                    gap: 15px;
                    min-width: auto;
                    width: 100%;
                }
                
                .box button {
                    width: 100%;
                    min-width: auto;
                }
            }
            
            @media (max-width: 480px) {
                .box {
                    padding: 15px 20px;
                }
                
                .buttons-container .box {
                    padding: 20px 25px;
                }
                
                .box button {
                    font-size: 1.1rem;
                    padding: 8px 15px;
                }
                
                .box button:hover::before {
                    left: -0.4em;
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
    
    createContainers() {
        // Créer le main
        const main = document.createElement('main');
        
        // === PREMIER CONTAINER : Le texte ===
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        
        const textBox = document.createElement('section');
        textBox.className = 'box full';
        
        const textElement = document.createElement('div');
        textElement.className = 'main-text';
        textElement.textContent = 'Que voulez-vous sélectionner ?';
        
        textBox.appendChild(textElement);
        textContainer.appendChild(textBox);
        
        // === DEUXIÈME CONTAINER : Les boutons ===
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        
        const buttonsBox = document.createElement('section');
        buttonsBox.className = 'box full';
        
        // Créer la grille de boutons
        const buttonGrid = document.createElement('div');
        buttonGrid.className = 'button-grid';
        
        // Ajouter chaque lien comme un bouton dans la grille
        this.links.forEach((link, index) => {
            const button = document.createElement('button');
            button.textContent = link.text;
            button.dataset.url = link.url;
            button.dataset.type = link.type;
            
            // Pour le CV, ajouter l'attribut download
            if (link.type === 'document') {
                button.dataset.download = 'CV.pdf';
            }
            
            // Ajouter l'événement de clic
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.createRipple(e, button);
                
                setTimeout(() => {
                    if (link.type === 'document') {
                        window.open(link.url, '_blank');
                    } else {
                        window.open(link.url, '_blank');
                    }
                }, 300);
            });
            
            buttonGrid.appendChild(button);
        });
        
        buttonsBox.appendChild(buttonGrid);
        buttonsContainer.appendChild(buttonsBox);
        
        // Assembler le tout
        main.appendChild(textContainer);
        main.appendChild(buttonsContainer);
        
        // Ajouter au body
        document.body.appendChild(main);
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
