export interface Project {
  id: string;
  title: string;
  category: 'web-app' | 'rich-media';
  subCategory?: string; // DCO, Gamified, Expandable, etc.
  description: Record<'en' | 'es' | 'fr', string>;
  tags: string[];
  demoType: 'sandbox' | 'iframe' | 'external';
  demoUrl?: string;
  features: Record<'en' | 'es' | 'fr', string[]>;
}

export const projectsData: Project[] = [
  {
    id: "clock-in",
    title: "Automated Clock-In System",
    category: "web-app",
    subCategory: "Productivity SaaS",
    description: {
      en: "A robust employee attendance and productivity tracker featuring instant clock-in/out, live shift duration calculations, break tracking, and an analytics dashboard reporting weekly hours.",
      es: "Un sistema de registro de asistencia y productividad para empleados que ofrece fichaje de entrada/salida instantáneo, cálculo de duración de turnos en tiempo real, registro de pausas y un panel de análisis.",
      fr: "Un système robuste de suivi des présences et de la productivité des employés, comprenant le pointage instantané, le calcul en direct de la durée des quarts de travail, le suivi des pauses et un tableau de bord analytique."
    },
    tags: ["React", "TypeScript", "Vanilla CSS", "LocalStorage", "Analytics"],
    demoType: "iframe",
    demoUrl: "https://we13b-md.github.io/clockIn/dashboard.html",
    features: {
      en: ["Geofence simulation", "Break time tracker", "Visual weekly charts", "CSV report exporter"],
      es: ["Simulación de geovalla", "Seguimiento de pausas", "Gráficos semanales visuales", "Exportador a CSV"],
      fr: ["Simulation de géorepérage", "Suivi des temps de pause", "Graphiques hebdomadaires", "Exportation de rapports CSV"]
    }
  },
  {
    id: "bank-alert",
    title: "Fake Bank Alert Detector",
    category: "web-app",
    subCategory: "Cybersecurity Utility",
    description: {
      en: "An intelligent security utility that parses banking transaction notification text, headers, and metadata to analyze authenticity, flagging suspicious text patterns, unverified domains, and financial scam indicators.",
      es: "Una herramienta inteligente de seguridad que analiza el texto y metadatos de notificaciones bancarias para verificar su autenticidad, detectando patrones de texto sospechosos y estafas financieras.",
      fr: "Un utilitaire de sécurité intelligent qui analyse le texte, les en-têtes et les métadonnées des notifications bancaires pour vérifier leur authenticité, en signalant les modèles de texte suspects."
    },
    tags: ["React", "TypeScript", "Phishing Analyzer", "Pattern Matching", "Security Sandbox"],
    demoType: "iframe",
    demoUrl: "https://fake-bank-alert-app-f4fs.vercel.app/",
    features: {
      en: ["Scam heuristics analyzer", "Real-time header scanning", "Risk percentage indicator", "Safety recommendation tips"],
      es: ["Analizador heurístico de estafas", "Escaneo de encabezados en tiempo real", "Indicador de porcentaje de riesgo", "Recomendaciones de seguridad"],
      fr: ["Analyse heuristique des arnaques", "Analyse des en-têtes en temps réel", "Indicateur de pourcentage de risque", "Conseils de sécurité"]
    }
  },
  {
    id: "conference-ticket-generator",
    title: "Conference Ticket Generator",
    category: "web-app",
    subCategory: "SaaS Utility",
    description: {
      en: "A dynamic, high-fidelity ticket generation application that lets users customize, live-preview, and generate digital entrance tickets, featuring profile image upload, drag-and-drop avatar handling, and instant PDF ticket download options.",
      es: "Un generador de entradas para conferencias dinámico de alta fidelidad que permite personalizar, previsualizar en tiempo real y generar entradas digitales, con carga de avatar y descarga de PDF instantánea.",
      fr: "Un générateur dynamique de billets de conférence permettant de personnaliser, de prévisualiser en direct et de générer des billets d'entrée numériques avec téléchargement d'images et export PDF."
    },
    tags: ["React", "TypeScript", "Tailwind CSS", "PDF Generation", "Cloudinary", "Vercel"],
    demoType: "iframe",
    demoUrl: "https://client-red-mu-30.vercel.app/",
    features: {
      en: ["Real-time ticket live preview", "Drag-and-drop avatar image upload", "Form field input validation", "Clean printable PDF/downloadable ticket"],
      es: ["Vista previa de entradas en tiempo real", "Carga de avatar arrastrando y soltando", "Validación de campos de formulario", "PDF limpio para imprimir/descargar"],
      fr: ["Aperçu en direct du billet en temps réel", "Téléchargement d'avatar par glisser-déposer", "Validation des champs de formulaire", "Billet PDF propre à imprimer/télécharger"]
    }
  },
  {
    id: "rich-media-nike-slider",
    title: "Nike Boots Interactive Slider Ad",
    category: "rich-media",
    subCategory: "Gamified Ads",
    description: {
      en: "An interactive high-impact rich media ad banner for Nike boots. It displays a legacy boot model initially, prompting user interaction via a slide trigger that smoothly sweeps to reveal the futuristic new boot, accompanied by a dynamic background campaign video GIF.",
      es: "Un banner publicitario interactivo de Rich Media para botas Nike. Muestra inicialmente un modelo de bota clásico, invitando al usuario a deslizar para revelar la nueva bota futurista y un GIF de campaña dinámico.",
      fr: "Une bannière publicitaire Rich Media interactive pour les chaussures Nike. Elle affiche un modèle classique au début, incitant l'utilisateur à faire glisser pour révéler le nouveau modèle futuriste."
    },
    tags: ["HTML5 Banner", "Slider UI", "GIF Campaign", "AdTech Rich Media", "Micro-Interactions"],
    demoType: "iframe",
    demoUrl: "https://we13b-md.github.io/Nikeboots-slidr/",
    features: {
      en: ["Before/after sweep animation", "High-impact visual transition", "Interactive slide handle", "Action branding landing page link"],
      es: ["Animación de barrido antes/después", "Transición visual de alto impacto", "Control deslizante interactivo", "Enlace promocional de marca"],
      fr: ["Animation de balayage avant/après", "Transition visuelle à fort impact", "Poignée glissière interactive", "Lien de redirection de marque"]
    }
  },
  {
    id: "rich-media-dco",
    title: "Dynamic Creative Optimization (DCO) Ad Banner",
    category: "rich-media",
    subCategory: "DCO Ads",
    description: {
      en: "A cutting-edge interactive advertising banner designed for marketing campaigns. It dynamically updates messaging, images, call-to-actions, and background themes in real-time based on target location, current weather, and local time.",
      es: "Un banner publicitario interactivo de última generación. Actualiza dinámicamente mensajes, imágenes y temas de fondo en tiempo real según la ubicación del objetivo, el clima y la hora local.",
      fr: "Une bannière publicitaire interactive de pointe. Elle met à jour dynamiquement les messages, les images et les thèmes en temps réel en fonction de l'emplacement cible, de la météo et de l'heure locale."
    },
    tags: ["HTML5", "Vite", "DCO Engine", "GeoIP Simulation", "AdTech API"],
    demoType: "iframe",
    demoUrl: "https://we13b-md.github.io/mirinda-DCO/",
    features: {
      en: ["Dynamic visual adaptation", "Simulated contextual triggers", "Weather-based custom product display", "Advanced conversion telemetry"],
      es: ["Adaptación visual dinámica", "Disparadores contextuales simulados", "Productos basados en el clima", "Telemetría avanzada de conversión"],
      fr: ["Adaptation visuelle dynamique", "Déclencheurs contextuels simulés", "Affichage de produits selon la météo", "Télémétrie de conversion avancée"]
    }
  },
  {
    id: "rich-media-game",
    title: "Monster Energy 'Drag-to-Catch' Playable Ad",
    category: "rich-media",
    subCategory: "Gamified Ads",
    description: {
      en: "An interactive, highly engaging HTML5 playable ad banner built for Monster Energy campaigns. Players drag a basket to catch falling Monster bottles within a 15-second time limit, demonstrating gamified AdTech and brand engagement.",
      es: "Un banner publicitario interactivo y jugable en HTML5 para Monster Energy. Los jugadores arrastran una cesta para atrapar las botellas de Monster que caen dentro de un límite de 15 segundos.",
      fr: "Une bannière publicitaire HTML5 jouable et interactive conçue pour Monster Energy. Les joueurs font glisser un panier pour attraper les bouteilles de Monster dans un temps limite de 15 secondes."
    },
    tags: ["HTML5 Banner", "GSAP Draggable", "Gamified Ad", "Playable Banner", "AdTech Rich Media"],
    demoType: "iframe",
    demoUrl: "https://we13b-md.github.io/Monster-Drag-to-Catch/",
    features: {
      en: ["Interactive drag-and-drop basket", "15-second countdown timer", "Custom branded design assets", "High-impact conversion screen"],
      es: ["Cesta interactiva para arrastrar y soltar", "Temporizador de cuenta regresiva de 15 segundos", "Recursos de diseño de marca personalizados", "Pantalla de conversión de alto impacto"],
      fr: ["Panier interactif par glisser-déposer", "Compte à rebours de 15 secondes", "Actifs de conception de marque personnalisés", "Écran de conversion à fort impact"]
    }
  }
];
