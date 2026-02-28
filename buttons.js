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
            .gaudvibe-container {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                width: 90%;
                max-width: 600px;
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
                transform: translateY(0);
                transition: transform linear 150ms;
                box-shadow:
                    0 0 0 5px #383050,  /* dark grey */
                    0 0 0 10px #68d0b8, /* minty blue */
                    0 0 0 12px #f7e8a8, /* white */
                    0 0 0 15px #3d3c55; /* black */
                font-family: sans-serif;
                font-size: 1.2rem;
                backdrop-filter: blur(2px);
            }
            
            .box.full {
                width: 100%;
                display: block;
            }
            
            .grid {
                display: flex;
            }
            
            .grid.between {
                justify-content: space-between;
                align-items: center;
            }
            
            .gaudvibe-container aside:first-child {
                margin-right: 0.5em;
            }
            
            .gaudvibe-container aside:last-child {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
                justify-content: flex-end;
            }
            
            /* BUTTONS STYLE */
            .gaudvibe-container button {
                position: relative;
                cursor: pointer;
                background: transparent;
                border: 0;
                color: #e7e6b3;
                font-size: 1.2rem;
                font-family: sans-serif;
                padding: 5px 10px;
                transition: all 0.3s ease;
                text-shadow: 1px 1px 0 #3d3c55;
            }
            
            .gaudvibe-container button:hover {
                transform: translateY(-2px);
            }
            
            /* Flèche au hover pour tous les boutons */
            .gaudvibe-container button:hover::before {
                content: '';
                position: absolute;
                left: -0.5em;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 0.4rem solid transparent;
                border-bottom: 0.4rem solid transparent;
                border-left: 0.4rem solid #e7e6b3;
                filter: drop-shadow(1px 1px 0 #3d3c55);
            }
            
            /* Style spécifique pour le bouton CV */
            .gaudvibe-container button.document:hover {
                color: #68d0b8;
            }
            
            /* Style spécifique pour le bouton GitHub */
            .gaudvibe-container button.github:hover {
                color: #f7e8a8;
            }
            
            /* Style spécifique pour le bouton YouTube */
            .gaudvibe-container button.youtube:hover {
                color: #ff6b6b;
            }
            
            /* Style spécifique pour le bouton Instagram */
            .gaudvibe-container button.instagram:hover {
                color: #c13584;
            }
            
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .gaudvibe-container {
                    width: 95%;
                }
                
                .box {
                    padding: 12px 15px;
                    font-size: 1rem;
                    box-shadow:
                        0 0 0 4px #383050,
                        0 0 0 8px #68d0b8,
                        0 0 0 10px #f7e8a8,
                        0 0 0 12px #3d3c55;
                }
                
                .gaudvibe-container button {
                    font-size: 1rem;
                }
                
                .gaudvibe-container aside:last-child {
                    gap: 10px;
                }
            }
            
            @media (max-width: 480px) {
                .grid.between {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 15px;
                }
                
                .gaudvibe-container aside:last-child {
                    justify-content: flex-start;
                    width: 100%;
                }
                
                .gaudvibe-container button {
                    padding: 5px 8px;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.className = 'gaudvibe-container';
        
        // Création de la box Earthbound
        const box = document.createElement('section');
        box.className = 'box full';
        
        const grid = document.createElement('div');
        grid.className = 'grid between';
        
        // Partie gauche avec le texte
        const leftAside = document.createElement('aside');
        leftAside.textContent = 'Que voulez-vous selectionner ?';
        
        // Partie droite avec les boutons
        const rightAside = document.createElement('aside');
        
        this.links.forEach(link => {
            const button = document.createElement('button');
            button.className = link.type;
            button.textContent = link.text;
            
            // Pour le CV, on ajoute download
            if (link.type === 'document') {
                button.setAttribute('data-url', link.url);
                button.setAttribute('download', 'CV.pdf');
            } else {
                button.setAttribute('data-url', link.url);
            }
            
            // Ripple effect au clic
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
        
        grid.appendChild(leftAside);
        grid.appendChild(rightAside);
        box.appendChild(grid);
        container.appendChild(box);
        
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
