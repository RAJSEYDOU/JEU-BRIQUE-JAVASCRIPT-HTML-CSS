


const canvas= document.querySelector('.canvas')
const ctx=canvas.getContext("2d")


//

// FRUICE :BRICKS
let fruice=[] 
let color=["blue","yellow","white","green","purple","orange"]

let randomColor=Math.floor(Math.random()*6)
// USERPANEL

let userPanel={
	X:10,
	Y:145,
	W:100,
	H:5
}
// BALL
let ball={
	X:10,
	Y:100,
	R:5,
	VELOCITY_X:5,
	VELOCITY_Y:5
}




// FUNCTION DRAW RECTANGLE
function drawRect(x,y,w,h,color){
ctx.fillStyle=color
 ctx.fillRect(x,y,w,h)  

}

// FUNCTION DRAW CIRCLE(BALL)
function DrawCircle(x,y,r,color){

	ctx.fillStyle=color
	ctx.beginPath()
	ctx.arc(x,y,r,0,Math.PI*2,false)
	ctx.closePath()
	ctx.fill()
}

// CALL FRUICE
createFruice()
// CREATE ARRAY OF FRUICE FRUICE[][]={X,Y}
function createFruice(){
// FIVE 5 ROWS
	for (i=0;i<6;i++){
		fruice[i]=[]
	// 6 COLUMS
		for(j=1;j<6;j++){
			fruice[i][j]={
				// MARGINLEFT=10
				// X POSITION DEFINED BY ROWS
				X:50*i+10,
				Y:10*j,
				W:20,
				H:5,
				status:true
			}
			

			
		}
	}
}


// DRAW FRUICE ON SCREEN 4ROWS && 3 COLUMS
function drawFruice(){
	// 6 ROWS
for (i=0;i<6;i++){
		// 6 COLUMS
		for(j=1;j<6;j++){
			// SHOW ALL FRUICE WHICH HAVE STATUS TRUE
			if(fruice[i][j].status){
				// DRAW FRUICE 
				drawRect(fruice[i][j].X,fruice[i][j].Y,fruice[i][j].W,fruice[i][j].H,color[randomColor+j])
			}
			

			}
			

			
		}
	}

// CHECKING IF HITTING FRUICE

function HitFruice(){
	// 6 ROWS
	for (i=0;i<6;i++){
		// 6 COLUMS
		for(j=1;j<6;j++){
			// CURRENT FRUICE
			
			b=fruice[i][j]
// IF CURRENT.STATUS=TRUE 
			if(b.status){
				// AND IF COLLISION BETWEEN CURRENT FRUICE AND BALL
				if(collision(b,ball)){
					// SET  CURRENT FRUICE.STATUS=FALSE
					// SO IT'S NOT GONNA BE SHOWING ON SCREEN
					b.status=false;
				}
			}
			

			}
			

			
		}
	}








// SHOWING BACKGROUND,BALL,FRUICE,USERPANEL
function draw(){

document.addEventListener('mousemove',moveUserPanel)



drawRect(0,0,400,400,"black")
ctx.fillStyle="black"
drawRect(userPanel.X,userPanel.Y,userPanel.W,userPanel.H,"white")
DrawCircle(ball.X,ball.Y,ball.R,"white")
// DRAWING FRUICE A NESTED LOOP
drawFruice()


// MOVING USERPANEL
//0<PANELX<CANVAS.WIDTH
function moveUserPanel(event){
	// CURSOR ON USERPANELMIDDLE
	userPanel.X=event.clientX-100
// IF USER PANEL<=0 USERPANEL.X=0
	if(userPanel.X<=0 ){
	//  SET USERPANEL.X=0
		userPanel.X=0

	// IF USER PANEL>=400 USERPANEL.X=400
	}else if( userPanel.X+userPanel.W>=canvas.width){
		// SET USERPANEL TO CANVAS.WIDTH
		userPanel.X=canvas.width-userPanel.W
	}
	

}

}
// MOVING BALL

function ballMove(){
	// GO RIGHT AND TOP
	ball.X+=ball.VELOCITY_X
	ball.Y-=ball.VELOCITY_Y
	
// IF BALL HIT Y=0
	if(ball.Y-ball.R<=0){
		// SET VELOCITY Y=POSITIF VALUE
		ball.VELOCITY_Y=-ball.VELOCITY_Y
	}
	// IF BALL HIT X>CANVAS.WIDTH
	 else if(ball.X+ball.R>canvas.width){
       // SET VELOCITY X=NEGATIF VALUE
		ball.VELOCITY_X=-ball.VELOCITY_X
// IF BALL HIT X>CANVAS.HEIGHT
	}else if(ball.Y+ball.R>canvas.height){
      // SET VELOCITY X=POSITIF VALUE
      ball.VELOCITY_Y=-ball.VELOCITY_Y 
		
	}
	// IF BALL HIT X<0
	else if(ball.X-ball.R<=0){
	// SET VELOCITY X=POSITIF VALUE
     ball.VELOCITY_X=-ball.VELOCITY_X
		
	}
	
}
// FUNCTION DETECT COLLISION

function collision(P,B){
     // LEFT-RIGHT, BAS-TOP ,DROITE-LEFT,TOP-BOTTOM
     //   
     return B.X-B.R <=P.X+P.W && B.X+B.R >= P.X && B.Y-B.R<=P.Y+P.H && B.Y+B.R>P.Y
}
// 
// 
// GLOBAL FUNCTION
// 
// 

function global(){
// CONTROL PANEL
	// CHECKING FOR COLLISION
	if(collision(userPanel,ball)){
	ball.VELOCITY_Y=-ball.VELOCITY_Y
	}
	ballMove()
	draw()
	// COLLISION FRUICE AND BALL
	HitFruice()
}





let timer=setInterval(global,50)