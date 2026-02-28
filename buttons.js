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
        this.createContainer();
    }
    
    createStyles() {
        const styles = `
            /* Style général */
            body {
                font-size: 1.2rem;
                font-family: sans-serif;
                margin: 0;
                padding: 2em;
                background-color: transparent;
            }
            
            main {
                max-width: 600px;
                margin: auto;
                position: relative;
                z-index: 1000;
            }
            
            .grid {
                display: flex;
            }
            
            .grid.between {
                justify-content: space-between;
                align-items: center;
            }
            
            .grid.center {
                justify-content: center;
                align-items: center;
            }
            
            .column:first-child {
                margin-right: 0.5em;
            }
            
            .right {
                text-align: right;
            }
            
            p {
                margin-bottom: 0;
            }
            
            /* EARTHBOUND STYLE BOX */
            .box {
                min-width: 5em;
                display: inline-block;
                position: relative;
                vertical-align: top;
                background-color: #280828;
                color: #e7e6b3;
                padding: 20px 25px;
                border-radius: 1px;
                box-shadow:
                    0 0 0 5px #383050,
                    0 0 0 10px #68d0b8,
                    0 0 0 12px #f7e8a8,
                    0 0 0 15px #3d3c55;
                margin: 20px 0;
            }
            
            .box.full {
                width: 100%;
                display: block;
                box-sizing: border-box;
            }
            
            /* Conteneur du texte à gauche */
            .box .left-text {
                color: #e7e6b3;
                text-shadow: 1px 1px 0 #3d3c55;
                font-size: 1.1rem;
                margin-right: 20px;
                white-space: nowrap;
            }
            
            /* Grille carrée pour les boutons */
            .button-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                justify-items: center;
                align-items: center;
            }
            
            /* Style des boutons dans la box */
            .box button {
                position: relative;
                cursor: pointer;
                background: transparent;
                border: 0;
                color: #e7e6b3;
                font-size: 1.2rem;
                font-family: sans-serif;
                padding: 8px 15px;
                min-width: 90px;
                text-align: center;
                transition: all 0.3s ease;
                border-radius: 1px;
            }
            
            .box button:hover {
                transform: translateY(-2px);
                background: rgba(255, 255, 255, 0.05);
            }
            
            /* Flèche au hover (style Earthbound) */
            .box button:hover::before {
                content: '';
                position: absolute;
                left: -0.3em;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 0.3rem solid transparent;
                border-bottom: 0.3rem solid transparent;
                border-left: 0.3rem solid #e7e6b3;
                filter: drop-shadow(1px 1px 0 #3d3c55);
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
                
                .box {
                    padding: 15px 20px;
                    box-shadow:
                        0 0 0 4px #383050,
                        0 0 0 8px #68d0b8,
                        0 0 0 10px #f7e8a8,
                        0 0 0 12px #3d3c55;
                }
                
                .button-grid {
                    gap: 10px;
                }
                
                .box button {
                    font-size: 1rem;
                    padding: 6px 10px;
                    min-width: 70px;
                }
                
                .box .left-text {
                    font-size: 1rem;
                }
            }
            
            @media (max-width: 600px) {
                .grid.between {
                    flex-direction: column;
                    gap: 20px;
                }
                
                .box .left-text {
                    margin-right: 0;
                    white-space: normal;
                    text-align: center;
                }
                
                .button-grid {
                    width: 100%;
                }
            }
            
            @media (max-width: 480px) {
                .box {
                    padding: 15px;
                }
                
                .button-grid {
                    grid-template-columns: 1fr;
                    gap: 10px;
                }
                
                .box button {
                    width: 100%;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    createContainer() {
        // Créer le main
        const main = document.createElement('main');
        
        // Créer la box Earthbound
        const section = document.createElement('section');
        section.className = 'box full';
        
        // Créer le conteneur flex
        const div = document.createElement('div');
        div.className = 'grid between';
        
        // Partie gauche : le texte
        const leftAside = document.createElement('aside');
        leftAside.className = 'left-text';
        leftAside.textContent = 'Que voulez-vous sélectionner ?';
        
        // Partie droite : la grille carrée de boutons
        const rightAside = document.createElement('aside');
        
        // Créer la grille
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
        
        rightAside.appendChild(buttonGrid);
        
        // Assembler le tout
        div.appendChild(leftAside);
        div.appendChild(rightAside);
        section.appendChild(div);
        main.appendChild(section);
        
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
