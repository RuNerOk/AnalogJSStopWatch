var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1;
var m = 1;
var tm = 1;
var s = 0;
var ts = 0;
var ms = 0;
var show = true;
var init = 0;
var ii = 0;

function newLAP() {
} 

function startTIME() { 
var cdateObj = new Date(); 
var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 

if (t>999) { s++; } 

if (s>=(m*base)) { ts=0; 
m++; } else { 
ts=parseInt((ms/100)+s); 
if(ts>=base) { ts=ts-((m-1)*base); } } 

if (m>(h*base)) { tm=1; 
h++; } else { 
tm=parseInt((ms/100)+m); 
if(tm>=base) { tm=tm-((h-1)*base); } } 

ms = Math.round(t/10); 
if (ms>99) {ms=0;} 
if (ms==0) {ms='00';} 
if (ms>0&&ms<=9) { ms = '0'+ms; } 

if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; } 
dm=tm-1; 
if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; } 
dh=h-1; 
if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; } 

readout = dh + ':' + dm + ':' + ds + '.' + ms; 
if (show==true) { document.clockform.clock.value = readout; } 

clocktimer = setTimeout("startTIME()",1); }

function findTIME() { 
if (init==0) {	dateObj = new Date(); 
startTIME(); 
init=1; 
} else { if(show==true) { 
show=false;
clearTimeout(clocktimer);
h=1;m=1;tm=1;s=0;ts=0;ms=0;
init=0;show=true;
readout='00:00:00.00';
document.clockform.clock.value=readout;
var CF = document.clockform;
ii = 0;
} else { show=true;	} } };
//---------------------------------------------
var pi = 3.1415;
var radius = 100;
var positionX = 100;
var positionY = 300;
 
var dutyCycle_sec = 20;
var secArrowLength = 90;
var secChar = '.';
 
var dutyCycle_min = 20;
var minArrowLength = 60;
var minChar = ',';
 
function drawDial(){
    j=0;
    for(i=pi/6; i<2*pi+pi/6; i+=pi/6){
        document.getElementById('analogClock').innerHTML += "<div id=\"Dial_"+j+"\" style=\"position: absolute; top: "+(-Math.cos(i)*radius+positionY)+"px; left: "+(Math.sin(i)*radius+positionX)+"px;\">"+ (++j) +"</div>";
    }
}
function createArrows(){
    document.getElementById('secArrow').innerHTML = " "; 
    for(i=0; i<dutyCycle_sec; i++){
        document.getElementById('secArrow').innerHTML += "<div id=\"secArrow_"+i+"\" style=\"position: absolute; top: 10px; left: 10px;\" >"+secChar+"</div>";
    }
    document.getElementById('minArrow').innerHTML = " "; 
    for(i=0; i<dutyCycle_min; i++){
        document.getElementById('minArrow').innerHTML += "<div id=\"minArrow_"+i+"\" style=\"position: absolute; top: 10px; left: 10px;\" >"+minChar+"</div>";
    }
}
function setArrows(time_value){
    sec = time_value%60;
    sec *= pi/30;
    for(i=0; i<dutyCycle_sec; i++){
        document.getElementById('secArrow_'+i).style.left = (Math.sin(sec)*(secArrowLength/dutyCycle_sec)*i+positionX)+"px";
        document.getElementById('secArrow_'+i).style.top = (-Math.cos(sec)*(secArrowLength/dutyCycle_sec)*i+positionY)+"px";
    }
 
    min = time_value/60;
    min *= pi/30;
    for(i=0; i<dutyCycle_min; i++){
        document.getElementById('minArrow_'+i).style.left = (Math.sin(min)*(minArrowLength/dutyCycle_min)*i+positionX)+"px";
        document.getElementById('minArrow_'+i).style.top = (-Math.cos(min)*(minArrowLength/dutyCycle_min)*i+positionY)+"px";
    }
}
drawDial();
createArrows();
setArrows(0);
time=0;
setInterval('setArrows(time++);', 1000);