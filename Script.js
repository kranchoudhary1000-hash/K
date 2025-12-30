const loader = document.getElementById("loader");
const app = document.getElementById("app");
const chat = document.getElementById("chat");
const status = document.getElementById("status");
const music = document.getElementById("music");

setTimeout(()=>{
  loader.style.display="none";
  app.classList.remove("hidden");
},2500);

const msgs=[
 "Hey 👋",
 "Tumhe ek baat batani thi…",
 "Tum jab se meri life me aaye ho 💫",
 "Sab kuch beautiful lagne laga hai 😍",
 "Aur haan…",
 "I really really like you ❤️"
];

let i=0;

function typing(){
  status.innerText="typing...";
  setTimeout(()=>status.innerText="online",700);
}

function addMsg(text){
  typing();
  setTimeout(()=>{
    const div=document.createElement("div");
    div.className="msg me";
    div.innerText=text;
    chat.appendChild(div);
  },700);
}

function start(){
  if(i<msgs.length){
    addMsg(msgs[i]);
    i++;
    setTimeout(start,1600);
  }else{
    setTimeout(()=>{
      document.getElementById("proposal").classList.remove("hidden");
      music.play();
    },1200);
  }
}
setTimeout(start,1200);

/* YES */
function yes(){
  document.getElementById("proposal").classList.add("hidden");
  document.getElementById("final").classList.remove("hidden");
  fireworks();
}

/* FIREWORKS */
const canvas=document.getElementById("fx");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;
let p=[];

function fireworks(){
  setInterval(()=>{
    for(let i=0;i<80;i++){
      p.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*3+1,
        dx:Math.random()*4-2,
        dy:Math.random()*4-2
      });
    }
  },350);
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  p.forEach((e,i)=>{
    ctx.beginPath();
    ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
    ctx.fillStyle="rgba(255,0,150,.8)";
    ctx.fill();
    e.x+=e.dx;
    e.y+=e.dy;
    e.r-=0.04;
    if(e.r<=0)p.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();
