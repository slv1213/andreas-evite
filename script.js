// ====== Falling Snow (no libraries) ======
(function makeSnow(){
  const snow = document.getElementById('snow');
  if (!snow) return;
  const FLAKES = 70; // adjust for more/less snow
  const GLYPHS = ['❄','✼','✻','✼','❅','❆'];

  for (let i = 0; i < FLAKES; i++){
    const el = document.createElement('span');
    el.className = 'snowflake';
    el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

    const size  = 10 + Math.random() * 16;  // px
    const left  = Math.random() * 100;      // vw
    const dur   = 9 + Math.random() * 10;   // s
    const delay = Math.random() * -20;      // s (staggered start)

    el.style.left = left + 'vw';
    el.style.fontSize = size + 'px';
    el.style.animationDuration = dur + 's, ' + (4 + Math.random()*4) + 's';
    el.style.animationDelay = delay + 's, ' + (delay/2) + 's';

    snow.appendChild(el);
  }
})();

// ====== Optional "whoosh" sound when opening ======
function playWhoosh(){
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const bufferSize = ctx.sampleRate * 0.5; // 0.5s burst
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // white noise with quick fade-out envelope
    for (let i = 0; i < bufferSize; i++){
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise  = ctx.createBufferSource(); noise.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1200;
    const gain   = ctx.createGain();

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.7, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch(e) {
    // If audio is blocked (e.g., some iPhones), just skip sound.
  }
}

// ====== Curtain open/close logic ======
const openBtn  = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');

if (openBtn){
  openBtn.addEventListener('click', () => {
    document.body.classList.add('open');       // triggers CSS to slide curtains
    playWhoosh();                               // fun sound on open
    // Move focus to first action on back for accessibility
    setTimeout(() => {
      const firstBtn = document.querySelector('.back-card .btn');
      if (firstBtn) firstBtn.focus();
    }, 900);
  });
}

if (closeBtn){
  closeBtn.addEventListener('click', () => {
    document.body.classList.remove('open');    // brings the front card back
    setTimeout(() => {
      const opener = document.getElementById('openBtn');
      if (opener) opener.focus();
    }, 700);
  });
}
