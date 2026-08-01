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
if (sliderCute) {
  sliderCute.addEventListener('input', (e) => {
    const value = e.target.value;
    // Apply visual changes like rotating patches or scale based on cuteness slider
    const patches = document.querySelectorAll('.patch');
    patches.forEach(patch => {
      patch.style.transform = `scale(${value / 85}) translateY(${(value - 85) / 2}px)`;
    });
  });
}

// ==========================================================================
// Recruiter Mode Interactivity
// ==========================================================================

// ==========================================================================
// Recruiter Mode Interactivity: Cloud Architecture Simulator
// ==========================================================================

// Cloud Architecture System States
const systemState = {
  client: { active: true, label: "Client Browser", desc: "User agent rendering layout components and initiating WebSocket telemetry streams." },
  gateway: { active: true, label: "API Gateway", desc: "Routing gateway validating client sessions, sanitizing payloads, and mediating API traffic." },
  service: { active: true, label: "Web Engine", instances: 1, desc: "Asynchronous Node.js middleware engine executing backend business workflows." },
  db: { active: true, label: "NoSQL Store", instances: 1, desc: "MongoDB replication database handling transactional datasets and logs." }
};

let selectedNodeId = null;

// Latency Simulation Graph Data
let latencyValues = [45, 48, 42, 46, 44, 43, 47, 45, 44, 46, 42, 45, 43, 44, 47, 45, 42, 46, 44, 45];
const maxDataPoints = 20;

function drawLatencyGraph() {
  const chartPath = document.getElementById('latency-chart-path');
  const chartFill = document.getElementById('latency-chart-fill');
  const latencyValEl = document.getElementById('current-latency-val');
  
  if (!chartPath || !chartFill) return;

  const width = 500;
  const height = 100;
  const padding = 10;
  
  // Calculate current latency based on system health
  let activeLatency = 45;
  let isDown = false;
  let errorMsg = '';

  if (!systemState.gateway.active) {
    isDown = true;
    errorMsg = 'GATEWAY TIMEOUT (504)';
  } else if (!systemState.service.active) {
    isDown = true;
    errorMsg = 'ENGINE DOWN (503)';
  } else if (!systemState.db.active) {
    isDown = true;
    errorMsg = 'DB CONN ERROR (500)';
  }

  if (isDown) {
    activeLatency = 999;
    latencyValEl.textContent = errorMsg;
    latencyValEl.className = 'legend-value critical';
  } else {
    // Normal fluctuations with adjustments for scaling
    const serviceScale = systemState.service.instances;
    const dbScale = systemState.db.instances;
    
    // Scaling reduces response times under simulation load
    activeLatency = Math.max(15, 52 - (serviceScale * 5) - (dbScale * 4) + Math.floor(Math.random() * 8));
    latencyValEl.textContent = `${activeLatency}ms`;
    latencyValEl.className = 'legend-value';
  }

  // Push new value and shift array
  latencyValues.push(activeLatency);
  if (latencyValues.length > maxDataPoints) {
    latencyValues.shift();
  }

  // Generate SVG path coordinates
  const points = [];
  const xStep = width / (maxDataPoints - 1);
  const maxScaleVal = 120; // Max normal rendering height scale

  latencyValues.forEach((val, index) => {
    const renderVal = Math.min(val, 95); // cap visual peak to keep inside SVG bounds
    const x = index * xStep;
    const y = height - padding - ((renderVal / maxScaleVal) * (height - padding * 2));
    points.push(`${x},${y}`);
  });

  const pathD = `M ${points.join(' L ')}`;
  const fillD = `${pathD} L ${width},${height} L 0,${height} Z`;

  chartPath.setAttribute('d', pathD);
  chartFill.setAttribute('d', fillD);
}

// Periodically update the latency simulator graph
setInterval(drawLatencyGraph, 1500);

// Node Selection & Controls Binding
const archNodes = document.querySelectorAll('.arch-node');
const controlDefaultMsg = document.getElementById('control-default-msg');
const controlActivePanel = document.getElementById('control-active-panel');
const activeNodeTitle = document.getElementById('active-node-title');
const btnToggleNodeState = document.getElementById('btn-toggle-node-state');
const controlScaleGroup = document.getElementById('control-scale-group');
const scaleSlider = document.getElementById('scale-slider');
const scaleCountDisplay = document.getElementById('scale-count-display');
const btnPingNode = document.getElementById('btn-ping-node');

