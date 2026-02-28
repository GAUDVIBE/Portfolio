// buttons.js
class GAUDVIBEButtons {
    constructor() {
        this.buttons = [
            { text: 'CV', icon: '📄', url: '/CV.pdf', type: 'document' },
            { text: 'GitHub', icon: '🐙', url: 'https://github.com/GAUDVIBE', type: 'github' },
            { text: 'YouTube', icon: '🎥', url: 'https://youtube.com/@antoineGAUDRY', type: 'youtube' },
            { text: 'Instagram', icon: '📷', url: 'https://www.instagram.com/antoine_gdy/', type: 'instagram' }
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
                z-index: 1000;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                max-width: 90vw;
                padding: 20px;
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
                transition: all 0.3s ease;
                text-decoration: none;
                color: white;
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                letter-spacing: 1px;
            }
            
            .gaudvibe-button:hover {
                transform: translateY(-5px) scale(1.05);
                box-shadow: 0 8px 25px rgba(0,0,0,0.5);
                border-color: transparent;
                background: rgba(255, 255, 255, 0.1) !important;
                color: white;
            }
            
            .gaudvibe-button .icon {
                font-size: 22px;
                transition: transform 0.3s ease;
            }
            
            .gaudvibe-button:hover .icon {
                transform: scale(1.1);
            }
            
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            
            @media (max-width: 768px) {
                .gaudvibe-button { padding: 12px 24px; font-size: 16px; }
                .gaudvibe-button .icon { font-size: 20px; }
            }
            
            @media (max-width: 480px) {
                .gaudvibe-buttons-container { flex-direction: column; width: 80%; }
                .gaudvibe-button { width: 100%; justify-content: center; }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    createButtons() {
        const container = document.createElement('div');
        container.className = 'gaudvibe-buttons-container';
        
        this.buttons.forEach(button => {
            const btn = document.createElement('a');
            btn.href = button.url;
            btn.className = `gaudvibe-button ${button.type}`;
            btn.target = button.url.startsWith('http') ? '_blank' : '_self';
            btn.rel = button.url.startsWith('http') ? 'noopener noreferrer' : '';
            btn.innerHTML = `<span class="icon">${button.icon}</span><span class="text">${button.text}</span>`;
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.createRipple(e, btn);
                setTimeout(() => window.open(btn.href, btn.target), 300);
            });
            
            container.appendChild(btn);
        });
        
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
            background-color: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

// Initialisation immédiate
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new GAUDVIBEButtons());
} else {
    new GAUDVIBEButtons();
}
