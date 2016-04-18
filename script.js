var ac = 10;//aceleracion de caida
var y1;//ubicacion vertical
var duracion = 0;//para los puntos
var colors = ["red", "blue", "yellow", "black", "green"];//colores la wea
var canvas;// canvas de html
var ctx;// contexto 2d canvas
var juego=true;// dice si se esta jugando
var tope;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
  canvas=$('#lienzo')[0];
  ctx=canvas.getContext("2d");
  //buffer para cargar el cosillo
  var buffer = document.createElement("canvas");
  buffer.width = canvas.width;
  buffer.height = canvas.height;
  contextoBuffer = buffer.getContext("2d");
	contextoBuffer.clearRect(0,0,670,500);
	contextoBuffer.fillStyle = "#ff0000";
	contextoBuffer.font = "bold 30px sans-serif";
	contextoBuffer.fillText("La wea la wea", 170, 230);
	ctx.clearRect(0,0,700,500);
	ctx.drawImage(buffer, 0, 0);
  $("#inicio").click(function(){
    ac = 3;
		duracion = 0;
    y1=50;
    tope=350;
    juego=true;
		run();
	});
}

function capturaTeclado(event){
	if(event.which==32)
		ac-=20;
}

function Bird(){
  this.img = $('#imagen')[0];
  this.height=35;
  this.width=30;
  this.dibujar = function(ctx){
    ctx.drawImage(this.img, 100, y1);
    ctx.save();
  }

  this.colision = function(x,y,w,h){
    if(100+this.width<x || x+h<100 || y1+this.height<y || y+h<y1){
      return false;
    }
    else{
      return true;
    }
  }

this.dentro_cubo = function(){
  if(y1>0 && y1+this.height<500)
    return true;
  return false;
}

}

function Bloque(col){
  this.color=col;
  this.dibujar=function(ctx, px, py, al){
    ctx.fillStyle=this.color;
    ctx.fillRect(px,py,100,al);
    ctx.save();
  }
}

function run(){
	var buffer = document.createElement("canvas");
	buffer.width = canvas.width;
	buffer.height = canvas.height;
	contextoBuffer = buffer.getContext("2d");
  if(juego){
    duracion++;
    var bird=new Bird();
    var bloques=[new Bloque(colors[Math.floor(Math.random() * 5)]),
      new Bloque(colors[Math.floor(Math.random() * 5)]),
      new Bloque(colors[Math.floor(Math.random() * 5)]),
      new Bloque(colors[Math.floor(Math.random() * 5)])];
    contextoBuffer.clearRect(0,0,670,500);
    bird.dibujar(contextoBuffer);
    for(i=0;i<4;i++){
      py=Math.floor(Math.random() * 300);
      bloques[i].dibujar(contextoBuffer, (tope +(i*110))%700, py, 500-py);
      if(bird.colision((tope +(i*110))%700, py,100, 500-py)){
        juego=false;
      }
    }
    if(juego){
      juego=bird.dentro_cubo();
    }
    tope-=5;
    if(tope<=0){
      tope=350;
    }
    y1+=ac;
    ac+=3;
    ctx.clearRect(0,0,670,500);
    ctx.drawImage(buffer, 0, 0);
    setTimeout("run()",200);
  }
  else{
    contextoBuffer.clearRect(0,0,700,500);
		contextoBuffer.font = "bold 50px sans-serif";
		contextoBuffer.fillText("GAME OVER", 180, 200);
		contextoBuffer.fillText("Duracion: "+duracion, 250, 250);
		ctx.clearRect(0,0,700,500);
		ctx.drawImage(buffer, 0, 0);
  }
}
