const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const nav=$('.nav'), progress=$('.scroll-progress'), menu=$('.mobile-menu'), menuBtn=$('.menu-btn');

function updateScroll(){
  const y=window.scrollY, max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max>0?(y/max)*100:0)+'%';
  nav.classList.toggle('scrolled',y>30);
}
addEventListener('scroll',updateScroll,{passive:true}); updateScroll();

menuBtn?.addEventListener('click',()=>menu.classList.toggle('open'));
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})
},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

$$('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href'); if(!id||id==='#')return;
    const target=$(id); if(!target)return;
    e.preventDefault(); window.scrollTo({top:target.getBoundingClientRect().top+scrollY-65,behavior:'smooth'});
  })
});

const dot=$('.cursor-dot'), ring=$('.cursor-ring');
if(dot&&ring){
  let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px'});
  function follow(){rx+=(x-rx)*.15;ry+=(y-ry)*.15;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(follow)} follow();
  $$('a,button,.game-card,summary,.huge-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
  });
}

$$('.magnetic').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect(), dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
    el.style.transform=`translate(${dx*.08}px,${dy*.08}px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

$$('.game-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

const smoothAnchors=$$('.text-link,.line-link');
smoothAnchors.forEach(a=>a.addEventListener('click',()=>{}));

let last=0;
addEventListener('scroll',()=>{
  const y=scrollY;
  const art=$('.hero-art');
  if(art && innerWidth>900) art.style.transform=`translateY(${Math.min(y*.08,45)}px)`;
  last=y;
},{passive:true});
