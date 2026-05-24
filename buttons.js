// buttons.js - Version avec flèche animée (haut/bas)
class GAUDVIBEButtons {
    constructor() {
        this.links = [
            { text: 'CV', url: 'CV.pdf', type: 'pdf' },
            { text: 'GitHub', url: 'https://github.com/GAUDVIBE', type: 'link', screenshot: 'screenshots/github.png' },
            { text: 'YouTube', url: 'https://youtube.com/@antoineGAUDRY', type: 'link', screenshot: 'screenshots/youtube.png' },
            { text: 'Instagram', url: 'https://www.instagram.com/antoine_gdy/', type: 'link', screenshot: 'screenshots/instagram.png' }
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
            
            /* Bandeau gauche - Desktop vertical */
            .sidebar {
                width: 200px;
                height: 100%;
                display: flex;
                flex-direction: column;
                gap: 20px;
                align-content: start;
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
                background-color: rgba(0, 0, 0, 0.8);
                color: #ffffff;
                padding: 30px;
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(15px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
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
                overflow-y: auto;
                overflow-x: hidden;
                width: 100%;
            }
            
            .preview-content iframe,
            .preview-content embed {
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
            
            /* Style des boutons du menu */
            .menu-button {
                background-color: rgba(0, 0, 0, 0.7);
                color: #ffffff;
                padding: 20px;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                cursor: pointer;
                font-family: 'Courier New', monospace;
                font-size: 1.1rem;
                font-weight: bold;
                text-align: center;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                -webkit-tap-highlight-color: transparent;
                width: 100%;
            }
            
            /* Hover avec effet de surbrillance */
            .menu-button:hover,
            .menu-button:active {
                background-color: rgba(255, 255, 255, 0.25);
                border-color: rgba(255, 255, 255, 0.6);
                box-shadow: 0 0 30px rgba(255, 255, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.5);
                transform: translateY(-2px);
            }
            
            .action-button {
                min-width: 150px;
                text-align: center;
                background-color: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #ffffff;
                font-family: 'Courier New', monospace;
                font-size: 1.1rem;
                font-weight: bold;
                padding: 15px 25px;
                transition: all 0.3s ease;
                border-radius: 8px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .action-button:hover,
            .action-button:active {
                background-color: rgba(255, 255, 255, 0.25);
                border-color: rgba(255, 255, 255, 0.6);
                box-shadow: 0 0 30px rgba(255, 255, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.5);
                transform: translateY(-2px);
            }
            
            /* Animation ripple */
            @keyframes ripple {
                to {
                    transform: scale(3);
                    opacity: 0;
                }
            }
            
            /* Responsive - Version mobile */
            @media (max-width: 1024px) {
                body {
                    overflow-y: auto;
                    overflow-x: hidden;
                }
                
                main { 
                    flex-direction: column;
                    padding: 0.5em;
                    height: auto;
                    min-height: 100vh;
                    gap: 1em;
                    align-items: center;
                }
                
                .sidebar {
                    width: 100%;
                    max-width: 180px;
                    height: auto;
                    order: 1;
                }
                
                .preview-area {
                    order: 2;
                    width: 100%;
                    max-width: 500px;
                    flex: none;
                    min-height: calc(100vh - 200px);
                }
                
                .preview-container {
                    width: 100%;
                    height: calc(100vh - 200px);
                    max-height: none;
                }
                
                .preview-content {
                    overflow: hidden !important;
                    height: 100%;
                }
                
                .preview-content iframe,
                .preview-content embed,
                .preview-content > div {
                    width: 100% !important;
                    height: 100% !important;
                    max-width: 100% !important;
                }
                
                .preview-container {
                    padding: 15px;
                }
                
                .sidebar {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    flex-direction: row;
                }
                
                .menu-button { 
                    font-size: 0.9rem; 
                    padding: 12px 16px;
                    min-height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    word-break: break-word;
                    line-height: 1.3;
                    border-radius: 8px;
                }
                
                .preview-actions {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .action-button {
                    width: 100%;
                }
            }
            
            /* Pour les écrans tactiles */
            @media (hover: none) and (pointer: coarse) {
                .menu-button:active,
                .action-button:active {
                    background-color: rgba(255, 255, 255, 0.25);
                    border-color: rgba(255, 255, 255, 0.6);
                    box-shadow: 0 0 30px rgba(255, 255, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.5);
                    transform: translateY(-2px);
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
        
        this.links.forEach(link => {
            const button = document.createElement('div');
            button.className = 'menu-button';
            button.textContent = link.text;
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.rippleEffect(e, button);
                this.showPreview(link);
            });
            
            sidebar.appendChild(button);
        });
        
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
        
        previewContainer.appendChild(previewContent);
        previewArea.appendChild(previewContainer);
        main.appendChild(previewArea);
        
        document.body.appendChild(main);
    }
    
    showPreview(link) {
        const previewContainer = document.getElementById('previewContainer');
        const previewContent = document.getElementById('previewContent');
        
        previewContent.innerHTML = '';
        
        if (link.type === 'pdf') {
            // Utiliser Google Docs Viewer pour mobile, embed pour desktop
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            const container = document.createElement('div');
            container.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
            `;
            
            if (isMobile) {
                const iframe = document.createElement('iframe');
                iframe.src = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/' + link.url)}&embedded=true&toolbar=0`;
                iframe.style.cssText = `
                    width: 100%;
                    height: 100%;
                    border: none;
                `;
                container.appendChild(iframe);
            } else {
                const embed = document.createElement('embed');
                embed.src = link.url + '#toolbar=0&navpanes=0&scrollbar=0';
                embed.type = 'application/pdf';
                embed.style.cssText = `
                    width: 100%;
                    height: 100%;
                    border: none;
                `;
                container.appendChild(embed);
            }
            
            previewContent.appendChild(container);
        } else {
            if (link.screenshot) {
                const img = document.createElement('img');
                img.src = link.screenshot;
                img.alt = `${link.text} preview`;
                img.style.cssText = `
                    width: 100%;
                    height: auto;
                    display: block;
                    background: #1a1a1a;
                    cursor: pointer;
                `;
                
                img.onclick = () => {
                    window.open(link.url, '_blank');
                };
                
                img.onerror = () => {
                    previewContent.innerHTML = `
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 20px; cursor: pointer;" onclick="window.open('${link.url}', '_blank')">
                            <div style="font-size: 3rem; color: #e7e6b3; text-shadow: 3px 3px 0 #3d3c55;">📸</div>
                            <div style="font-size: 1.3rem; color: #e7e6b3; text-align: center;">
                                Screenshot en cours de génération...<br>
                                <span style="font-size: 1rem;">Cliquez pour visiter le site</span>
                            </div>
                        </div>
                    `;
                };
                
                previewContent.appendChild(img);
            } else {
                previewContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 20px; cursor: pointer;" onclick="window.open('${link.url}', '_blank')">
                        <div style="font-size: 3rem; color: #e7e6b3; text-shadow: 3px 3px 0 #3d3c55;">🔗</div>
                        <div style="font-size: 1.3rem; color: #e7e6b3; text-align: center;">
                            Cliquez pour visiter le site
                        </div>
                    </div>
                `;
            }
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
            background-color: rgba(255, 255, 255, 0.3);
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
