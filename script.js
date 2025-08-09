
/* script.js - interactivity for template */
document.addEventListener('DOMContentLoaded', ()=> {
  // simple smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // placeholder carousel (basic)
  const left = document.getElementById('carousel-left');
  const right = document.getElementById('carousel-right');
  const track = document.getElementById('carousel-track');
  if(left && right && track){
    let idx = 0;
    const slides = Array.from(track.children);
    function show(i){
      slides.forEach((s,si)=> s.style.display = si===i ? 'block' : 'none');
    }
    show(idx);
    left?.addEventListener('click', ()=>{ idx = (idx-1+slides.length)%slides.length; show(idx) });
    right?.addEventListener('click', ()=>{ idx = (idx+1)%slides.length; show(idx) });
  }
});

/* --- Active nav, dynamic bestiary cards, and image upload --- */
document.addEventListener('DOMContentLoaded', ()=> {
  // Highlight current nav link
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-bar .btn').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === here) a.classList.add('active');
  });

  // Helper: turn a File into data-URL and apply background
  function applyImageBox(box, file){
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      box.style.backgroundImage = `url(${reader.result})`;
      box.classList.add('has-img');
    };
    reader.readAsDataURL(file);
  }

  // Preload images from data-src if present
  document.querySelectorAll('.card .image, .level-card .img').forEach(box=>{
    const src = box.getAttribute('data-src');
    if(src){
      const img = new Image();
      img.onload = () => {
        box.style.backgroundImage = `url(${src})`;
        box.classList.add('has-img');
      };
      img.src = src;
    }
    const input = box.querySelector('input[type="file"]');
    if(input){
      input.addEventListener('change', e=> applyImageBox(box, e.target.files?.[0]));
      // Allow drag/drop
      ['dragenter','dragover'].forEach(ev=> box.addEventListener(ev, e=>{ e.preventDefault(); box.style.boxShadow='var(--glow)'; }));
      ['dragleave','drop'].forEach(ev=> box.addEventListener(ev, e=>{ e.preventDefault(); box.style.boxShadow=''; }));
      box.addEventListener('drop', e=> {
        const f = e.dataTransfer?.files?.[0];
        if(f) applyImageBox(box, f);
      });
    }
  });

  // Bestiary: add/remove cards
  const template = document.getElementById('card-template');
  document.querySelectorAll('.tier .add-card').forEach(btn=> {
    btn.addEventListener('click', ()=> {
      const section = btn.closest('.tier');
      if(!template || !section) return;
      const clone = template.content.firstElementChild.cloneNode(true);
      // wire up remove and upload
      const rm = clone.querySelector('.remove-card');
      rm.addEventListener('click', ()=> clone.remove());
      const box = clone.querySelector('.image');
      const input = box.querySelector('input[type="file"]');
      if(input) input.addEventListener('change', e=> applyImageBox(box, e.target.files?.[0]));
      section.querySelector('.cards').appendChild(clone);
      clone.scrollIntoView({behavior:'smooth', block:'center'});
    });
  });
  // Existing remove buttons
  document.querySelectorAll('.tier .card .remove-card').forEach(rm=> rm.addEventListener('click', ()=> rm.closest('.card').remove()));
});
