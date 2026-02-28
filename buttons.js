// buttons.js - Version optimisée
class GAUDVIBEButtons {
    constructor() {
        this.links = [
            { text: 'CV', url: 'https://raw.githubusercontent.com/GAUDVIBE/Portfolio/main/CV.pdf' },
            { text: 'GitHub', url: 'https://github.com/GAUDVIBE' },
            { text: 'YouTube', url: 'https://youtube.com/@antoineGAUDRY' },
            { text: 'Instagram', url: 'https://www.instagram.com/antoine_gdy/' }
        ];
        
        this.init();
    }
    
    init() {
        this.injectStyles();
        this.buildUI();
    }
    
    injectStyles() {
        const styles = `
            *{margin:0;padding:0;box-sizing:border-box;}
            body{font:1.2rem 'Courier New',monospace;padding:2em;background:transparent;}
            main{max-width:600px;margin:auto;display:flex;flex-direction:column;gap:30px;z-index:1000;}
            
            .box{
                background:#280828;color:#e7e6b3;padding:25px 30px;
                box-shadow:0 0 0 5px #383050,0 0 0 10px #68d0b8,0 0 0 12px #f7e8a8,0 0 0 15px #3d3c55;
                width:100%;border-radius:1px;
            }
            
            .text-container{text-align:center;}
            .text-container .main-text{font-size:1.4rem;font-weight:bold;text-shadow:2px 2px 0 #3d3c55;}
            
            .buttons-container .box{padding:30px 35px;}
            .button-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:25px;justify-items:center;min-width:300px;}
            
            .box button{
                position:relative;cursor:pointer;background:#280828;border:0;color:#e7e6b3;
                font:bold 1.4rem 'Courier New',monospace;padding:12px 25px;min-width:120px;
                text-shadow:2px 2px 0 #3d3c55;transition:all 0.3s ease;border-radius:1px;
            }
            
            /* Hover: transparent comme le fond */
            .box button:hover{
                background:#280828;color:#280828;text-shadow:none;transform:translateY(-2px);
            }
            
            /* Flèche reste visible */
            .box button:hover::before{
                content:'';position:absolute;left:-0.8em;top:50%;transform:translateY(-50%);
                border-top:0.6rem solid transparent;border-bottom:0.6rem solid transparent;
                border-left:0.6rem solid #e7e6b3;filter:drop-shadow(2px 2px 0 #3d3c55);
            }
            
            @keyframes ripple{to{transform:scale(4);opacity:0;}}
            
            @media(max-width:768px){
                body{padding:1em;font-size:1rem;}
                .box{padding:20px 25px;box-shadow:0 0 0 4px #383050,0 0 0 8px #68d0b8,0 0 0 10px #f7e8a8,0 0 0 12px #3d3c55;}
                .buttons-container .box{padding:25px 30px;}
                .button-grid{gap:20px;min-width:250px;}
                .box button{font-size:1.2rem;padding:10px 20px;min-width:100px;}
                .text-container .main-text{font-size:1.2rem;}
                .box button:hover::before{left:-0.6em;border-width:0.5rem;}
            }
            
            @media(max-width:600px){.button-grid{grid-template-columns:1fr;gap:15px;min-width:auto;width:100%;}}
        `;
        
        document.head.appendChild(Object.assign(document.createElement('style'), {textContent: styles}));
    }
    
    buildUI() {
        const main = document.body.appendChild(document.createElement('main'));
        
        // Container texte
        const textBox = document.createElement('section');
        textBox.className = 'box';
        textBox.innerHTML = '<div class="main-text">Que voulez-vous sélectionner ?</div>';
        main.appendChild(Object.assign(document.createElement('div'), {className: 'text-container'})).appendChild(textBox);
        
        // Container boutons
        const buttonGrid = document.createElement('div');
        buttonGrid.className = 'button-grid';
        
        this.links.forEach(link => {
            const btn = document.createElement('button');
            btn.textContent = link.text;
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.rippleEffect(e, btn);
                setTimeout(() => window.open(link.url, '_blank'), 300);
            });
            
            buttonGrid.appendChild(btn);
        });
        
        const buttonsBox = document.createElement('section');
        buttonsBox.className = 'box';
        buttonsBox.appendChild(buttonGrid);
        
        main.appendChild(Object.assign(document.createElement('div'), {className: 'buttons-container'})).appendChild(buttonsBox);
    }
    
    rippleEffect(event, btn) {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = Object.assign(document.createElement('span'), {
            style: `
                width:${size}px;height:${size}px;left:${event.clientX-rect.left-size/2}px;
                top:${event.clientY-rect.top-size/2}px;position:absolute;border-radius:50%;
                background:rgba(231,230,179,0.3);transform:scale(0);animation:ripple 0.6s ease-out;
                pointer-events:none;z-index:1001;
            `
        });
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

// Initialisation unique
document.readyState === 'loading' 
    ? document.addEventListener('DOMContentLoaded', () => new GAUDVIBEButtons())
    : new GAUDVIBEButtons();
