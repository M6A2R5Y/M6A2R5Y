// Initialize Lucide Icons
lucide.createIcons();

// Live Time Clock
function updateTime() {
  const timeEl = document.getElementById('live-time');
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Git Contribution Grid Generator
const gridContainer = document.getElementById('git-contribution-grid');
const days = 28; // 4 weeks
for (let i = 0; i < days; i++) {
  const cell = document.createElement('div');
  cell.classList.add('git-cell');
  // Randomize contribution levels
  const level = Math.floor(Math.random() * 5);
  cell.classList.add(`level-${level}`);
  
  // Custom tooltips
  const dateStr = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  });
  cell.setAttribute('title', `${level === 0 ? 'No' : level * 2} commits on ${dateStr}`);
  gridContainer.appendChild(cell);
}

// Terminal Contents mapping
const terminalData = {
  'about_me.md': `- 🚀 I’m a Junior Software Engineer passionate about web apps.
- 🎓 Currently refining my craft in full-stack development and cloud tech.
- 💡 Believer in clean, readable, and well-tested code.
- 🎓 Learning TypeScript, Docker, and System Design.
- 🔍 Open to: junior dev roles, internships, and open-source contributions.`,
  
  'skills': `--- SYSTEM SKILLS REPORT ---
[Frontend]      HTML5, CSS3, JavaScript, TypeScript, React
[Backend]       Node.js, Express, Python
[Databases]     PostgreSQL, MongoDB
[Tools/Devops]  Git, Docker, GitHub Actions, Linux
----------------------------`,
  
  'projects': `commit 9a8b7c6d5e4f3 (HEAD -> main)
Author: Mary Kinyanjui <kinyanjuimary516@gmail.com>

    🎮 [Playverse] - 2.5D browser game map built with HTML Canvas.
    -> Repo: github.com/marykinyanjui/playverse

commit 1a2b3c4d5e6f7
Author: Mary Kinyanjui <kinyanjuimary516@gmail.com>

    📊 [DataStream Dashboard] - Real-time metrics visualization page.
    -> Repo: github.com/marykinyanjui/datastream`,
  
  'goals': `{
  "short_term": "Build robust open-source applications",
  "learning_roadmap": [
    "Advanced System Design",
    "TypeScript Masterclass",
    "Cloud Engineering"
  ],
  "long_term": "Contribute to large-scale developer frameworks"
}`
};

// Typewriter Effect
const outputEl = document.getElementById('terminal-output');
let typingTimeout;

function typeContent(text) {
  clearTimeout(typingTimeout);
  outputEl.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      outputEl.textContent += text.charAt(i);
      i++;
      typingTimeout = setTimeout(type, 8); // Speedy typing
    }
  }
  type();
}

// Default Content
typeContent(terminalData['about_me.md']);

// Terminal Tabs Interactive Click
const tabs = document.querySelectorAll('.terminal-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cmd = tab.getAttribute('data-cmd');
    typeContent(terminalData[cmd]);
  });
});

// Stitch Interactive Behavior
const stitchBubble = document.getElementById('stitch-bubble');
const stitchMouth = document.getElementById('stitch-mouth');
const stitchCharacter = document.getElementById('stitch-character');

const stitchQuotes = [
  "Ohana means family! And family means nobody gets left behind. 🌺",
  "Hmm... Need more JavaScript coffee! ☕",
  "Beep boop! Let's deploy some neat code today!",
  "Happy coding, Mary! You got this! ✨",
  "TS wizard is watching... strictly typed code only! 🧙‍♂️",
  "Hey, click me again! That was ticklish!"
];

stitchCharacter.addEventListener('click', () => {
  // Talk animation
  stitchMouth.setAttribute('d', 'M 85,124 Q 100,140 115,124'); // Open mouth
  const randomQuote = stitchQuotes[Math.floor(Math.random() * stitchQuotes.length)];
  stitchBubble.textContent = randomQuote;
  
  setTimeout(() => {
    stitchMouth.setAttribute('d', 'M 85,124 Q 100,128 115,124'); // Close mouth
  }, 1000);
});

// Stitch Eyes follow cursor
document.addEventListener('mousemove', (e) => {
  const pupilL = document.getElementById('pupil-l');
  const pupilR = document.getElementById('pupil-r');
  
  // Left eye position relative to page
  const eyeLRect = pupilL.getBoundingClientRect();
  const eyeL = { x: eyeLRect.left + 5, y: eyeLRect.top + 5 };
  
  // Right eye position relative to page
  const eyeRRect = pupilR.getBoundingClientRect();
  const eyeR = { x: eyeRRect.left + 5, y: eyeRRect.top + 5 };
  
  // Calculate offsets (max offset limit 3px)
  const maxOffset = 3.5;
  
  function getOffset(eye, mouse) {
    const dx = mouse.x - eye.x;
    const dy = mouse.y - eye.y;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(maxOffset, Math.sqrt(dx*dx + dy*dy) / 40);
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist
    };
  }
  
  const offsetL = getOffset(eyeL, { x: e.clientX, y: e.clientY });
  const offsetR = getOffset(eyeR, { x: e.clientX, y: e.clientY });
  
  pupilL.setAttribute('cx', (80 + offsetL.x).toString());
  pupilL.setAttribute('cy', (94 + offsetL.y).toString());
  
  pupilR.setAttribute('cx', (120 + offsetR.x).toString());
  pupilR.setAttribute('cy', (94 + offsetR.y).toString());
});

// Coffee Energy Management
const coffeeBar = document.getElementById('coffee-bar');
const coffeeText = document.getElementById('coffee-text');
const refillBtn = document.getElementById('refill-coffee-btn');
let currentEnergy = 85;

function drainEnergy() {
  if (currentEnergy > 10) {
    currentEnergy -= 1;
    updateEnergyBar();
  }
}
// Slowly drain energy over time
setInterval(drainEnergy, 15000);

function updateEnergyBar() {
  coffeeBar.style.width = `${currentEnergy}%`;
  coffeeText.textContent = `${currentEnergy}% Charged`;
  if (currentEnergy < 30) {
    coffeeBar.style.background = '#EF4444';
    stitchBubble.textContent = "Warning: Stitch needs coffee now! ☕😭";
  } else {
    coffeeBar.style.background = 'linear-gradient(90deg, var(--pastel-pink), var(--accent))';
  }
}

refillBtn.addEventListener('click', () => {
  currentEnergy = 100;
  updateEnergyBar();
  stitchBubble.textContent = "Yum! Stitch is fully energized! Let's code! ⚡";
});

// Interactive Bio Slider Control
const sliderCute = document.getElementById('slider-cute');
sliderCute.addEventListener('input', (e) => {
  const value = e.target.value;
  // Apply visual changes like rotating patches or scale based on cuteness slider
  const patches = document.querySelectorAll('.patch');
  patches.forEach(patch => {
    patch.style.transform = `scale(${value / 85}) translateY(${(value - 85) / 2}px)`;
  });
});
