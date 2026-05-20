// Attendre que le DOM soit prêt
(function() {
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
        canvas.style.zIndex = '1';
        document.body.appendChild(canvas);
    }
    
    // Get or create loading indicator
    let loadingElement = document.querySelector('.loading');
    
    const gl = canvas.getContext('webgl');
    
    if (!gl) {
        console.warn('WebGL not supported');
        if (loadingElement) loadingElement.remove();
        document.body.style.backgroundColor = '#1a1a1a';
        return;
    }

    const randomParams = {
        shapeType: Math.floor(Math.random() * 6),
        colorSeed: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3,
        density: 2 + Math.random() * 3,
        pattern: Math.floor(Math.random() * 3),
        distortionType: Math.floor(Math.random() * 3),
        amplitude: 100 + Math.random() * 300,
        frequency: 200 + Math.random() * 600,
        distortionSpeed: 2 + Math.random() * 8,
        lineWidth: 0.01 + Math.random() * 0.03,
        distortionAmount: 0.1 + Math.random() * 0.3,
        distortionScale: 3 + Math.random() * 5
    };

    // Generate random color
    const randomColor = () => {
        const hue = Math.random() * 360;
        const saturation = 0.7 + Math.random() * 0.3;
        const lightness = 0.5 + Math.random() * 0.3;
        return hslToRgb(hue, saturation, lightness);
    };

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

    // Fragment shader
    const fragmentShaderSource = `
        precision highp float;
        
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec3 uRandomParams;
        
        float sdCircle(vec2 p, float r) {
            return length(p) - r;
        }
        
        float sdBox(vec2 p, vec2 b) {
            vec2 d = abs(p) - b;
            return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
        }
        
        float sdLineInfinite(vec2 p, vec2 a, vec2 b) {
            vec2 pa = p - a, ba = b - a;
            float h = dot(pa, ba) / dot(ba, ba);
            return length(pa - ba * h);
        }
        
        vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
            return a + b*cos(6.28318*(c*t+d));
        }
        
        vec2 earthboundDistort(vec2 uv, float y, float time, float amplitude, float frequency, float speed, int distType) {
            float C1 = 1.0 / 512.0;
            float C2 = 8.0 * 3.14159 / (1024.0 * 256.0);
            float C3 = 3.14159 / 60.0;
            
            float finalAmplitude = C1 * amplitude;
            float finalFrequency = C2 * frequency;
            float finalSpeed = C3 * speed * time * 2.0;
            
            float offset = finalAmplitude * sin(finalFrequency * y + finalSpeed);
            float offsetY = finalAmplitude * sin(finalFrequency * uv.x * 1024.0 + finalSpeed * 1.3);
            
            if (distType == 0) {
                uv.x += offset;
                uv.y += offsetY;
            } else if (distType == 1) {
                float scanline = mod(y, 2.0);
                if (scanline < 1.0) {
                    uv.x -= offset;
                } else {
                    uv.x += offset;
                }
                uv.y += offsetY;
            } else {
                uv.y += offset * 0.5;
                uv.x += offsetY;
            }
            return uv;
        }
        
        void main() {
            vec2 uv = (gl_FragCoord.xy/iResolution - 0.5) * 2.0;
            uv.x *= iResolution.x / iResolution.y;
            
            float pixelY = gl_FragCoord.y;
            uv = earthboundDistort(uv, pixelY, iTime, ${randomParams.amplitude.toFixed(2)}, ${randomParams.frequency.toFixed(2)}, ${randomParams.distortionSpeed.toFixed(2)}, ${randomParams.distortionType});
            uv += iTime * 0.1 * uRandomParams.z;
            
            vec2 uvForColor = uv;
            
            float d;
            if (uRandomParams.x < 1.0) {
                uv = fract(uv * ${randomParams.density.toFixed(1)}) - 0.5;
                d = sdCircle(uv, 0.4);
            } else if (uRandomParams.x < 2.0) {
                uv = fract(uv * ${randomParams.density.toFixed(1)}) - 0.5;
                d = sdBox(uv, vec2(0.3, 0.3));
            } else if (uRandomParams.x < 3.0) {
                float lineSpacing = 1.0 / ${randomParams.density.toFixed(1)};
                d = abs(mod(uv.y - uv.x, lineSpacing) - lineSpacing * 0.5);
                uvForColor = fract(uv * ${randomParams.density.toFixed(1)}) - 0.5;
            } else if (uRandomParams.x < 4.0) {
                float lineSpacing = 1.0 / ${randomParams.density.toFixed(1)};
                d = abs(mod(uv.y, lineSpacing) - lineSpacing * 0.5);
                uvForColor = fract(uv * ${randomParams.density.toFixed(1)}) - 0.5;
            } else if (uRandomParams.x < 5.0) {
                float lineSpacing = 1.0 / ${randomParams.density.toFixed(1)};
                d = abs(mod(uv.x, lineSpacing) - lineSpacing * 0.5);
                uvForColor = fract(uv * ${randomParams.density.toFixed(1)}) - 0.5;
            } else {
                uv = fract(uv * ${randomParams.density.toFixed(1)}) - 0.5;
                d = sdCircle(uv, 0.4);
            }
            
            float r = length(uvForColor) + iTime * 0.2;
            vec3 a = vec3(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b});
            vec3 b = vec3(0.5, 0.5, 0.5);
            vec3 c = vec3(1.0, 1.0, 1.0);
            vec3 dColor = vec3(0.0, 0.33, 0.67) + uRandomParams.y;
            vec3 col = palette(r, a, b, c, dColor);
            
            col = mix(col, vec3(0.0), smoothstep(0.02, 0.03, abs(d)));
            
            gl_FragColor = vec4(col, 1.0);
        }
    `;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
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
        if (loadingElement) loadingElement.remove();
        document.body.style.backgroundColor = '#1a1a1a';
        return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program error:', gl.getProgramInfoLog(program));
        if (loadingElement) loadingElement.remove();
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
    gl.uniform3f(randomParamsLocation, randomParams.shapeType, randomParams.colorSeed, randomParams.speed);

    function animate(currentTime) {
        currentTime *= 0.001;
        gl.uniform1f(timeLocation, currentTime);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', function() {
        resizeCanvas();
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    });
    
    if (loadingElement) {
        loadingElement.style.opacity = '0';
        setTimeout(() => loadingElement.remove(), 500);
    }
    
    requestAnimationFrame(animate);
})();
