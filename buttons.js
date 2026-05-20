// buttons.js - Version avec flèche animée (haut/bas)
class GAUDVIBEButtons {
    constructor() {
        this.links = [
            { text: 'CV', url: 'https://raw.githubusercontent.com/GAUDVIBE/Portfolio/main/CV.pdf', type: 'pdf' },
            { text: 'GitHub', url: 'https://github.com/GAUDVIBE', type: 'link' },
            { text: 'YouTube', url: 'https://youtube.com/@antoineGAUDRY', type: 'link' },
            { text: 'Instagram', url: 'https://www.instagram.com/antoine_gdy/', type: 'link' }
        ];
        
        this.currentPreview = null;
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
                background: transparent; 
                margin: 0;
                min-height: 100vh;
                overflow: hidden;
            }
            
            main { 
                width: 100%;
                height: 100vh;
                display: flex;
                z-index: 1000;
                position: relative;
                padding: 2em;
                gap: 2em;
            }
            
            /* Bandeau gauche */
            .sidebar {
                width: 350px;
                height: 100%;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            /* Zone de prévisualisation centrale */
            .preview-area {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            
            .preview-container {
                background-color: #280828;
                color: #e7e6b3;
                padding: 30px;
                border-radius: 1px;
                box-shadow: 
                    0 0 0 5px #383050,
                    0 0 0 10px #68d0b8,
                    0 0 0 12px #f7e8a8,
                    0 0 0 15px #3d3c55;
                width: 90%;
                height: 80%;
                display: none;
                flex-direction: column;
                gap: 20px;
            }
            
            .preview-container.active {
                display: flex;
            }
            
            .preview-content {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            
            .preview-content iframe {
                width: 100%;
                height: 100%;
                border: none;
                background: white;
            }
            
            .preview-actions {
                display: flex;
                gap: 20px;
                justify-content: center;
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
            
            .text-container .main-text { 
                font-size: 1.4rem; 
                font-weight: bold; 
                text-align: left;
                text-shadow: 2px 2px 0 #3d3c55; 
                font-family: 'Courier New', monospace;
                color: #e7e6b3;
                padding-left: 10px;
            }
            
            .button-grid {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            /* Style des boutons */
            .box button {
                position: relative;
                cursor: pointer;
                background-color: #280828;
                border: none;
                color: #e7e6b3;
                font-family: 'Courier New', monospace;
                font-size: 1.3rem;
                font-weight: bold;
                padding: 15px 25px;
                text-align: left;
                text-shadow: 2px 2px 0 #3d3c55;
                transition: all 0.3s ease;
                border-radius: 1px;
                width: 100%;
                -webkit-tap-highlight-color: transparent;
            }
            
            .action-button {
                min-width: 150px;
                text-align: center;
            }
            
            /* Hover et Active (pour mobile) */
            .box button:hover,
            .box button:active {
                background-color: transparent;
                color: #e7e6b3;
                text-shadow: 2px 2px 0 #3d3c55;
                transform: translateY(-2px);
            }
            
            /* Flèche au hover et au clic (pour mobile) - avec animation */
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
                animation: floatArrow 0.8s infinite ease-in-out;  /* Animation ajoutée */
            }
            
            /* Animation de la flèche (haut et bas) */
            @keyframes floatArrow {
                0% {
                    transform: translateY(-50%);
                }
                50% {
                    transform: translateY(calc(-50% - 5px));  /* Monte de 5px */
                }
                100% {
                    transform: translateY(-50%);
                }
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
                main { 
                    flex-direction: column;
                    padding: 1em;
                }
                
                .sidebar {
                    width: 100%;
                    height: auto;
                }
                
                .preview-container {
                    width: 100%;
                    height: 60vh;
                }
                
                .box { 
                    padding: 20px 25px; 
                    box-shadow: 
                        0 0 0 4px #383050,
                        0 0 0 8px #68d0b8,
                        0 0 0 10px #f7e8a8,
                        0 0 0 12px #3d3c55;
                }
                
                .button-grid { 
                    gap: 12px;
                }
                
                .box button { 
                    font-size: 1.1rem; 
                    padding: 12px 15px;
                }
                
                .text-container .main-text { 
                    font-size: 1.2rem; 
                    padding-left: 5px;
                }
                
                .preview-actions {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .action-button {
                    width: 100%;
                }
                
                /* Ajustement flèche pour mobile avec animation */
                .box button:hover::before,
                .box button:active::before { 
                    left: -0.6em; 
                    border-top: 0.5rem solid transparent;
                    border-bottom: 0.5rem solid transparent;
                    border-left: 0.5rem solid #e7e6b3;
                }
                
                @keyframes floatArrow {
                    0% { transform: translateY(-50%); }
                    50% { transform: translateY(calc(-50% - 3px)); }  /* 3px sur mobile */
                    100% { transform: translateY(-50%); }
                }
            }
            
            @media (max-width: 600px) {
                .box button { 
                    padding: 12px 20px;
                }
                
                /* Flèche pour très petits écrans avec animation */
                .box button:hover::before,
                .box button:active::before { 
                    left: -0.5em; 
                    border-top: 0.4rem solid transparent;
                    border-bottom: 0.4rem solid transparent;
                    border-left: 0.4rem solid #e7e6b3;
                }
            }
            
            /* Pour les écrans tactiles */
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
                    animation: floatArrow 0.8s infinite ease-in-out;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    buildUI() {
        const main = document.createElement('main');
        
        // === BANDEAU GAUCHE ===
        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        
        // Container texte
        const textBox = document.createElement('section');
        textBox.className = 'box';
        const textDiv = document.createElement('div');
        textDiv.className = 'main-text';
        textDiv.textContent = '• Que voulez-vous faire ?';
        textBox.appendChild(textDiv);
        sidebar.appendChild(textBox);
        
        // Container boutons
        const buttonsBox = document.createElement('section');
        buttonsBox.className = 'box';
        const buttonGrid = document.createElement('div');
        buttonGrid.className = 'button-grid';
        
        this.links.forEach(link => {
            const button = document.createElement('button');
            button.textContent = link.text;
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.rippleEffect(e, button);
                this.showPreview(link);
            });
            
            buttonGrid.appendChild(button);
        });
        
        buttonsBox.appendChild(buttonGrid);
        sidebar.appendChild(buttonsBox);
        main.appendChild(sidebar);
        
        // === ZONE DE PRÉVISUALISATION ===
        const previewArea = document.createElement('div');
        previewArea.className = 'preview-area';
        
        const previewContainer = document.createElement('div');
        previewContainer.className = 'preview-container';
        previewContainer.id = 'previewContainer';
        
        const previewContent = document.createElement('div');
        previewContent.className = 'preview-content';
        previewContent.id = 'previewContent';
        
        const previewActions = document.createElement('div');
        previewActions.className = 'preview-actions';
        
        const accessButton = document.createElement('button');
        accessButton.className = 'box button action-button';
        accessButton.id = 'accessButton';
        accessButton.textContent = 'Accéder';
        accessButton.style.cssText = 'padding: 15px 30px; font-size: 1.2rem;';
        
        const downloadButton = document.createElement('button');
        downloadButton.className = 'box button action-button';
        downloadButton.id = 'downloadButton';
        downloadButton.textContent = 'Télécharger';
        downloadButton.style.cssText = 'padding: 15px 30px; font-size: 1.2rem; display: none;';
        
        previewActions.appendChild(accessButton);
        previewActions.appendChild(downloadButton);
        
        previewContainer.appendChild(previewContent);
        previewContainer.appendChild(previewActions);
        previewArea.appendChild(previewContainer);
        main.appendChild(previewArea);
        
        document.body.appendChild(main);
    }
    
    showPreview(link) {
        const previewContainer = document.getElementById('previewContainer');
        const previewContent = document.getElementById('previewContent');
        const accessButton = document.getElementById('accessButton');
        const downloadButton = document.getElementById('downloadButton');
        
        previewContent.innerHTML = '';
        
        if (link.type === 'pdf') {
            const iframe = document.createElement('iframe');
            iframe.src = link.url;
            iframe.style.cssText = `
                width: 100%;
                height: 100%;
                border: none;
                background: white;
            `;
            previewContent.appendChild(iframe);
            
            accessButton.style.display = 'none';
            downloadButton.style.display = 'block';
            
            downloadButton.onclick = () => {
                window.open(link.url, '_blank');
            };
        } else {
            const iframe = document.createElement('iframe');
            iframe.src = link.url;
            iframe.style.cssText = `
                width: 100%;
                height: 100%;
                border: none;
                background: white;
            `;
            
            iframe.onerror = () => {
                previewContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 20px;">
                        <div style="font-size: 3rem; color: #e7e6b3; text-shadow: 3px 3px 0 #3d3c55;">⚠️</div>
                        <div style="font-size: 1.3rem; color: #e7e6b3; text-align: center;">
                            Prévisualisation non disponible<br>
                            <span style="font-size: 1rem;">Cliquez sur "Accéder" pour ouvrir le site</span>
                        </div>
                    </div>
                `;
            };
            
            previewContent.appendChild(iframe);
            
            accessButton.style.display = 'block';
            downloadButton.style.display = 'none';
            
            accessButton.onclick = () => {
                window.open(link.url, '_blank');
            };
        }
        
        previewContainer.classList.add('active');
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
