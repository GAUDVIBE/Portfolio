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

    // Generate random parameters
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
        
        vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
            return a + b*cos(6.28318*(c*t+d));
        }
        
        vec2 distort(vec2 uv, float time, float amount, float speed, float scale) {
            float offset1 = amount * sin(scale * uv.y + speed * time);
            float offset2 = amount * 0.5 * sin(scale * 2.0 * uv.x + speed * 1.3 * time);
            uv.x += offset1 + offset2;
            return uv;
        }
        
        void main() {
            vec2 uv = (gl_FragCoord.xy/iResolution - 0.5) * 2.0;
            uv.x *= iResolution.x / iResolution.y;
            
            uv = distort(uv, iTime, ${randomParams.distortionAmount.toFixed(2)}, ${randomParams.distortionSpeed.toFixed(2)}, ${randomParams.distortionScale.toFixed(2)});
            uv += iTime * 0.1 * uRandomParams.z;
            uv = fract(uv * ${randomParams.density.toFixed(1)}) - 0.5;
            
            float d;
            if (uRandomParams.x < 1.0) {
                d = sdCircle(uv, 0.4);
            } else if (uRandomParams.x < 2.0) {
                d = sdBox(uv, vec2(0.3, 0.3));
            } else {
                d = sdCircle(uv, 0.4);
            }
            
            float r = length(uv) + iTime * 0.2;
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
