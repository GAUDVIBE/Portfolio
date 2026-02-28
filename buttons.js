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
        this.startColorSampling();
    }
    
    createStyles() {
        const styles = `
            .gaudvibe-buttons-container {
                position: fixed;
                bottom: 30px;
                right: 30px;
                display: flex;
                gap: 15px;
                z-index: 1000;
                flex-wrap: wrap;
                justify-content: flex-end;
                max-width: 90vw;
            }
            
            .gaudvibe-button {
                position: relative;
                padding: 12px 24px;
                border: none;
                border-radius: 50px;
                font-family: 'Arial', sans-serif;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                text-decoration: none;
                color: white;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255,255,255,0.2);
            }
            
            .gaudvibe-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: inherit;
                filter: blur(10px);
                opacity: 0.7;
                z-index: -1;
            }
            
            .gaudvibe-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.4);
            }
            
            .gaudvibe-button:active {
                transform: translateY(-1px);
            }
            
            .gaudvibe-button .icon {
                font-size: 20px;
                filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
            }
            
            .gaudvibe-button .text {
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            
            /* Mobile responsive */
            @media (max-width: 768px) {
                .gaudvibe-buttons-container {
                    bottom: 20px;
                    right: 20px;
                    gap: 10px;
                }
                
                .gaudvibe-button {
                    padding: 10px 18px;
                    font-size: 14px;
                }
                
                .gaudvibe-button .icon {
                    font-size: 18px;
                }
            }
            
            @media (max-width: 480px) {
                .gaudvibe-buttons-container {
                    flex-direction: column;
                    align-items: flex-end;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    createButtons() {
        // Create container
        const container = document.createElement('div');
        container.className = 'gaudvibe-buttons-container';
        container.id = 'gaudvibe-buttons';
        
        // Create each button
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
            
            // Add click effect
            btn.addEventListener('click', (e) => {
                this.createRipple(e, btn);
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
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
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
    
    startColorSampling() {
        // Get the canvas from shader
        const canvas = document.getElementById('shaderCanvas');
        if (!canvas) return;
        
        // Sample colors periodically
        const sampleColors = () => {
            const gl = canvas.getContext('webgl');
            if (!gl) return;
            
            const buttons = document.querySelectorAll('.gaudvibe-button');
            const width = canvas.width;
            const height = canvas.height;
            
            // Sample 4 different positions for variety
            const positions = [
                {x: width * 0.3, y: height * 0.3},
                {x: width * 0.7, y: height * 0.3},
                {x: width * 0.3, y: height * 0.7},
                {x: width * 0.7, y: height * 0.7}
            ];
            
            // Read pixels from WebGL canvas
            const pixels = new Uint8Array(4);
            
            positions.forEach((pos, index) => {
                if (index < buttons.length) {
                    gl.readPixels(pos.x, pos.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                    
                    const r = pixels[0];
                    const g = pixels[1];
                    const b = pixels[2];
                    
                    // Create gradient background
                    const button = buttons[index];
                    if (button) {
                        // Create a gradient based on the sampled color
                        const color1 = `rgb(${r}, ${g}, ${b})`;
                        const color2 = `rgb(${Math.min(r + 30, 255)}, ${Math.min(g + 30, 255)}, ${Math.min(b + 30, 255)})`;
                        
                        button.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
                        
                        // Add subtle animation based on color brightness
                        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                        if (brightness < 128) {
                            button.style.textShadow = '0 2px 4px rgba(255,255,255,0.5)';
                        } else {
                            button.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
                        }
                    }
                }
            });
            
            requestAnimationFrame(sampleColors);
        };
        
        // Start sampling when WebGL is ready
        setTimeout(() => {
            sampleColors();
        }, 1000);
    }
    
    // Alternative method using CSS variables from shader (if available)
    useShaderColors() {
        // This method creates a hidden div to sample shader colors via CSS
        const sampler = document.createElement('div');
        sampler.style.width = '1px';
        sampler.style.height = '1px';
        sampler.style.position = 'fixed';
        sampler.style.left = '-9999px';
        sampler.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        document.body.appendChild(sampler);
        
        const buttons = document.querySelectorAll('.gaudvibe-button');
        buttons.forEach((button, index) => {
            const hue = (index * 90) % 360;
            button.style.background = `linear-gradient(135deg, 
                hsl(${hue}, 80%, 60%), 
                hsl(${hue + 30}, 80%, 50%))`;
        });
    }
}

// Initialize buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for shader to initialize
    setTimeout(() => {
        new GAUDVIBEButtons();
    }, 500);
});
