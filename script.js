
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
