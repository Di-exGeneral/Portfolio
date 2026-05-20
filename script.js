const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',scrollY>60));

// ── HAMBURGER ──
document.getElementById('hamburger').addEventListener('click',()=>{
  const nl=document.querySelector('.nav-links');
  const open=nl.style.display==='flex';
  nl.style.cssText=open?'':'display:flex;flex-direction:column;position:absolute;top:64px;right:5vw;background:rgba(5,5,8,0.97);padding:1.5rem 2rem;border:1px solid rgba(0,245,255,0.2);border-radius:8px;backdrop-filter:blur(24px);gap:1.3rem;z-index:201';
});

// ── TERMINAL TYPEWRITER ──
const termLines=[
  {html:'<span class="tc"># profile.json</span>'},
  {html:'{'},
  {html:'&nbsp;&nbsp;<span class="tk">"name"</span>: <span class="ts">"Tlotliso Ledwaba"</span>,'},
  {html:'&nbsp;&nbsp;<span class="tk">"role"</span>: <span class="ts">"DevOps Engineer"</span>,'},
  {html:'&nbsp;&nbsp;<span class="tk">"location"</span>: <span class="ts">"Kimberley, ZA"</span>,'},
  {html:'&nbsp;&nbsp;<span class="tk">"focus"</span>: <span class="ts">"infra &amp; automation"</span>,'},
  {html:'&nbsp;&nbsp;<span class="tk">"stack"</span>: ['},
  {html:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="ts">"Linux"</span>, <span class="ts">"Docker"</span>, <span class="ts">"Git"</span>,'},
  {html:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="ts">"Bash"</span>, <span class="ts">"Python"</span>, <span class="ts">"Java"</span>,'},
  {html:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="ts">"Android"</span>, <span class="ts">"Flutter"</span>'},
  {html:'&nbsp;&nbsp;],'},
  {html:'&nbsp;&nbsp;<span class="tk">"status"</span>: <span class="tn">"open_to_work"</span>'},
  {html:'}<span class="cursor"></span>'},
];

const termBody=document.getElementById('termBody');
let lineIndex=0;
let loopTimer=null;

function typeLine(idx){
  if(idx>=termLines.length){
    // pause at end then restart
    loopTimer=setTimeout(()=>{
      termBody.innerHTML='';
      lineIndex=0;
      typeLine(0);
    },3500);
    return;
  }
  const span=document.createElement('div');
  span.innerHTML=termLines[idx].html;
  span.style.opacity='0';
  span.style.transform='translateX(-6px)';
  span.style.transition='opacity 0.18s ease, transform 0.18s ease';
  termBody.appendChild(span);
  // trigger reflow then animate in
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      span.style.opacity='1';
      span.style.transform='translateX(0)';
    });
  });
  lineIndex=idx+1;
  loopTimer=setTimeout(()=>typeLine(lineIndex),300);
}

typeLine(0);

// ── REVEAL ON SCROLL ──
const ro=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('visible'),i*65);});
},{threshold:0.07});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>ro.observe(el));

// ── SKILL BARS ──
const bo=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.bar').forEach(b=>{
        b.style.width=(parseFloat(b.dataset.w)*100)+'%';
        setTimeout(()=>b.classList.add('go'),100);
      });
    }
  });
},{threshold:0.22});
document.querySelectorAll('.skill-group').forEach(g=>bo.observe(g));

// ── CONTACT FORM ──
document.getElementById('send-btn').addEventListener('click',()=>{
  const n=document.getElementById('cf-name').value.trim();
  const e=document.getElementById('cf-email').value.trim();
  const m=document.getElementById('cf-msg').value.trim();
  if(!n||!e||!m){showToast('Please fill in all required fields.',true);return;}
  showToast("Message sent! I'll be in touch soon.");
  ['cf-name','cf-email','cf-subject','cf-msg'].forEach(id=>document.getElementById(id).value='');
});

// ── CV MODAL ──
const overlay = document.getElementById('cvOverlay');

document.getElementById('openCv').addEventListener('click', () => {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

document.getElementById('closeCv').addEventListener('click', () => {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── CV DOWNLOAD ──
document.getElementById('cvDownload').addEventListener('click', () => {
  contentWindow.print();
  //document.querySelector('.cv-frame').contentWindow.print();
});

// ── TOAST ──
function showToast(msg,err){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.style.borderColor=err?'rgba(255,80,80,0.4)':'rgba(0,245,255,0.3)';
  t.style.color=err?'#ff8080':'var(--accent)';
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}

// ── ACTIVE NAV ──
window.addEventListener('scroll',()=>{
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{if(scrollY>=s.offsetTop-220)cur=s.id;});
  document.querySelectorAll('.nav-links a').forEach(a=>{a.style.color=a.getAttribute('href')==='#'+cur?'var(--accent)':'';});
});