function selectNode(nodeId) {
  selectedNodeId = nodeId;
  const node = systemState[nodeId];
  
  // Toggle UI selection classes
  archNodes.forEach(n => {
    n.classList.remove('selected');
    if (n.getAttribute('data-node') === nodeId) {
      n.classList.add('selected');
    }
  });

  // Display control panel
  controlDefaultMsg.classList.add('hidden');
  controlActivePanel.classList.remove('hidden');
  
  activeNodeTitle.textContent = node.label;
  
  // Set Node State Buttons
  if (node.active) {
    btnToggleNodeState.textContent = 'Active (Online)';
    btnToggleNodeState.classList.remove('failed-state');
  } else {
    btnToggleNodeState.textContent = 'Failed (Offline)';
    btnToggleNodeState.classList.add('failed-state');
  }

  // Handle scaling sliders for Service and DB layers
  if (nodeId === 'service' || nodeId === 'db') {
    controlScaleGroup.classList.remove('hidden');
    scaleSlider.value = node.instances;
    scaleCountDisplay.textContent = node.instances;
  } else {
    controlScaleGroup.classList.add('hidden');
  }
}

// Bind clicks to nodes
archNodes.forEach(nodeEl => {
  nodeEl.addEventListener('click', () => {
    const nodeId = nodeEl.getAttribute('data-node');
    selectNode(nodeId);
  });
});

// Toggle status handler
if (btnToggleNodeState) {
  btnToggleNodeState.addEventListener('click', () => {
    if (!selectedNodeId) return;
    const node = systemState[selectedNodeId];
    node.active = !node.active;
    
    // Update node class
    const nodeEl = document.getElementById(`node-${selectedNodeId}`);
    if (node.active) {
      nodeEl.classList.remove('failed');
      nodeEl.classList.add('active');
    } else {
      nodeEl.classList.remove('active');
      nodeEl.classList.add('failed');
    }

    // Refresh control view state
    selectNode(selectedNodeId);
    drawLatencyGraph();
  });
}

// Scale Instance slider handler
if (scaleSlider && scaleCountDisplay) {
  scaleSlider.addEventListener('input', (e) => {
    if (!selectedNodeId) return;
    const val = parseInt(e.target.value);
    systemState[selectedNodeId].instances = val;
    scaleCountDisplay.textContent = val;
    drawLatencyGraph();
  });
}

// Diagnostic Ping Animations (Visual Packet Pulse Flow)
if (btnPingNode) {
  btnPingNode.addEventListener('click', () => {
    // Sequentially add glowing class to simulate a packet diagnostic flowing
    const sequence = ['client', 'gateway', 'service', 'db'];
    
    sequence.forEach((nodeId, idx) => {
      setTimeout(() => {
        const nodeEl = document.getElementById(`node-${nodeId}`);
        if (nodeEl) {
          nodeEl.classList.add('selected');
          setTimeout(() => {
            // Remove selection unless it is the currently configured node
            if (selectedNodeId !== nodeId) {
              nodeEl.classList.remove('selected');
            }
          }, 350);
        }
      }, idx * 400);
    });
    
    setTimeout(() => {
      showToast("Architecture diagnostic pulse completed!");
    }, sequence.length * 400);
  });
}

// Switch Views & Mode Selection
const btnCozy = document.getElementById('btn-cozy');
const btnRecruiter = document.getElementById('btn-recruiter');
const cozyView = document.getElementById('cozy-view');
const recruiterView = document.getElementById('recruiter-view');

function setViewMode(mode) {
  if (mode === 'recruiter') {
    btnCozy.classList.remove('active');
    btnRecruiter.classList.add('active');
    cozyView.classList.remove('active');
    recruiterView.classList.add('active');
    document.body.classList.add('theme-recruiter');
    
    // Render latency graph initially
    setTimeout(drawLatencyGraph, 100);
  } else {
    btnRecruiter.classList.remove('active');
    btnCozy.classList.add('active');
    recruiterView.classList.remove('active');
    cozyView.classList.add('active');
    document.body.classList.remove('theme-recruiter');
  }
  localStorage.setItem('portfolio-mode', mode);
  lucide.createIcons(); // Re-render Lucide icons dynamically
}

if (btnCozy && btnRecruiter) {
  btnCozy.addEventListener('click', () => setViewMode('cozy'));
  btnRecruiter.addEventListener('click', () => setViewMode('recruiter'));
}

// Restore saved preference
const savedMode = localStorage.getItem('portfolio-mode') || 'cozy';
setViewMode(savedMode);

