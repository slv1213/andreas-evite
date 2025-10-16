// Create falling snowflakes (free, no libraries)
(function makeSnow(){
  const snow = document.getElementById('snow');
  const FLAKES = 70; // adjust for more/less snow
  const GLYPHS = ['❄','✼','✻','✼','❅','❆'];
  for (let i=0;i<FLAKES;i++){
    const el = document.createElement('span');
    el.className = 'snowflake';
    el.textContent = GLYPHS[Math.floor(Math.random()*GLYPHS.length)];
    const size = 10 + Math.random()*16; // px
    const left = Math.random()*100;     // vw
    const dur = 9 + Math.random()*10;   // s
    const delay = Math.random()*-20;    // s (staggered start)
    el.style.left = left + 'vw';
    el.style.fontSize = size + 'px';
    el.style.animationDuration = dur + 's, ' + (4 + Math.random()*4) + 's';
    el.style.animationDelay = delay + 's, ' + (delay/2) + 's';
    snow.appendChild(el);
  }
})();

// Curtain open/close
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');

openBtn.addEventListener('click', () => {
  document.body.classList.add('open');
  // Trap focus on back card after opening for accessibility
  setTimeout(() => {
    try { document.querySelector('.back-card .btn').focus(); } catch(e){}
  }, 900);
});

closeBtn.addEventListener('click', () => {
  document.body.classList.remove('open');
  setTimeout(() => {
    try { document.getElementById('openBtn').focus(); } catch(e){}
  }, 700);
});

// Keyboard accessibility: Enter / Space on open button already works natively
