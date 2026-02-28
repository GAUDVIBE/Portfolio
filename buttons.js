// buttons.js
class GAUDVIBEButtons {
    constructor() {
        this.buttons = [
            {
                text: 'CV',
                icon: '📄',
                url: '/CV.pdf',
                type: 'document'
            },
            {
                text: 'GitHub',
                icon: '🐙',
                url: 'https://github.com/GAUDVIBE',
                type: 'github'
            },
            {
                text: 'YouTube',
                icon: '🎥',
                url: 'https://youtube.com/@antoineGAUDRY',
                type: 'youtube'
            },
            {
                text: 'Instagram',
                icon: '📷',
                url: 'https://www.instagram.com/antoine_gdy/',
                type: 'instagram'
            }
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
                z-index: 1000; /* Boutons au-dessus du canvas */
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                max-width: 90vw;
                padding: 20px;
                pointer-events: none; /* Permet de cliquer à travers le conteneur */
            }
            
            .gaudvibe-button {
                position: relative;
                padding: 15px 30px;
                border: 2px solid rgba(255, 255, 255, 0.8);
                border-radius: 50px;
                font-family: 'Arial', sans-serif;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                overflow: hidden;
                transition: all 0.4s ease;
                text-decoration: none;
                color: white;
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                letter-spacing: 1px;
                pointer-events: auto; /* Les boutons restent cliquables */
            }
            
            .gaudvibe-button:hover {
                transform: translateY(-5px) scale(1.05);
                box-shadow: 0 8px 25px rgba(0,0,0,0.5);
                border-color: transparent;
            }
            
            .gaudvibe-button .icon {
                font-size: 22px;
                transition: transform 0.3s ease;
            }
            
            .gaudvibe-button:hover .icon {
                transform: scale(1.1);
            }
            
            /* Couleurs spécifiques par type (au cas où le shader n'est pas disponible) */
            .gaudvibe-button.document:hover {
                background: rgba(59, 130, 246, 0.95) !important; /* Bleu */
            }
            
            .gaudvibe-button.github:hover {
                background: rgba(36, 41, 46, 0.95) !important; /* Gris GitHub */
            }
            
            .gaudvibe-button.youtube:hover {
                background: rgba(255, 0, 0, 0.95) !important; /* Rouge YouTube */
            }
            
            .gaudvibe-button.instagram:hover {
                background: linear-gradient(45deg, #f09433, #d62976, #962fbf) !important; /* Dégradé Instagram */
            }
            
            @media (max-width: 768px) {
                .gaudvibe-buttons-container {
                    gap: 15px;
                }
                
                .gaudvibe-button {
                    padding: 12px 24px;
                    font-size: 16px;
                }
                
                .gaudvibe-button .icon {
                    font-size: 20px;
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
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        // Ajouter l'animation ripple
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    createButtons() {
        const container = document.createElement('div');
        container.className = 'gaudvibe-buttons-container';
        container.id = 'gaudvibe-buttons';
        
        this.buttons.forEach(button => {
            const btn = document.createElement('a');
            btn.href = button.url;
            btn.className = `gaudvibe-button ${button.type}`;
            btn.target = button.url.startsWith('http') ? '_blank' : '_self';
            btn.rel = button.url.startsWith('http') ? 'noopener noreferrer' : '';
            
            btn.innerHTML = `
                <span class="icon">${button.icon}</span>
                <span class="text">${button.text}</span>
            `;
            
            // Ajouter l'effet de ripple au clic
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Empêcher la navigation immédiate
                this.createRipple(e, btn);
                
                // Naviguer après l'animation
                setTimeout(() => {
                    window.open(btn.href, btn.target);
                }, 300);
            });
            
            container.appendChild(btn);
        });
        
        document.body.appendChild(container);
        
        // S'assurer que le canvas est en arrière-plan
        const canvas = document.getElementById('shaderCanvas');
        if (canvas) {
            canvas.style.zIndex = '1';
        }
    }
    
    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Initialiser les boutons quand le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            new GAUDVIBEButtons();
        }, 1000);
    });
} else {
    setTimeout(() => {
        new GAUDVIBEButtons();
    }, 1000);
}
