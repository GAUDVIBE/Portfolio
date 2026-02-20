// Create and inject styles
const styles = `
:root {
    --primary-color: #ff3366;
    --secondary-color: #6c5ce7;
    --background-color: #0a0a0a;
    --text-color: #ffffff;
    --text-secondary: #b0b0b0;
    --card-bg: rgba(255, 255, 255, 0.05);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Space Grotesk', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
}

/* Loading Indicator */
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loader {
    width: 48px;
    height: 48px;
    border: 4px solid var(--text-secondary);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Canvas Background */
#shaderCanvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.8;
}

/* Content Overlay */
.content {
    position: relative;
    z-index: 1;
    min-height: 100vh;
}

/* Navbar */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem 2rem;
    z-index: 100;
    backdrop-filter: blur(10px);
    background-color: rgba(10, 10, 10, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
    text-decoration: none;
    letter-spacing: 2px;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-menu a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
}

.nav-menu a:hover::after,
.nav-menu a.active::after {
    width: 100%;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 2rem;
}

.hero-title {
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

.hero-line {
    display: block;
    animation: fadeInUp 1s ease forwards;
    opacity: 0;
}

.hero-line:nth-child(1) { animation-delay: 0.2s; }
.hero-line:nth-child(2) { animation-delay: 0.4s; }
.hero-line:nth-child(3) { animation-delay: 0.6s; }

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-subtitle {
    font-size: clamp(1rem, 4vw, 1.5rem);
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 600px;
}

.hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    border-radius: 50px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.btn-primary {
    background-color: var(--primary-color);
    color: var(--text-color);
}

.btn-primary:hover {
    background-color: transparent;
    border-color: var(--primary-color);
    transform: translateY(-2px);
}

.btn-outline {
    border-color: var(--text-color);
    color: var(--text-color);
}

.btn-outline:hover {
    background-color: var(--text-color);
    color: var(--background-color);
    transform: translateY(-2px);
}

/* Sections */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 6rem 2rem;
}

.section-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 3rem;
    position: relative;
    display: inline-block;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: var(--primary-color);
}

/* Work Grid */
.work-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.work-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    overflow: hidden;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;
}

.work-card:hover {
    transform: translateY(-10px);
}

.work-card-image {
    height: 200px;
    background-color: rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.placeholder-shader {
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    opacity: 0.5;
    transition: opacity 0.3s ease;
}

.work-card:hover .placeholder-shader {
    opacity: 0.8;
}

.work-card h3 {
    padding: 1.5rem 1.5rem 0.5rem;
    font-size: 1.25rem;
}

.work-card p {
    padding: 0 1.5rem 1.5rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

/* About Section */
.about-content {
    max-width: 800px;
}

.about-text {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.skill-tag {
    padding: 0.5rem 1.5rem;
    background-color: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.skill-tag:hover {
    border-color: var(--primary-color);
    transform: scale(1.05);
}

/* Contact Section */
.contact-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
}

.contact-content p {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
}

.contact-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.contact-link {
    color: var(--text-color);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.contact-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
}

.contact-link:hover::after {
    width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hero-title {
        font-size: 3rem;
    }
    
    .section-title {
        font-size: 2.5rem;
    }
    
    .container {
        padding: 4rem 1.5rem;
    }
    
    .work-grid {
        grid-template-columns: 1fr;
    }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: var(--background-color);
}

::-webkit-scrollbar-thumb {
    background: var(--card-bg);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
}
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Add Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Create HTML structure
document.body.innerHTML = `
    <!-- Loading indicator -->
    <div class="loading">
        <div class="loader"></div>
    </div>

    <!-- Canvas background -->
    <canvas id="shaderCanvas"></canvas>

    <!-- Content overlay -->
    <div class="content">
        <nav class="navbar">
            <div class="nav-container">
                <a href="#" class="logo">GAUDVIBE</a>
                <ul class="nav-menu">
                    <li><a href="#work">Work</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>

        <main>
            <section class="hero">
                <h1 class="hero-title">
                    <span class="hero-line">Creative</span>
                    <span class="hero-line">Developer &</span>
                    <span class="hero-line">Shader Artist</span>
                </h1>
                <p class="hero-subtitle">Crafting immersive digital experiences through code</p>
                <div class="hero-cta">
                    <a href="#work" class="btn btn-primary">View Work</a>
                    <a href="#contact" class="btn btn-outline">Get in touch</a>
                </div>
            </section>

            <section id="work" class="work-section">
                <div class="container">
                    <h2 class="section-title">Featured Work</h2>
                    <div class="work-grid">
                        <div class="work-card">
                            <div class="work-card-image">
                                <div class="placeholder-shader"></div>
                            </div>
                            <h3>WebGL Experiments</h3>
                            <p>Interactive shader-based animations and effects</p>
                        </div>
                        <div class="work-card">
                            <div class="work-card-image">
                                <div class="placeholder-shader"></div>
                            </div>
                            <h3>Creative Coding</h3>
                            <p>Generative art and real-time graphics</p>
                        </div>
                        <div class="work-card">
                            <div class="work-card-image">
                                <div class="placeholder-shader"></div>
                            </div>
                            <h3>Interactive Experiences</h3>
                            <p>Immersive web applications with WebGL</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" class="about-section">
                <div class="container">
                    <h2 class="section-title">About</h2>
                    <div class="about-content">
                        <p class="about-text">I'm a creative developer specializing in WebGL, shaders, and interactive experiences. With a passion for visual art and mathematics, I create unique digital experiences that push the boundaries of web technology.</p>
                        <div class="skills">
                            <span class="skill-tag">WebGL</span>
                            <span class="skill-tag">GLSL</span>
                            <span class="skill-tag">Three.js</span>
                            <span class="skill-tag">JavaScript</span>
                            <span class="skill-tag">React</span>
                            <span class="skill-tag">Creative Coding</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" class="contact-section">
                <div class="container">
                    <h2 class="section-title">Let's Connect</h2>
                    <div class="contact-content">
                        <p>Interested in working together? Let's create something amazing.</p>
                        <div class="contact-links">
                            <a href="mailto:hello@gaudvibe.com" class="contact-link">Email</a>
                            <a href="#" class="contact-link">GitHub</a>
                            <a href="#" class="contact-link">LinkedIn</a>
                            <a href="#" class="contact-link">Twitter</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
