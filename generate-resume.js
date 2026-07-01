import fs from 'fs';
import PDFDocument from 'pdfkit';

const doc = new PDFDocument({ margin: 40, size: 'A4' });
doc.pipe(fs.createWriteStream('public/Idundun_Michael_Resume.pdf'));

// Color palette
const PRIMARY_COLOR = '#111827'; // Dark charcoal
const ACCENT_COLOR = '#059669';  // Emerald Green
const TEXT_MUTED = '#4b5563';    // Cool grey

// 1. Header Section
doc.fillColor(PRIMARY_COLOR);
doc.font('Helvetica-Bold').fontSize(18).text('IDUNDUN MICHAEL DAMILARE', { align: 'center' });
doc.font('Helvetica').fontSize(11).fillColor(ACCENT_COLOR).text('Web Developer & HTML5 Banner Developer', { align: 'center' });
doc.moveDown(0.2);

doc.font('Helvetica').fontSize(7.8);
const part1 = 'Lagos, Nigeria  |  +2348132946210  |  ';
const email = 'idundunmd13@gmail.com';
const part2 = '  |  ';
const github = 'github.com/We13b-MD';
const part3 = '  |  ';
const portfolio = 'michaelidundun.vercel.app';

const totalWidth = 
  doc.widthOfString(part1) + 
  doc.widthOfString(email) + 
  doc.widthOfString(part2) + 
  doc.widthOfString(github) + 
  doc.widthOfString(part3) + 
  doc.widthOfString(portfolio);

const startX = (595.28 - totalWidth) / 2;

doc.fillColor(TEXT_MUTED).text(part1, startX, doc.y, { continued: true })
   .fillColor(ACCENT_COLOR).text(email, { link: 'mailto:idundunmd13@gmail.com', continued: true })
   .fillColor(TEXT_MUTED).text(part2, { link: null, continued: true })
   .fillColor(ACCENT_COLOR).text(github, { link: 'https://github.com/We13b-MD', continued: true })
   .fillColor(TEXT_MUTED).text(part3, { link: null, continued: true })
   .fillColor(ACCENT_COLOR).text(portfolio, { link: 'https://michaelidundun.vercel.app/' });
doc.moveDown(1);

// Helper for section titles
function addSectionTitle(title) {
  doc.moveDown(0.5);
  doc.fillColor(ACCENT_COLOR).font('Helvetica-Bold').fontSize(10.5).text(title.toUpperCase());
  
  // Draw a horizontal divider line below section title
  const y = doc.y;
  doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(40, y + 2).lineTo(555, y + 2).stroke();
  doc.moveDown(0.8);
}

// 2. Summary
doc.fillColor(PRIMARY_COLOR).font('Helvetica').fontSize(9).text(
  'Web Developer & HTML5 Banner Developer with experience building modern, responsive, and user-friendly web applications using React, TypeScript, JavaScript, HTML5, CSS3, Node.js, and Express.js. Passionate about creating clean, scalable solutions and integrating AI-assisted development workflows to improve productivity. Strong attention to detail, excellent communication skills, and committed to delivering high-quality software with a strong sense of urgency.',
  { align: 'left', lineGap: 3 }
);

// 3. Experience
addSectionTitle('Experience');

doc.fillColor(PRIMARY_COLOR).font('Helvetica-Bold').fontSize(9.5).text('New Tab, Lagos, Nigeria — Software Engineer');
doc.fillColor(TEXT_MUTED).font('Helvetica-Oblique').fontSize(8).text('June 2024 - PRESENT');
doc.moveDown(0.3);