// Q&A Accordion interactive toggle
const accordionTriggers = document.querySelectorAll('.accordion-trigger');
accordionTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const parent = trigger.parentElement;
    const content = parent.querySelector('.accordion-content');
    const isActive = parent.classList.contains('active');
    
    // Close other items
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.accordion-content').style.maxHeight = '0';
    });

    if (!isActive) {
      parent.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// Clipboard Toast Notification
const toastNotif = document.getElementById('toast-notif');
function showToast(message) {
  if (toastNotif) {
    toastNotif.textContent = message;
    toastNotif.classList.remove('hidden');
    toastNotif.style.opacity = '1';
    setTimeout(() => {
      toastNotif.style.opacity = '0';
      setTimeout(() => toastNotif.classList.add('hidden'), 300);
    }, 2500);
  }
}

// Copy Contact Helper
const copyContactBtn = document.getElementById('btn-copy-email-address');
if (copyContactBtn) {
  copyContactBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('kinyanjuimary516@gmail.com').then(() => {
      showToast('Email address copied to clipboard!');
    }).catch(() => {
      showToast('Failed to copy. kinyanjuimary516@gmail.com');
    });
  });
}

// Meeting modal controls
const btnScheduleChat = document.getElementById('btn-schedule-chat');
const meetingModal = document.getElementById('meeting-modal');
const btnCloseModal = document.getElementById('btn-close-modal');

if (btnScheduleChat && meetingModal) {
  btnScheduleChat.addEventListener('click', () => {
    meetingModal.classList.remove('hidden');
  });
}

if (btnCloseModal && meetingModal) {
  btnCloseModal.addEventListener('click', () => {
    meetingModal.classList.add('hidden');
  });
  
  // Close on background click
  meetingModal.addEventListener('click', (e) => {
    if (e.target === meetingModal) {
      meetingModal.classList.add('hidden');
    }
  });
}

// Outreach Template Email Builder
const btnGenerateOutreach = document.getElementById('btn-generate-outreach');
const selectCompany = document.getElementById('invite-company-select');
const outreachBox = document.getElementById('outreach-box');
const outreachContent = document.getElementById('outreach-text-content');
const btnCopyOutreach = document.getElementById('btn-copy-outreach');

if (btnGenerateOutreach && selectCompany && outreachBox && outreachContent) {
  btnGenerateOutreach.addEventListener('click', () => {
    const company = selectCompany.value;
    let template = '';
    
    if (company === 'Microsoft') {
      template = `Subject: Engineering Opportunity at Microsoft / Mary Kinyanjui

Dear Mary,

I am a recruiter at Microsoft. I came across your developer portfolio dashboard and was highly impressed by your coding standards, particularly your double-buffered Canvas rendering implementation and structured TypeScript testing suites.

We are currently looking for Junior Software Engineers who demonstrate strong frontend/systems design foundations. I'd love to schedule a quick 15-minute call to discuss how your skillset aligns with our team. 

Please let me know if you are available this week, or book directly via your Calendly scheduler link: https://calendly.com/kinyanjuimary516.

Best regards,
Microsoft Recruiting Team`;
    } else if (company === 'Google') {
      template = `Subject: Junior Software Engineer Outreach - Google

Hello Mary,

I am a technical sourcer at Google. I reviewed your dashboard portfolio page and was impressed by your clean code metrics (98% Clean Code Index) and WebSocket-based telemetry stream implementations.

Your solid understanding of system design, Docker containers, and CI/CD pipelines is exactly what we look for in our junior engineering pipelines.

Would you be open to a brief chat regarding opportunities within Google? Feel free to book a slot directly at your convenience: https://calendly.com/kinyanjuimary516.

Best regards,
Google Talent Acquisition`;
    } else {
      template = `Subject: Junior Developer Role / Technical Screening Invite

Hi Mary,

I am currently hiring junior software engineers and was super impressed by your interactive portfolio page. Your code quality explorer shows excellent engineering maturity.

I'd love to chat about potential opportunities in our tech stack. Let's arrange a brief introductory call this week, or book a time directly in my calendar: https://calendly.com/kinyanjuimary516.

Best,
Engineering Hiring Manager`;
    }
    
    outreachContent.textContent = template;
    outreachBox.classList.remove('hidden');
  });
}

if (btnCopyOutreach && outreachContent) {
  btnCopyOutreach.addEventListener('click', () => {
    navigator.clipboard.writeText(outreachContent.textContent).then(() => {
      showToast('Outreach email template copied!');
    });
  });
}

