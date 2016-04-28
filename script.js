var ac = 10;//aceleracion de caida
var y1;//ubicacion vertical
var vel;
var duracion = 0;//para los puntos
var colors = ["red", "blue", "yellow", "black", "green"];//colores la wea
var canvas;// canvas de html
var ctx;// contexto 2d canvas
var juego=false;// dice si se esta jugando
var bloques;
var it;

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
    ac = 0.222;
	duracion = 0;
	vel=1;
    y1=50;
    bloques=[];
    var ayuda=0;
    for(j=0;j<5;j++){
		ayuda=Math.floor(Math.random() * 200);
		bloques.push(new Bloque(colors[3], 210 + (j*150), 0, ayuda));
		ayuda+=150;
		bloques.push(new Bloque(colors[3], 210 + (j*150), ayuda, 500-ayuda));
	}
    if(juego==false){
		juego=true;
		run();
		$("#inicio").hide();
    }
	});
}

function capturaTeclado(event){
	if(event.which==32)
		vel-=(tiempoV(duracion/30));
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
    if(100+this.width<x || x+w<100 || y1+this.height<y || y+h<y1){
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

function Bloque(col, px, py, al){
	this.img=$('#pared')[0];
  this.color=col;
  this.pocX=px;
  this.pocY=py;
  this.alt=al;
  this.dibujar=function(ctx){
	  if(this.pocY<=0){
		  ctx.drawImage(this.img, this.pocX,this.alt-300);
	  }
	  else{
		ctx.drawImage(this.img, this.pocX,this.pocY);
	  }
    this.pocX-=1;
    if(this.pocX<=-100){
		this.pocX=670;
	}
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
    contextoBuffer.clearRect(0,0,670,500);
    bird.dibujar(contextoBuffer);
    for(i=0;i<10;i++){
      bloques[i].dibujar(contextoBuffer);
      if(bird.colision(bloques[i].pocX, bloques[i].pocY,80, bloques[i].alt)){
        juego=false;
      }
    }
    if(juego){
      juego=bird.dentro_cubo();
    }
	y1+=vel;
	vel+=ac;
    ctx.clearRect(0,0,670,500);
    ctx.drawImage(buffer, 0, 0);
	$("#vel").html("Tiempo: "+tiempo(duracion/30));
    setTimeout("run()",tiempo(duracion/30));
  }
  else{
    contextoBuffer.clearRect(0,0,700,500);
	contextoBuffer.font = "bold 50px sans-serif";
	contextoBuffer.fillText("GAME OVER", 180, 200);
	contextoBuffer.fillText("Duracion: "+duracion+" mg", 250, 250);
	ctx.clearRect(0,0,700,500);
	ctx.drawImage(buffer, 0, 0);
	$("#vel").html("");
	$("#inicio").show();
  }
}

function tiempo(x){
	return (10 + 10 / (1 + (Math.exp((x-20)/6))));
}

function tiempoV(x){
	return (5 + 2 / (1 + (Math.exp(-(x-15)/3))));
}
