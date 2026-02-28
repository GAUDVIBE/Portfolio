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
            }
            
            .gaudvibe-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: inherit;
                opacity: 0;
                transition: opacity 0.4s ease;
                z-index: -1;
            }
            
            .gaudvibe-button:hover {
                transform: translateY(-5px) scale(1.05);
                box-shadow: 0 8px 25px rgba(0,0,0,0.5);
                border-color: transparent;
                color: #000;
            }
            
            .gaudvibe-button .icon {
                font-size: 22px;
                transition: transform 0.3s ease;
            }
            
            .gaudvibe-button:hover .icon {
                transform: scale(1.1);
            }
            
            .gaudvibe-button .text {
                text-shadow: none;
                transition: text-shadow 0.3s ease;
            }
            
            /* Mobile responsive */
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
            
            // Add hover effect to sample shader color
            btn.addEventListener('mouseenter', (e) => {
                this.sampleShaderColorForButton(btn);
            });
            
            // Reset to black on mouse leave
            btn.addEventListener('mouseleave', (e) => {
                btn.style.background = 'rgba(0, 0, 0, 0.8)';
                btn.style.color = 'white';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            });
            
            // Add click effect
            btn.addEventListener('click', (e) => {
                this.createRipple(e, btn);
            });
            
            container.appendChild(btn);
        });
        
        document.body.appendChild(container);
    }
    
    sampleShaderColorForButton(button) {
        const canvas = document.getElementById('shaderCanvas');
        if (!canvas) return;
        
        const gl = canvas.getContext('webgl');
        if (!gl) return;
        
        // Sample a random position from the shader
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        
        const pixels = new Uint8Array(4);
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        
        const r = pixels[0];
        const g = pixels[1];
        const b = pixels[2];
        
        // Apply the sampled color to the button
        button.style.background = `rgba(${r}, ${g}, ${b}, 0.95)`;
        button.style.color = this.getContrastColor(r, g, b);
        button.style.borderColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
    }
    
    getContrastColor(r, g, b) {
        // Calculate luminance to determine text color (black or white)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#ffffff';
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

// Initialize buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for shader to initialize
    setTimeout(() => {
        new GAUDVIBEButtons();
    }, 1000);
});
