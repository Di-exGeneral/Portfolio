// Custom cursor
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '28px';
    cursor.style.height = '28px';
    cursor.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '14px';
    cursor.style.height = '14px';
    cursor.style.borderColor = 'var(--accent)';
  });
});

// Terminal typewriter
const lines = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'out', text: 'di-exgeneral' },
  { type: 'prompt', text: '$ cat skills.txt' },
  { type: 'out', text: 'Docker, Bash, Python, Git, Linux' },
  { type: 'prompt', text: '$ docker ps' },
  { type: 'out', text: 'CONTAINER ID   IMAGE         STATUS' },
  { type: 'out', text: 'a1b2c3d4e5f6   hydrowatch     Up 3 hours' },
  { type: 'prompt', text: '$ git log --oneline -1' },
  { type: 'out', text: 'c9f1a2b  Containerised Django app' },
  { type: 'prompt', text: '$ _' },
];

const output = document.getElementById('terminal-output');
let lineIndex = 0;
let charIndex = 0;
let isTyping = false;

function typeLine() {
  if (lineIndex >= lines.length) return;

  const line = lines[lineIndex];
  const span = document.createElement('span');
  span.className = `line ${line.type === 'prompt' ? 'prompt' : 'out'}`;
  output.appendChild(span);

  if (line.type === 'prompt') {
    typeChar(span, line.text, () => {
      lineIndex++;
      setTimeout(typeLine, 400);
    });
  } else {
    span.textContent = line.text;
    lineIndex++;
    setTimeout(typeLine, 200);
  }
}

function typeChar(el, text, cb) {
  let i = 0;
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (cb) setTimeout(cb, 300);
    }
  }, 45);
}

// Start terminal after short delay
setTimeout(typeLine, 800);

// Scroll fade-in for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .stack-category, .contact-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
