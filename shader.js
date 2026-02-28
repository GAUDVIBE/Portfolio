document.addEventListener('DOMContentLoaded', function() {
    // Create canvas if it doesn't exist
    let canvas = document.getElementById('shaderCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'shaderCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1'; // Changé de -1 à 1 pour être visible
        document.body.appendChild(canvas);
    } else {
        // Si le canvas existe déjà, assurez-vous qu'il a le bon z-index
        canvas.style.zIndex = '1';
    }
    
    // Create or get loading indicator
    let loadingElement = document.querySelector('.loading');
    if (!loadingElement) {
        loadingElement = document.createElement('div');
        loadingElement.className = 'loading';
        loadingElement.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:white;font-family:Arial,sans-serif;z-index:1000;';
        loadingElement.textContent = 'Loading...';
        document.body.appendChild(loadingElement);
    }
    
    const gl = canvas.getContext('webgl');
    
    if (!gl) {
        console.warn('WebGL not supported - using fallback background');
        loadingElement.remove();
        document.body.style.backgroundColor = '#1a1a1a';
        return;
    }

    // Generate random parameters for each page load
    const randomParams = {
        shapeType: Math.floor(Math.random() * 6),
        colorSeed: Math.random() * 100,
        speed: 0.2 + Math.random() * 1.0,
        density: 1 + Math.random() * 4,
        pattern: Math.floor(Math.random() * 3),
        lineWidth: 0.01 + Math.random() * 0.03,
        distortionAmount: 0.05 + Math.random() * 0.2,
        distortionSpeed: 0.3 + Math.random() * 1.0,
        distortionScale: 2 + Math.random() * 4
    };

    // Generate random base color (not just blue)
    const randomColor = () => {
        const hue = Math.random() * 360;
        const saturation = 0.7 + Math.random() * 0.3;
        const lightness = 0.5 + Math.random() * 0.3;
        return hslToRgb(hue, saturation, lightness);
    };

    // Convert HSL to RGB
    function hslToRgb(h, s, l) {
        h /= 360;
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return {r, g, b};
    }

    const primaryRgb = randomColor();

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
            
            // Apply distortion effect
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
            
            // Generate color based on position and time with random base color
            vec3 col;
            float r = length(uv) + iTime * 0.2;
            vec3 a = vec3(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b});
            vec3 b = vec3(0.5, 0.5, 0.5);
            vec3 c = vec3(1.0, 1.0, 1.0);
            vec3 d = vec3(0.0, 0.33, 0.67) + uRandomParams.y;
            col = palette(r, a, b, c, d);
            
            // Draw shape with anti-aliasing
            col = mix(col, vec3(0.0), smoothstep(width, width+0.02, abs(d)));
            
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
        document.body.style.backgroundColor = '#1a1a1a';
        return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program error:', gl.getProgramInfoLog(program));
        loadingElement.remove();
        document.body.style.backgroundColor = '#1a1a1a';
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
        currentTime *= 0.001;
        if (timeLocation) {
            gl.uniform1f(timeLocation, currentTime);
        }
        
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', function() {
        resizeCanvas();
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    });
    
    if (loadingElement) {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.remove();
        }, 500);
    }
    
    requestAnimationFrame(animate);
});
