// script.js - Complete website generator
// This file generates all HTML and CSS dynamically, then loads shader.js

(function() {
    // Inject CSS styles
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
            margin: 0;
            min-height: 100vh;
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
            cursor: pointer;
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
            cursor: pointer;
            display: inline-block;
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
            cursor: pointer;
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

        /* Google Font */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    `;

    // Inject Google Font link
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Load shader.js after everything is set up
    const shaderScript = document.createElement('script');
    shaderScript.src = 'shader.js';
    document.body.appendChild(shaderScript);
})();
