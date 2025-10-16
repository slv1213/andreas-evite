// SNOW (free, no libraries)
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

// Simple whoosh sound on open (Web Audio API)
function playWhoosh(){
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Create a short noise burst filtered for a "whoosh"
    const bufferSize = ctx.sampleRate * 0.5; // 0.5s
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i=0;i<bufferSize;i++){
      data[i] = (Math.random()*2-1) * (1 - i/bufferSize); // fade out
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    const gain = ctx.createGain();
    gain.gain.value = 0.2;

    const attack = 0.02, release = 0.45;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.7, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + release);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch(e) {
    // Fail silently if audio not allowed
  }
}

const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');

openBtn.addEventListener('click', () => {
  document.body.classList.add('open');
  playWhoosh();
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
