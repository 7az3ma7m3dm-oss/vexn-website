const ring=document.querySelector('.cursor-ring'),dot=document.querySelector('.cursor-dot');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
function cursorLoop(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(cursorLoop)}cursorLoop();
document.querySelectorAll('a,.btn,.game-card,.menu-btn').forEach(el=>{
 el.addEventListener('mouseenter',()=>{ring.style.width='52px';ring.style.height='52px';ring.style.borderColor='rgba(255,255,255,.85)'});
 el.addEventListener('mouseleave',()=>{ring.style.width='34px';ring.style.height='34px';ring.style.borderColor='rgba(255,255,255,.5)'});
});
const menu=document.querySelector('.mobile-menu'),mb=document.querySelector('.menu-btn');
mb.addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

const progress=document.querySelector('.progress');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/max*100)+'%'},{passive:true});

const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
reveals.forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const t=document.querySelector(a.getAttribute('href')); if(!t)return;e.preventDefault();
 const start=scrollY,end=t.getBoundingClientRect().top+scrollY-70,d=end-start,dur=Math.min(1200,Math.max(500,Math.abs(d)*.45)),st=performance.now();
 const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
 function step(now){let p=Math.min(1,(now-st)/dur);scrollTo(0,start+d*ease(p));if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step);
}));
document.querySelectorAll('.magnetic').forEach(el=>{
 el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*.12}px,${(e.clientY-(r.top+r.height/2))*.12}px)`});
 el.addEventListener('mouseleave',()=>el.style.transform='');
});
