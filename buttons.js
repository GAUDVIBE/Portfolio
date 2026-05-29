// buttons.js - Version avec flèche animée (haut/bas)
const ICONS = {
    muzikaloid: `<svg viewBox="0 0 316 315" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#17407C" d="M21.9004 222.81L46.4127 48.3964H125.261L132.767 109.745C133.141 111.943 133.569 115.576 134.051 120.646C134.703 125.717 135.297 131.209 135.831 137.124C136.535 143.04 137.129 148.532 137.611 153.602H139.659C141.035 149.884 142.676 145.49 144.584 140.42C146.685 135.181 148.799 129.857 150.924 124.449C153.05 119.041 154.933 114.14 156.575 109.745L181.325 48.3964H257.357L232.844 222.81H178.828L187.664 159.94C188.614 153.18 189.588 146.251 190.586 139.152C191.778 131.885 192.825 125.04 193.728 118.618C194.801 112.196 195.634 106.872 196.228 102.647H194.18C193.193 106.027 191.867 109.999 190.202 114.562C188.707 119.125 187.127 123.688 185.462 128.252C183.82 132.646 182.25 136.533 180.751 139.913L146.316 222.81H104.076L92.6869 139.913C92.3086 136.533 91.8309 132.646 91.2538 128.252C90.8711 123.688 90.5738 119.125 90.3617 114.562C90.1497 109.999 89.928 106.112 89.6966 102.901H87.6486C87.2255 107.126 86.648 112.45 85.9161 118.872C85.1841 125.294 84.3194 132.054 83.3218 139.152C82.4949 146.251 81.6064 153.18 80.6563 159.94L71.8204 222.81H21.9004Z"/><path fill="#9A19E8" d="M37.433 238.964L61.9453 64.5502H140.793L148.299 125.899C148.673 128.096 149.101 131.73 149.583 136.8C150.236 141.87 150.829 147.363 151.363 153.278C152.068 159.193 152.661 164.686 153.144 169.756H155.192C156.567 166.038 158.209 161.644 160.116 156.574C162.218 151.335 164.331 146.011 166.457 140.603C168.582 135.195 170.466 130.293 172.107 125.899L196.857 64.5502H272.889L248.377 238.964H194.361L203.197 176.094C204.147 169.334 205.121 162.405 206.118 155.306C207.31 148.039 208.358 141.194 209.26 134.772C210.333 128.35 211.167 123.026 211.761 118.801H209.713C208.726 122.181 207.4 126.153 205.734 130.716C204.24 135.279 202.66 139.842 200.994 144.405C199.353 148.8 197.782 152.687 196.283 156.067L161.849 238.964H119.609L108.219 156.067C107.841 152.687 107.363 148.8 106.786 144.405C106.404 139.842 106.106 135.279 105.894 130.716C105.682 126.153 105.461 122.266 105.229 119.055H103.181C102.758 123.28 102.18 128.603 101.449 135.026C100.717 141.448 99.8519 148.208 98.8543 155.306C98.0274 162.405 97.1389 169.334 96.1888 176.094L87.353 238.964H37.433Z"/><path fill="#ED0180" d="M52.9653 255.118L77.4776 80.7041H156.326L163.832 142.053C164.205 144.25 164.633 147.884 165.116 152.954C165.768 158.024 166.362 163.517 166.896 169.432C167.6 175.347 168.194 180.84 168.676 185.91H170.724C172.1 182.192 173.741 177.798 175.649 172.728C177.75 167.489 179.864 162.165 181.989 156.757C184.115 151.348 185.998 146.447 187.64 142.053L212.39 80.7041H288.422L263.909 255.118H209.893L218.729 192.248C219.679 185.488 220.653 178.558 221.651 171.46C222.843 164.193 223.89 157.348 224.793 150.926C225.866 144.504 226.699 139.18 227.293 134.955H225.245C224.258 138.335 222.932 142.307 221.267 146.87C219.772 151.433 218.192 155.996 216.527 160.559C214.885 164.953 213.315 168.841 211.816 172.221L177.381 255.118H135.141L123.752 172.221C123.373 168.841 122.896 164.953 122.319 160.559C121.936 155.996 121.639 151.433 121.427 146.87C121.215 142.307 120.993 138.42 120.762 135.208H118.714C118.29 139.434 117.713 144.757 116.981 151.179C116.249 157.602 115.384 164.362 114.387 171.46C113.56 178.558 112.671 185.488 111.721 192.248L102.885 255.118H52.9653Z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>`
};

class GAUDVIBEButtons {
    constructor() {
        this.links = [
            { text: 'CV', url: 'CV.pdf', type: 'pdf', image: 'screenshots/cv.png' },
            { label: 'Muzikaloid', url: 'https://muzikaloid.com', type: 'link', screenshot: 'screenshots/muzikaloid.png', icon: ICONS.muzikaloid },
            { label: 'GitHub', url: 'https://github.com/GAUDVIBE', type: 'link', screenshot: 'screenshots/github.png', icon: ICONS.github, iconColor: '#ffffff' },
            { label: 'YouTube', url: 'https://youtube.com/@antoineGAUDRY', type: 'link', screenshot: 'screenshots/youtube.png', icon: ICONS.youtube, iconColor: '#FF0000' },
            { label: 'Instagram', url: 'https://www.instagram.com/antoine_gdy/', type: 'link', screenshot: 'screenshots/instagram.png', icon: ICONS.instagram, iconColor: '#E4405F' }
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

            .menu-button.icon-only {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 14px 16px;
            }
            .menu-button svg {
                width: 36px;
                height: 36px;
                display: block;
                transition: transform 0.3s ease;
            }
            .menu-button.icon-only:hover svg,
            .menu-button.icon-only:active svg {
                transform: scale(1.08);
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
                    justify-content: center;
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
                .menu-button.icon-only {
                    padding: 10px 12px;
                }
                .menu-button svg {
                    width: 30px;
                    height: 30px;
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

            if (link.icon) {
                button.classList.add('icon-only');
                button.innerHTML = link.icon;
                if (link.iconColor) button.style.color = link.iconColor;
                button.setAttribute('aria-label', link.label);
                button.setAttribute('role', 'button');
            } else {
                button.textContent = link.text;
            }

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
            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                width: 100%;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                -webkit-overflow-scrolling: touch;
                background: white;
                cursor: pointer;
            `;

            const img = document.createElement('img');
            img.src = link.image || link.url;
            img.alt = link.text;
            img.style.cssText = 'width: 100%; height: auto; display: block;';
            img.addEventListener('click', () => window.open(link.url, '_blank'));

            wrapper.appendChild(img);
            previewContent.appendChild(wrapper);
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
