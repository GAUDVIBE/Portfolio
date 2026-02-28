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
                padding: 15px 20px;
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
            
            /* Style des boutons dans la box */
            .box button {
                position: relative;
                cursor: pointer;
                background: transparent;
                border: 0;
                color: #e7e6b3;
                font-size: 1.2rem;
                font-family: sans-serif;
                padding: 5px 10px;
                margin: 0 5px;
                transition: all 0.3s ease;
            }
            
            .box button:hover {
                transform: translateY(-2px);
            }
            
            /* Flèche au hover (style Earthbound) */
            .box .grid.between button:hover::before {
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
            
            /* Espacement entre les boutons */
            .box .grid.between button:first-child {
                margin-right: 1em;
            }
            
            /* Style pour le texte à gauche */
            .box aside:first-child {
                color: #e7e6b3;
                text-shadow: 1px 1px 0 #3d3c55;
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
                    padding: 12px 15px;
                    box-shadow:
                        0 0 0 4px #383050,
                        0 0 0 8px #68d0b8,
                        0 0 0 10px #f7e8a8,
                        0 0 0 12px #3d3c55;
                }
                
                .box button {
                    font-size: 1rem;
                }
            }
            
            @media (max-width: 480px) {
                .grid.between {
                    flex-direction: column;
                    gap: 15px;
                }
                
                .box button {
                    margin: 0 3px;
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
        leftAside.textContent = 'Que voulez-vous sélectionner ?';
        
        // Partie droite : les boutons
        const rightAside = document.createElement('aside');
        
        // Ajouter chaque lien comme un bouton
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
            
            rightAside.appendChild(button);
        });
        
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
