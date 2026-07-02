// Particles
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const color = (window.PARTICLE_COLOR || '0,212,255');
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  function Particle(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;this.r=Math.random()*1.5+.5;this.alpha=Math.random()*.5+.1;}
  function initParticles(){particles=[];const n=Math.floor(W*H/14000);for(let i=0;i<n;i++)particles.push(new Particle());}
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<particles.length;i++){
      const p=particles[i];p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(${color},${p.alpha})`;ctx.fill();
      for(let j=i+1;j<particles.length;j++){const q=particles[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(${color},${.12*(1-d/120)})`;ctx.lineWidth=.5;ctx.stroke();}}
    }
    requestAnimationFrame(draw);
  }
  resize();initParticles();draw();
  window.addEventListener('resize',()=>{resize();initParticles();});
}

// Fade-in observer
const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');});},{threshold:.1});
document.querySelectorAll('.fade-in').forEach(e=>obs.observe(e));
