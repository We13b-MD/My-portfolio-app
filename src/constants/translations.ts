export type Language = 'en' | 'es' | 'fr';

export interface TranslationDict {
  navAbout: string;
  navProjects: string;
  navSkills: string;
  navContact: string;
  
  heroBadge: string;
  heroGreeting: string;
  heroSub: string;
  heroDesc: string;
  heroCTA: string;
  heroResume: string;
  
  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  
  projectsTitle: string;
  projectsSub: string;
  projectsFilterAll: string;
  projectsFilterWeb: string;
  projectsFilterRich: string;
  projectsPlayText: string;
  projectsBackText: string;
  
  skillsTitle: string;
  skillsSub: string;
  skillsWebDev: string;
  skillsWebDesign: string;
  skillsRichMedia: string;
  
  contactTitle: string;
  contactSub: string;
  contactName: string;
  contactEmail: string;
  contactMsg: string;
  contactSend: string;
  contactSending: string;
  contactSuccess: string;
  contactError: string;
  
  whatsappFABTip: string;
  whatsappMessage: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    navAbout: "About",
    navProjects: "Projects",
    navSkills: "Skills",
    navContact: "Contact",
    
    heroBadge: "Available for Hire",
    heroGreeting: "I'm Idundun Michael",
    heroSub: "Web Developer & HTML5 Banner Developer",
    heroDesc: "I build responsive, lightning-fast web applications and high-impact interactive Rich Media ads. Combining clean code with creative execution to captivate audiences.",
    heroCTA: "Let's Connect",
    heroResume: "Download CV",
    
    aboutTitle: "About Me",
    aboutP1: "Hello! I am Idundun Michael, a passionate web developer and HTML5 banner developer dedicated to building immersive digital experiences. I bridge the gap between creative visual designs and powerful, performant code.",
    aboutP2: "I specialize in React, TypeScript, and Node.js for modern web apps, and custom high-fidelity animation scripting for advertising campaigns. I already built real-world solutions like an automated Clock-in system and a Fake Bank Alert Phishing detector to help users stay safe and efficient.",
    aboutP3: "In the digital advertising space, I construct premium interactive Rich Media creatives including Dynamic Creative Optimization (DCO) that instantly adapt to viewers. My designs are highly focused on performance, search engine visibility (SEO), and pixel-perfect transitions.",
    
    projectsTitle: "Featured Projects",
    projectsSub: "Explore live simulations and interactive previews of my work directly below. Adjust the width controls to test responsiveness in real-time.",
    projectsFilterAll: "All Projects",
    projectsFilterWeb: "Web Apps",
    projectsFilterRich: "Rich Media Ads",
    projectsPlayText: "Simulate Live",
    projectsBackText: "Back to Details",
    
    skillsTitle: "Core Expertise",
    skillsSub: "My tech stack and specialized design/development capabilities.",
    skillsWebDev: "Web Development",
    skillsWebDesign: "HTML5 Banner Design",
    skillsRichMedia: "Rich Media Ads (DCO, Gamified)",
    
    contactTitle: "Get In Touch",
    contactSub: "Have a project in mind or want to talk? Drop a message below and I will get back to you shortly.",
    contactName: "Your Name",
    contactEmail: "Email Address",
    contactMsg: "Your Message",
    contactSend: "Send Message",
    contactSending: "Sending...",
    contactSuccess: "Message sent successfully! Thank you.",
    contactError: "Failed to send message. Please try again or reach out on WhatsApp.",
    
