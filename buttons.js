// buttons.js - Version avec flèche animée (haut/bas)
const ICONS = {
    muzikaloid: `<svg viewBox="0 0 316 315" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#17407C" d="M21.9004 222.81L46.4127 48.3964H125.261L132.767 109.745C133.141 111.943 133.569 115.576 134.051 120.646C134.703 125.717 135.297 131.209 135.831 137.124C136.535 143.04 137.129 148.532 137.611 153.602H139.659C141.035 149.884 142.676 145.49 144.584 140.42C146.685 135.181 148.799 129.857 150.924 124.449C153.05 119.041 154.933 114.14 156.575 109.745L181.325 48.3964H257.357L232.844 222.81H178.828L187.664 159.94C188.614 153.18 189.588 146.251 190.586 139.152C191.778 131.885 192.825 125.04 193.728 118.618C194.801 112.196 195.634 106.872 196.228 102.647H194.18C193.193 106.027 191.867 109.999 190.202 114.562C188.707 119.125 187.127 123.688 185.462 128.252C183.82 132.646 182.25 136.533 180.751 139.913L146.316 222.81H104.076L92.6869 139.913C92.3086 136.533 91.8309 132.646 91.2538 128.252C90.8711 123.688 90.5738 119.125 90.3617 114.562C90.1497 109.999 89.928 106.112 89.6966 102.901H87.6486C87.2255 107.126 86.648 112.45 85.9161 118.872C85.1841 125.294 84.3194 132.054 83.3218 139.152C82.4949 146.251 81.6064 153.18 80.6563 159.94L71.8204 222.81H21.9004Z"/><path fill="#9A19E8" d="M37.433 238.964L61.9453 64.5502H140.793L148.299 125.899C148.673 128.096 149.101 131.73 149.583 136.8C150.236 141.87 150.829 147.363 151.363 153.278C152.068 159.193 152.661 164.686 153.144 169.756H155.192C156.567 166.038 158.209 161.644 160.116 156.574C162.218 151.335 164.331 146.011 166.457 140.603C168.582 135.195 170.466 130.293 172.107 125.899L196.857 64.5502H272.889L248.377 238.964H194.361L203.197 176.094C204.147 169.334 205.121 162.405 206.118 155.306C207.31 148.039 208.358 141.194 209.26 134.772C210.333 128.35 211.167 123.026 211.761 118.801H209.713C208.726 122.181 207.4 126.153 205.734 130.716C204.24 135.279 202.66 139.842 200.994 144.405C199.353 148.8 197.782 152.687 196.283 156.067L161.849 238.964H119.609L108.219 156.067C107.841 152.687 107.363 148.8 106.786 144.405C106.404 139.842 106.106 135.279 105.894 130.716C105.682 126.153 105.461 122.266 105.229 119.055H103.181C102.758 123.28 102.18 128.603 101.449 135.026C100.717 141.448 99.8519 148.208 98.8543 155.306C98.0274 162.405 97.1389 169.334 96.1888 176.094L87.353 238.964H37.433Z"/><path fill="#ED0180" d="M52.9653 255.118L77.4776 80.7041H156.326L163.832 142.053C164.205 144.25 164.633 147.884 165.116 152.954C165.768 158.024 166.362 163.517 166.896 169.432C167.6 175.347 168.194 180.84 168.676 185.91H170.724C172.1 182.192 173.741 177.798 175.649 172.728C177.75 167.489 179.864 162.165 181.989 156.757C184.115 151.348 185.998 146.447 187.64 142.053L212.39 80.7041H288.422L263.909 255.118H209.893L218.729 192.248C219.679 185.488 220.653 178.558 221.651 171.46C222.843 164.193 223.89 157.348 224.793 150.926C225.866 144.504 226.699 139.18 227.293 134.955H225.245C224.258 138.335 222.932 142.307 221.267 146.87C219.772 151.433 218.192 155.996 216.527 160.559C214.885 164.953 213.315 168.841 211.816 172.221L177.381 255.118H135.141L123.752 172.221C123.373 168.841 122.896 164.953 122.319 160.559C121.936 155.996 121.639 151.433 121.427 146.87C121.215 142.307 120.993 138.42 120.762 135.208H118.714C118.29 139.434 117.713 144.757 116.981 151.179C116.249 157.602 115.384 164.362 114.387 171.46C113.56 178.558 112.671 185.488 111.721 192.248L102.885 255.118H52.9653Z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>`,
    email: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    // Marque Scyllarus : la squille-paon du favicon de scyllarus.fr (src/app/icon.svg),
    // dessin en masque + degrade feu, sans fond, pour s'aligner sur les autres icones-marques.
    scyllarus: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"><defs><linearGradient id="scyllarusGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4d4d"/><stop offset=".5" stop-color="#ff2d55"/><stop offset="1" stop-color="#ff8a00"/></linearGradient><mask id="scyllarusMask" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128"><image width="128" height="128" xlink:href="data:image/png;base64,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"/></mask></defs><rect width="128" height="128" fill="url(#scyllarusGrad)" mask="url(#scyllarusMask)"/></svg>`
};

