import Tilemap from './tilemap';
var tilemap = new Tilemap();
/** @module Player
  * A class representing the player.
  */
export default class Player {
  /** @constructor
    * Constructs a new player instance
    * @param {float} x - the player's x position
    * @param {float} y - the player's y position
    */
  constructor(x, y) {
    this.x = x;
    this.y = y;
	this.direction = 0;
	this.height = 32;
	this.width = 32;
	this.ball = new Image;
	this.ball.src = 'ballRightAnimation.png'
	this.currentFrame = 0;
	this.frameCount = 11;
	this.tickCount = 0;
	this.ticksPerFrame = 15;
	this.ballX = 0;
	this.ballY = 0;
	this.movingState = "idle";
  }


  /** @method update
    * Updates the player
    * @param {double} deltaT - the elapsed time
    * @param {Input} input - the input object
    */
  update(deltaT, input) {
	var pX = this.x;
	var pY = this.y;
	var dy = .15 * deltaT;
	var dx = .15 * deltaT

    if(input.keyPressed("ArrowLeft")){
		this.x -= dx;
		this.direction = 4;
		this.ball.src = 'ballLeftAnimation.png';
		this.movingState = "left";
	} 
    else if(input.keyPressed("ArrowRight")){
		this.x += dx;
		this.direction = 2;
		this.ball.src = 'ballRightAnimation.png'
		this.movingState = "right";
	} 
    else if(input.keyPressed("ArrowUp")){
		this.y -= dy;
		this.direction = 1;
		this.ball.src = 'ballUpAnimation.png'
		this.movingState = "up";
	} 
    else if(input.keyPressed("ArrowDown")){
		this.y += dy;
		this.direction = 3;
		this.ball.src = 'ballDownAnimation.png'
		this.movingState = "down";
	}
	else{
		this.movingState = "idle";
		//this.ball.src = 'ball_Idle.png'
	}
	if(this.x < 0){
		this.x = pX;
	}
	if(this.y < 0){
		this.y = pY;
	}
	if(this.x > 995){
		this.x = pX;
	}
	if(this.y > 738){
		this.y = pY;
	}
	
	var right =  Math.floor((this.x + 32) / 32);//right side collisions
	var down = Math.floor((this.y + 32) / 32) * 32; //bottom side collisions
	var tileIndex = right + down; //index of tile
	if(tileIndex < 740){
		if(tilemap.tiles[tileIndex].colorLoc === 2){
			this.x = pX;
			this.y = pY;
		}
	}
	if(this.x > 97 && this.y < 255){
		this.x = pX;
		this.y = pY;
	}
  }

  /** @method render
    * Renders the player
    * @param {double} deltaT - elapsed time
    * @param {Context2D} context - the rendering context
    */
  render(deltaT, context, tile) {
	context.clearRect(this.x, this.y, this.width, this.height);
	if(this.movingState != "idle"){
		this.currentFrame = ++this.currentFrame % this.frameCount;
		this.ballX = this.currentFrame * this.width;
	}
	context.drawImage(
	this.ball,
	this.ballX,
	this.ballY,
	this.width,
	this.height,
	this.x,
	this.y,
	this.width,
	this.height
	);

  }

}
