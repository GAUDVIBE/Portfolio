// buttons.js
class GAUDVIBEButtons {
    constructor() {
        this.buttons = [
            { text: 'CV', url: 'https://raw.githubusercontent.com/GAUDVIBE/Portfolio/main/CV.pdf', type: 'document' },
            { text: 'GitHub', url: 'https://github.com/GAUDVIBE', type: 'github' },
            { text: 'YouTube', url: 'https://youtube.com/@antoineGAUDRY', type: 'youtube' },
            { text: 'Instagram', url: 'https://www.instagram.com/antoine_gdy/', type: 'instagram' }
        ];
        
        this.selectedIndex = 0; // Premier bouton sélectionné par défaut
        this.init();
    }
    
    init() {
        this.createStyles();
        this.createButtons();
        this.addKeyboardNavigation();
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
            
            /* Style pour le bouton sélectionné */
            .gaudvibe-button.selected {
                transform: translateY(-0.2em);
                box-shadow:
                    0 0 0 5px #383050,
                    0 0 0 10px #4a6b8a,
                    0 0 0 12px #f7e8a8,
                    0 0 0 15px #3d3c55;
            }
            
            /* Style au survol (non sélectionné) */
            .gaudvibe-button:not(.selected):hover {
                transform: translateY(-0.1em);
                box-shadow:
                    0 0 0 5px #383050,
                    0 0 0 10px #2c3e50,
                    0 0 0 12px #f7e8a8,
                    0 0 0 15px #3d3c55;
            }
            
            .gaudvibe-button .text {
                text-shadow: 2px 2px 0 #3d3c55;
                font-weight: bold;
                display: inline-block;
            }
            
            /* Flèche pour le bouton sélectionné */
            .gaudvibe-button.selected::before {
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
                z-index: 1001;
            }
            
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            
            @media (max-width: 768px) {
                .gaudvibe-buttons-container {
                    gap: 20px;
                }
                .gaudvibe-button {
                    padding: 10px 20px;
                    font-size: 1rem;
                }
                .gaudvibe-button.selected::before {
                    left: -0.6em;
                    border-top: 0.4rem solid transparent;
                    border-bottom: 0.4rem solid transparent;
                    border-left: 0.4rem solid #e7e6b3;
                }
            }
            
            @media (max-width: 480px) {
                .gaudvibe-buttons-container {
                    flex-direction: column;
                    width: 80%;
                }
                .gaudvibe-button {
                    width: 100%;
                }
                .gaudvibe-button.selected::before {
                    left: -0.5em;
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
            
            // Marquer le premier bouton comme sélectionné
            if (index === this.selectedIndex) {
                btn.classList.add('selected');
            }
            
            // Pour le CV, on ajoute download
            if (button.type === 'document') {
                btn.setAttribute('download', 'CV.pdf');
            }
            
            // Clic pour sélectionner le bouton
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Retirer la classe selected de tous les boutons
                document.querySelectorAll('.gaudvibe-button').forEach(b => {
                    b.classList.remove('selected');
                });
                
                // Ajouter la classe selected au bouton cliqué
                btn.classList.add('selected');
                this.selectedIndex = index;
                
                // Effet ripple
                this.createRipple(e, btn);
                
                // Ouvrir le lien après un petit délai
                setTimeout(() => {
                    if (button.type === 'document') {
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
    
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Flèches gauche et droite pour naviguer
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex - 1 + this.buttons.length) % this.buttons.length;
                this.updateSelectedButton();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex + 1) % this.buttons.length;
                this.updateSelectedButton();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                this.openSelectedButton();
            }
        });
    }
    
    updateSelectedButton() {
        const buttons = document.querySelectorAll('.gaudvibe-button');
        buttons.forEach((btn, index) => {
            if (index === this.selectedIndex) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
    }
    
    openSelectedButton() {
        const buttons = document.querySelectorAll('.gaudvibe-button');
        const selectedButton = buttons[this.selectedIndex];
        
        if (selectedButton) {
            const button = this.buttons[this.selectedIndex];
            
            if (button.type === 'document') {
                window.open(selectedButton.href, '_blank');
            } else {
                window.open(selectedButton.href, selectedButton.target);
            }
        }
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