class GAUDVIBEButtons {
    constructor() {
        this.links = [
            // type 'pdf' / 'link' => preview au centre
            // type 'external'     => clic ouvre l'URL directement, pas de preview
            // CV retire le 2026-05-30 - en cours de refonte (cf option B
            // discutee : recreation FPDF2 from-scratch). A reactiver une
            // fois la nouvelle version uploadee.
            { label: 'Email', url: 'mailto:antoine.olivier.gaudry@gmail.com?subject=Contact via portfolio', type: 'external', icon: ICONS.email, iconColor: '#ffffff' },
            { label: 'Muzikaloid', url: 'https://muzikaloid.com', type: 'link', screenshot: 'screenshots/muzikaloid.png', icon: ICONS.muzikaloid },
            { label: 'Scyllarus', url: 'https://scyllarus.fr', type: 'link', screenshot: 'screenshots/scyllarus.png', icon: ICONS.scyllarus },
            { label: 'GitHub', url: 'https://github.com/GAUDVIBE', type: 'external', icon: ICONS.github, iconColor: '#ffffff' },
            { label: 'YouTube', url: 'https://youtube.com/@antoineGAUDRY', type: 'external', icon: ICONS.youtube, iconColor: '#FF0000' },
            { label: 'Instagram', url: 'https://www.instagram.com/antoine_gdy/', type: 'external', icon: ICONS.instagram, iconColor: '#E4405F' }
        ];

        // Concerts. Ordre du tableau = ordre d'affichage.
        // Futures: year peut etre omis (resolu via l'annee courante,
        // bump auto a l'annee suivante si la date est deja passee >30j).
        // Passees: year obligatoire (sinon le parser les croit futures).
        this.programmation = [
            { date: '22 octobre',  venue: 'Peniche Antipode',           project: 'Lila Mellark',      year: 2026 },
            { date: '6 octobre',   venue: 'Bal Chaveaux',               project: 'Instants Crew',     year: 2026 },
            { date: '19 septembre',venue: 'Brasserie Croix-de-Chaveaux',project: 'Instants Crew',     year: 2026 },
            { date: '2 juillet',   venue: 'Le FAR (loft)',              project: 'Instants Crew',     year: 2026 },
            { date: '7 juin',      venue: 'AERI - Montreuil',           project: 'Instant Orchestra', year: 2026 },
            { date: '1 décembre',  venue: 'Le Chinois Montreuil',       project: 'Instant Orchestra', year: 2025 },
            { date: '28 octobre',  venue: 'Sunset Sunside',             project: 'Lila Mellark',      year: 2025 },
            { date: '23 juin',     venue: 'Conservatoire de Montreuil', project: 'Instant Orchestra', year: 2025 },
            { date: '22 juin',     venue: 'Parc des Bastions Genève',   project: 'Lila Mellark',      year: 2025 }
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
                min-height: 100svh; /* iOS Safari: zone visible address-bar incluse */
                overflow: hidden;
            }
            
            /* Desktop par defaut: sidebar a GAUCHE en colonne,
               content-area a droite (preview + programmation centrees
               verticalement comme un groupe). */
            main {
                width: 100%;
                height: 100vh;
                display: flex;
                flex-direction: row;
                gap: 2em;
                z-index: 1000;
                position: relative;
                padding: 2em;
            }

            .sidebar {
                width: 200px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                gap: 20px;
            }

            /* Container qui empile preview-area + programmation et les
               centre verticalement en groupe.
               - Pas de preview => programmation seule, donc centree.
               - Preview active => preview + programmation centrees en
                 groupe avec preview au-dessus, programmation en-dessous. */
            .content-area {
                flex: 1;
                min-width: 0;
                min-height: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 1em;
            }
            
            /* Zone de prévisualisation : enfant du content-area, hug son
               contenu (preview-container). Quand preview-container est
               display: none, preview-area = 0 visible. */
            .preview-area {
                width: 100%;
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
                max-width: 800px;
                max-height: 65vh;
                display: none;
                flex-direction: column;
                gap: 20px;
            }
            
            .preview-container.active {
                display: flex;
            }
            
            /* Block + overflow-y: auto. L'image (img directe) prend
               width: 100% height: auto, et preview-content scrolle
               verticalement si l'image est plus haute que le container. */
            .preview-content {
                flex: 1;
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
            
            /* Programmation : enfant du content-area, hug son contenu.
               Centree verticalement avec preview-area via le
               justify-content: center du content-area. */
            .programmation {
                color: #ffffff;
                font-family: 'Courier New', monospace;
                padding: 14px 20px;
                line-height: 1.5;
                background-color: rgba(0, 0, 0, 0.55);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 12px;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                max-width: 100%;
                overflow: hidden;
            }
            /* Liste des concerts : defile dans le container (le body est en
               overflow: hidden), l'intitule reste fixe au-dessus. */
            /* max-height posee en JS (fitProgrammation) = VISIBLE_LINES
               lignes ; fondu bas tant qu'il reste des dates a faire defiler. */
            .programmation-list {
                overflow-y: auto;
                overscroll-behavior: contain;
                -webkit-overflow-scrolling: touch;
                padding-right: 6px;
                scrollbar-width: thin;
                scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
            }
            .programmation-list.has-more {
                -webkit-mask-image: linear-gradient(to bottom, #000 75%, transparent);
                mask-image: linear-gradient(to bottom, #000 75%, transparent);
            }
            .programmation-list::-webkit-scrollbar { width: 4px; }
            .programmation-list::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 2px;
            }
            /* Intitule du container : separe visuellement des lignes par un
               filet. Exclu de l'auto-shrink (ne cible que .programmation-line). */
            .programmation-title {
                font-size: 1.15rem;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.18em;
                text-align: center;
                color: #ffffff;
                margin-bottom: 12px;
                padding-bottom: 9px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                white-space: nowrap;
            }
            .programmation-line {
                font-size: 0.95rem;
                font-weight: bold;
                margin-bottom: 6px;
                white-space: nowrap;
                transition: opacity 0.4s ease, filter 0.4s ease;
            }
            .programmation-line:last-child { margin-bottom: 0; }
            /* Dates passees : assombries + legerement fanees, jamais masquees */
            .programmation-line.past {
                opacity: 0.35;
                filter: grayscale(0.4);
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
                    min-height: 100svh; /* iOS Safari: zone visible reelle */
                    gap: 1em;
                    align-items: center;
                }

                .sidebar {
                    width: 100%;
                    max-width: 180px;
                    height: auto;
                    flex-direction: row;
                    flex-wrap: wrap;
                }

                /* Mobile: content-area prend l'espace restant en bas du
                   main, avec preview-area en row 1 (1fr) et programmation
                   en row 2 (auto, en bas). Reproduit le comportement
                   "perfect" mobile validate par l'utilisateur. */
                .content-area {
                    flex: 1;
                    width: 100%;
                    max-width: 500px;
                    display: grid;
                    grid-template-rows: 1fr auto;
                    gap: 1em;
                    justify-content: stretch;
                }

                .preview-area {
                    width: 100%;
                }
                
                .preview-container {
                    width: 100%;
                    height: auto;
                    max-height: none;
                    padding: 15px;
                }

                .preview-content {
                    overflow: hidden !important;
                    height: auto;
                }

                .preview-content iframe,
                .preview-content embed {
                    width: 100% !important;
                    height: 100% !important;
                    max-width: 100% !important;
                }

                /* Wrapper supprime (image directe dans preview-content).
                   On garde une regle defensive au cas ou un futur preview
                   reintroduit un div interne. */
                .preview-content > div {
                    width: 100% !important;
                    height: auto !important;
                    max-width: 100% !important;
                }
                
                .sidebar {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    flex-direction: row;
                }

                /* Mobile: centre plein viewport, padding compact */
                .programmation {
                    padding: 12px 14px;
                }
                .programmation-line {
                    margin-bottom: 5px;
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
                if (link.type === 'external') {
                    window.open(link.url, '_blank');
                } else {
                    this.showPreview(link);
                }
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

        // === CONTENT AREA : preview + programmation groupees ===
        // Wrapper necessaire pour pouvoir centrer verticalement les deux
        // comme un groupe sur desktop (flex column + justify-content: center).
        const contentArea = document.createElement('div');
        contentArea.className = 'content-area';
        contentArea.appendChild(previewArea);

        if (this.programmation && this.programmation.length) {
            const prog = document.createElement('div');
            prog.className = 'programmation';
            const title = document.createElement('div');
            title.className = 'programmation-title';
            title.textContent = 'Mes concerts';
            prog.appendChild(title);
            const list = document.createElement('div');
            list.className = 'programmation-list';
            this.programmation.forEach(ev => {
                const line = document.createElement('div');
                line.className = 'programmation-line';
                if (this.isPastDate(ev)) line.classList.add('past');
                const d = this.eventDate(ev);
                const when = d ? `${ev.date} ${d.getFullYear()}` : ev.date;
                line.textContent = `${when} — ${ev.venue} — ${ev.project}`;
                list.appendChild(line);
            });
            prog.appendChild(list);
            list.addEventListener('scroll', () => this.updateProgrammationFade(list), { passive: true });
            contentArea.appendChild(prog);
        }

        main.appendChild(contentArea);
        document.body.appendChild(main);

        // Fit apres insertion dans le DOM (clientWidth necessite layout calcule)
        if (this.programmation && this.programmation.length) {
            this.fitProgrammation();
            window.addEventListener('resize', () => this.fitProgrammation());
        }
    }

    // Auto-shrink: mesure la ligne la plus large, reduit le font de TOUTES les
    // lignes pour qu'elle rentre dans le container. Pas de scroll horizontal,
    // pas de wrap, font aussi gros que la place le permet.
    fitProgrammation() {
        const prog = document.querySelector('.programmation-list');
        if (!prog) return;
        const lines = prog.querySelectorAll('.programmation-line');
        if (!lines.length) return;

        // Reset pour repartir du font CSS de base (utile au resize).
        lines.forEach(l => { l.style.fontSize = ''; });

        const cs = getComputedStyle(prog);
        const innerWidth = prog.clientWidth
            - parseFloat(cs.paddingLeft)
            - parseFloat(cs.paddingRight);

        let maxLineWidth = 0;
        lines.forEach(l => { maxLineWidth = Math.max(maxLineWidth, l.scrollWidth); });

        if (maxLineWidth > innerWidth && maxLineWidth > 0) {
            const baseSize = parseFloat(getComputedStyle(lines[0]).fontSize);
            // Plancher 9px pour rester lisible
            const newSize = Math.max(baseSize * (innerWidth / maxLineWidth), 9);
            lines.forEach(l => { l.style.fontSize = `${newSize}px`; });
        }

        // Hauteur = VISIBLE_LINES premieres lignes (mesuree apres le resize
        // du font), le reste defile.
        const VISIBLE_LINES = 5;
        prog.style.maxHeight = '';
        if (lines.length > VISIBLE_LINES) {
            const top = lines[0].offsetTop;
            const last = lines[VISIBLE_LINES - 1];
            prog.style.maxHeight = `${last.offsetTop + last.offsetHeight - top}px`;
        }
        this.updateProgrammationFade(prog);
    }

    updateProgrammationFade(list) {
        const more = list.scrollTop + list.clientHeight < list.scrollHeight - 2;
        list.classList.toggle('has-more', more);
    }
    
    showPreview(link) {
        const previewContainer = document.getElementById('previewContainer');
        const previewContent = document.getElementById('previewContent');
        
        previewContent.innerHTML = '';
        
        if (link.type === 'pdf') {
            // Image directe dans preview-content (qui a deja overflow-y: auto
            // desktop). Pas de wrapper => evite le piege flex-centering +
            // height: 100% qui croppait le haut et bloquait le scroll PC.
            const img = document.createElement('img');
            img.src = link.image || link.url;
            img.alt = link.text;
            img.style.cssText = 'width: 100%; height: auto; display: block; background: white; cursor: pointer;';
            img.addEventListener('click', () => window.open(link.url, '_blank'));
            previewContent.appendChild(img);
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
    
    // Parse "1 juin", "15 mars", "1 janvier" + year optionnel.
    // Si year absent: prend l'annee courante, sauf si la date tombe >30j
    // dans le passe (probablement l'annee suivante).
    isPastDate(ev) {
        const d = this.eventDate(ev);
        if (!d) return false;
        const now = new Date();
        return d < new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    // Date resolue d'un concert (annee deduite si absente), null si illisible.
    eventDate(ev) {
        const months = {
            janvier: 0, fevrier: 1, 'février': 1, mars: 2, avril: 3, mai: 4,
            juin: 5, juillet: 6, aout: 7, 'août': 7, septembre: 8,
            octobre: 9, novembre: 10, decembre: 11, 'décembre': 11
        };
        const m = String(ev.date).toLowerCase().trim().match(/^(\d{1,2})\s+(\S+)/);
        if (!m) return null;
        const day = parseInt(m[1], 10);
        const month = months[m[2]];
        if (month === undefined) return null;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let year = ev.year ?? now.getFullYear();
        let d = new Date(year, month, day);
        // Annee absente + date deja >30j dans le passe => probablement l'an prochain
        if (ev.year === undefined && (today - d) > 30 * 24 * 60 * 60 * 1000) {
            d = new Date(year + 1, month, day);
        }
        return d;
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