    whatsappFABTip: "Chat with Michael",
    whatsappMessage: "Hi Michael, I visited your portfolio and would like to chat about a web development or rich media project!"
  },
  es: {
    navAbout: "Sobre Mí",
    navProjects: "Proyectos",
    navSkills: "Habilidades",
    navContact: "Contacto",
    
    heroBadge: "Disponible para Trabajar",
    heroGreeting: "Soy Idundun Michael",
    heroSub: "Desarrollador Web y de Banners HTML5",
    heroDesc: "Construyo aplicaciones web adaptables y ultrarrápidas, y anuncios interactivos Rich Media de alto impacto. Combinando código limpio con ejecución creativa para cautivar audiencias.",
    heroCTA: "Hablemos",
    heroResume: "Descargar CV",
    
    aboutTitle: "Sobre Mí",
    aboutP1: "¡Hola! Soy Idundun Michael, un desarrollador web y desarrollador de banners HTML5 apasionado por construir experiencias digitales inmersivas. Uno la brecha entre diseños visuales creativos y código potente y de alto rendimiento.",
    aboutP2: "Me especializo en React, TypeScript y Node.js para aplicaciones web modernas, y en scripts de animación personalizados para campañas publicitarias. Ya he creado soluciones reales como un sistema automático de fichaje de horas y un detector de alertas bancarias falsas para mantener a los usuarios seguros y eficientes.",
    aboutP3: "En el sector de la publicidad digital, construyo piezas creativas premium e interactivas de Rich Media, incluyendo la Optimización Creativa Dinámica (DCO) que se adapta al instante a los espectadores. Mis diseños están altamente enfocados en el rendimiento, la visibilidad en motores de búsqueda (SEO) y las transiciones perfectas.",
    
    projectsTitle: "Proyectos Destacados",
    projectsSub: "Explora simulaciones en vivo y vistas previas interactivas de mi trabajo directamente a continuación. Ajusta los controles de ancho para probar la adaptabilidad en tiempo real.",
    projectsFilterAll: "Todos",
    projectsFilterWeb: "Aplicaciones Web",
    projectsFilterRich: "Anuncios Rich Media",
    projectsPlayText: "Simular en Vivo",
    projectsBackText: "Volver a Detalles",
    
    skillsTitle: "Experiencia Principal",
    skillsSub: "Mi pila tecnológica y capacidades especializadas de diseño y desarrollo.",
    skillsWebDev: "Desarrollo Web",
    skillsWebDesign: "Diseño de Banners HTML5",
    skillsRichMedia: "Anuncios Rich Media (DCO, Gamificados)",
    
    contactTitle: "Ponte en Contacto",
    contactSub: "¿Tienes un proyecto en mente o quieres hablar? Envía un mensaje a continuación y te responderé en breve.",
    contactName: "Tu Nombre",
    contactEmail: "Correo Electrónico",
    contactMsg: "Tu Message",
    contactSend: "Enviar Mensaje",
    contactSending: "Enviando...",
    contactSuccess: "¡Mensaje enviado con éxito! Gracias.",
    contactError: "Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctame por WhatsApp.",
    
    whatsappFABTip: "Chatear con Michael",
    whatsappMessage: "¡Hola Michael, visité tu portafolio y me gustaría hablar sobre un proyecto de desarrollo web o rich media!"
  },
  fr: {
    navAbout: "À Propos",
    navProjects: "Projets",
    navSkills: "Compétences",
    navContact: "Contact",
    
    heroBadge: "Disponible pour Embauche",
    heroGreeting: "Je suis Idundun Michael",
    heroSub: "Développeur Web & Développeur de Bannières HTML5",
    heroDesc: "Je construis des applications web réactives et ultra-rapides ainsi que des publicités Rich Media interactives à fort impact. Allier code propre et exécution créative pour captiver le public.",
    heroCTA: "Discutons",
    heroResume: "Télécharger CV",
    
    aboutTitle: "À Propos de Moi",
    aboutP1: "Bonjour! Je suis Idundun Michael, un développeur web et développeur de bannières HTML5 passionné par la création d'expériences numériques immersives. Je fais le pont entre les conceptions visuelles créatives et un code performant.",
    aboutP2: "Je me spécialise dans React, TypeScript et Node.js pour les applications web modernes, ainsi que dans le scripting d'animations personnalisées pour les campagnes publicitaires. J'ai déjà construit des solutions concrètes comme un système de pointage automatisé et un détecteur d'alertes bancaires d'hameçonnage.",
    aboutP3: "Dans le domaine de la publicité numérique, je conçois des créations Rich Media interactives haut de gamme, y compris l'optimisation créative dynamique (DCO) qui s'adapte instantanément aux spectateurs. Mes conceptions sont axées sur la performance, le référencement (SEO) et les transitions parfaites.",
    
    projectsTitle: "Projets Vedettes",
    projectsSub: "Explorez des simulations en direct et des aperçus interactifs de mon travail ci-dessous. Ajustez les contrôles de largeur pour tester la réactivité en temps réel.",
    projectsFilterAll: "Tous",
    projectsFilterWeb: "Applications Web",
    projectsFilterRich: "Publicités Rich Media",
    projectsPlayText: "Simuler en Direct",
    projectsBackText: "Retour aux Détails",
    
    skillsTitle: "Expertise Clé",
    skillsSub: "Ma pile technique et mes compétences spécialisées en conception et développement.",
    skillsWebDev: "Développement Web",
    skillsWebDesign: "Design de Bannières HTML5",
    skillsRichMedia: "Publicités Rich Media (DCO, Gamifiées)",
    
    contactTitle: "Contactez-Moi",
    contactSub: "Vous avez un projet en tête ou souhaitez discuter ? Envoyez un message ci-dessous et je vous répondrai dans les plus brefs délais.",
    contactName: "Votre Nom",
    contactEmail: "Adresse E-mail",
    contactMsg: "Votre Message",
    contactSend: "Envoyer le Message",
    contactSending: "Envoi en cours...",
    contactSuccess: "Message envoyé avec succès ! Merci.",
    contactError: "Échec de l'envoi du message. Veuillez réessayer ou me contacter sur WhatsApp.",
    
    whatsappFABTip: "Discuter avec Michael",
    whatsappMessage: "Bonjour Michael, j'ai visité votre portfolio et j'aimerais discuter d'un projet web ou rich media !"
  }
};