`;

// Now include your shader code
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading indicator when WebGL is ready
    const loadingElement = document.querySelector('.loading');
    
    const canvas = document.getElementById('shaderCanvas');
    const gl = canvas.getContext('webgl');
    
    if (!gl) {
        console.warn('WebGL not supported - using fallback background');
        loadingElement.remove();
        return;
    }

    // Generate random parameters for each page load
    const randomParams = {
        shapeType: Math.floor(Math.random() * 6), // 0-5 for different shapes
        colorSeed: Math.random() * 100,
        speed: 0.5 + Math.random() * 1.5,
        density: 2 + Math.random() * 3,
        pattern: Math.floor(Math.random() * 3),
        lineWidth: 0.01 + Math.random() * 0.03,
        distortionAmount: 0.1 + Math.random() * 0.3,
        distortionSpeed: 0.5 + Math.random() * 2.0,
        distortionScale: 3 + Math.random() * 5
    };

    // Get the primary color from CSS
    const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-color').trim();
    
    // Convert hex color to RGB
    const hexToRgb = (hex) => {
        const r = parseInt(hex.substring(1, 3), 16) / 255;
        const g = parseInt(hex.substring(3, 5), 16) / 255;
        const b = parseInt(hex.substring(5, 7), 16) / 255;
        return {r, g, b};
    };
    
    const primaryRgb = hexToRgb(primaryColor);

    // Vertex shader
    const vertexShaderSource = `
        attribute vec2 aPosition;
        void main() {
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `;

    // Fragment shader with enhanced distortion
    const fragmentShaderSource = `
        precision highp float;
        
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec3 uRandomParams;
        
        // Distance functions
        float sdCircle(vec2 p, float r) {
            return length(p) - r;
        }
        
        float sdBox(vec2 p, vec2 b) {
            vec2 d = abs(p) - b;
            return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
        }
        
        float sdTriangle(vec2 p) {
            const float k = sqrt(3.0);
            p.x = abs(p.x) - 1.0;
            p.y = p.y + 1.0/k;
            if(p.x + k*p.y > 0.0) {
                p = vec2(p.x - k*p.y, -k*p.x - p.y)/2.0;
            }
            p.x -= clamp(p.x, -2.0, 0.0);
            return -length(p) * sign(p.y);
        }
        
        float sdHexagon(vec2 p, float r) {
            const vec3 k = vec3(-0.866025404,0.5,0.577350269);
            p = abs(p);
            p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
            p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
            return length(p)*sign(p.y);
        }
        
        float sdVerticalLine(vec2 p, float width) {
            return abs(p.x) - width;
        }
        
        float sdHorizontalLine(vec2 p, float width) {
            return abs(p.y) - width;
        }
        
        // Color palette generator
        vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
            return a + b*cos(6.28318*(c*t+d));
        }
        
        // Distortion function
        vec2 distort(vec2 uv, float time, float amount, float speed, float scale) {
            // Multi-frequency distortion
            float offset1 = amount * sin(scale * uv.y + speed * time);
            float offset2 = amount * 0.5 * sin(scale * 2.0 * uv.x + speed * 1.3 * time);
            float offset3 = amount * 0.3 * cos(scale * 0.7 * (uv.x + uv.y) + speed * 0.7 * time);
            
            uv.x += offset1 + offset2;
            uv.y += offset3;
            return uv;
        }
        
        void main() {
            vec2 uv = (gl_FragCoord.xy/iResolution - 0.5) * 2.0;
            uv.x *= iResolution.x / iResolution.y;
            
            // Apply distortion effect before other transformations
            uv = distort(
                uv,
                iTime,
                ${randomParams.distortionAmount.toFixed(2)},
                ${randomParams.distortionSpeed.toFixed(2)},
                ${randomParams.distortionScale.toFixed(2)}
            );
            
            // Apply random speed to movement
            uv += iTime * 0.1 * uRandomParams.z;
            
            // Create repeating pattern
            uv = fract(uv * ${randomParams.density.toFixed(1)}) - 0.5;
            
            // Select shape based on random parameter
            float d;
            float width = ${randomParams.lineWidth.toFixed(3)};
            
            if (uRandomParams.x < 0.5) {
                d = sdCircle(uv, 0.4);
            } else if (uRandomParams.x < 1.5) {
                d = sdBox(uv, vec2(0.3, 0.3));
            } else if (uRandomParams.x < 2.5) {
                d = sdTriangle(uv * 1.2);
            } else if (uRandomParams.x < 3.5) {
                d = sdHexagon(uv, 0.3);
            } else if (uRandomParams.x < 4.5) {
                d = sdVerticalLine(uv, width);
            } else {
                d = sdHorizontalLine(uv, width);
            }
            
            // Generate color based on position and time
            vec3 col;
            if (${randomParams.pattern} == 0) {
                // Radial color pattern using primary color
                float r = length(uv) + iTime * 0.3 * uRandomParams.z;
                vec3 a = vec3(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b});
                vec3 b = vec3(0.3, 0.3, 0.3);
                vec3 c = vec3(1.0, 1.0, 1.0);
                vec3 d = vec3(uRandomParams.y, uRandomParams.y + 0.33, uRandomParams.y + 0.67);
                col = palette(r, a, b, c, d);
            } else if (${randomParams.pattern} == 1) {
                // Horizontal stripes
                float p = uv.x * 5.0 + iTime * 0.5 * uRandomParams.z;
                vec3 a = vec3(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b});
                vec3 b = vec3(0.2, 0.2, 0.2);
                vec3 c = vec3(1.0, 1.0, 1.0);
                vec3 d = vec3(0.0, 0.10, 0.20) + uRandomParams.y;
                col = palette(p, a, b, c, d);
            } else {
                // Diagonal waves
                float p = (uv.x + uv.y) * 3.0 + iTime * 0.4 * uRandomParams.z;
                vec3 a = vec3(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b});
                vec3 b = vec3(0.3, 0.3, 0.3);
                vec3 c = vec3(1.0, 1.0, 0.5);
                vec3 d = vec3(0.8, 0.9, 0.3) + uRandomParams.y;
                col = palette(p, a, b, c, d);
            }
            
            // Draw shape with anti-aliasing
            col = mix(col, vec3(0.0), smoothstep(width, width+0.01, abs(d)));
            
            gl_FragColor = vec4(col, 1.0);
        }
    `;

    function resizeCanvas() {
        canvas.width = Math.min(window.innerWidth, 1920);
        canvas.height = Math.min(window.innerHeight, 1080);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function compileShader(source, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader error:', gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) {
        loadingElement.remove();
        return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program error:', gl.getProgramInfoLog(program));
        loadingElement.remove();
        return;
    }
    
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const timeLocation = gl.getUniformLocation(program, 'iTime');
    const randomParamsLocation = gl.getUniformLocation(program, 'uRandomParams');
    
    resizeCanvas();
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    
    // Pass random parameters to shader
    gl.uniform3f(
        randomParamsLocation,
        randomParams.shapeType,
        randomParams.colorSeed,
        randomParams.speed
    );

    let lastTime = 0;
    function animate(currentTime) {
        currentTime *= 0.001; // Convert to seconds
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        if (timeLocation) {
            gl.uniform1f(timeLocation, currentTime);
        }
        
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        
        const fps = document.hidden ? 15 : 60;
        setTimeout(() => {
            requestAnimationFrame(animate);
        }, 1000 / fps);
    }
    
    window.addEventListener('resize', function() {
        resizeCanvas();
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    });
    
    // Remove loading indicator when everything is ready
    loadingElement.style.opacity = '0';
    setTimeout(() => {
        loadingElement.remove();
    }, 500);
    
    requestAnimationFrame(animate);
});