doc.fillColor(PRIMARY_COLOR).font('Helvetica').fontSize(9);
const bulletPoints = [
  'Elevated Digital Tribe\'s creative output by producing interactive HTML5 rich media banners that drove higher engagement rates compared to standard static display ads.',
  'Reduced production turnaround time by establishing a structured workflow from brief receipt through final deployment across multiple simultaneous client campaigns.',
  'Strengthened client retention by delivering polished, brand-accurate rich media units for major FMCG brands including Nestlé, Jameson, and Indomie.',
  'Expanded the agency\'s rich media capabilities by introducing GSAP-powered animation techniques, enabling more complex and visually compelling ad experiences.',
  'Ensured 100% brand safety by deploying IAS (Integral Ad Science) tracking tags, Firewall skeleton frameworks, and viewability trackers across Outbrain, DV360, and CM360 served placements.',
  'Developed responsive and user-friendly web applications using modern frontend technologies (React, TypeScript, JavaScript).',
  'Built reusable React components, optimized application performance, and integrated REST APIs collaborating with designers and backend developers.'
];

bulletPoints.forEach(point => {
  doc.text(`•  ${point}`, { paragraphGap: 3, lineGap: 1.5 });
});

// 4. Education
addSectionTitle('Education');

doc.fillColor(PRIMARY_COLOR).font('Helvetica-Bold').fontSize(9.5).text('National Open University of Nigeria (NOUN), Lagos, Nigeria');
doc.fillColor(TEXT_MUTED).font('Helvetica-Oblique').fontSize(8).text('B.Sc Business Administration');
doc.moveDown(0.5);

doc.fillColor(PRIMARY_COLOR).font('Helvetica-Bold').fontSize(9.5).text('Udemy Academy');
doc.fillColor(TEXT_MUTED).font('Helvetica-Oblique').fontSize(8).text('Full Stack Web Development Certification');

// 5. Projects
addSectionTitle('Projects');

const projects = [
  {
    name: 'Fake Bank Alert Detector (FBA Detector)',
    desc: 'A React-based cybersecurity utility that simulates and analyzes bank transaction alerts, flagging phishing and fraud heuristics.'
  },
  {
    name: 'Employee Clocking System (MikiClock)',
    desc: 'An automated attendance and productivity SaaS dashboard tracking employee shifts, breaks, and CSV reports.'
  },
  {
    name: 'Conference Ticket Generator',
    desc: 'A dynamic, high-fidelity ticket generation application with drag-and-drop avatar uploads and instant PDF downloads.'
  }
];

projects.forEach(project => {
  doc.fillColor(PRIMARY_COLOR).font('Helvetica-Bold').fontSize(9.5).text(project.name);
  doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(8.5).text(project.desc, { paragraphGap: 4, lineGap: 1.5 });
});

// 6. Skills
addSectionTitle('Skills');

doc.fillColor(PRIMARY_COLOR).font('Helvetica').fontSize(9).text(
  'Frontend: React, TypeScript, JavaScript, HTML5, CSS3, CSS Variables, Responsive Design\n' +
  'Backend & Tools: Node.js, Express.js, Git, GitHub, REST APIs, VS Code\n' +
  'Deployment: Vercel, Netlify, Hostinger, AWS\n' +
  'AI & Prompting: Prompt engineering, workflow automation, Claude, ChatGPT, DeepSeek, Cursor, Antigravity IDE\n' +
  'Soft Skills: Honest, dependable, communication, strong problem-solving, team collaboration, time management, sense of urgency',
  { lineGap: 3 }
);

// 7. Awards & Certifications
addSectionTitle('Certifications & Awards');
doc.fillColor(PRIMARY_COLOR).font('Helvetica').fontSize(9).text(
  '•  Full Stack Web Development Certificate (Udemy Academy)\n' +
  '•  HTML & CSS Specialist Google Web Designer credentials\n' +
  '•  100% IAS Compliance Campaign Certification (Digital Tribe)',
  { lineGap: 3 }
);

// 8. Languages
addSectionTitle('Languages');
doc.fillColor(PRIMARY_COLOR).font('Helvetica').fontSize(9).text(
  'English (Fluent), Yoruba (Native)',
  { lineGap: 3 }
);

// Finalize document
doc.end();
console.log('PDF Resume generated successfully at public/Idundun_Michael_Resume.pdf!');
