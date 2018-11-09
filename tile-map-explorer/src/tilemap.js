import Tilemap from '../tilemaps/fixedMap.json';

export default class TileMap {
	
	constructor(){
		this.tileset = new Image;
		this.tileset.src = 'fixedPiskel.png';
		this.tiles = [];
		this.tileSize = 32;
		var x = 0;
		var y = 0;
		for (var i = 0; i < Tilemap.layers[0].data.length; i++){
			if(i < 32){
				if(i === 0){
					y = 0;
					this.tiles.push({xPosition: x, //x of tile
					yPosition: y, //y of tile
					colorLoc: Tilemap.layers[0].data[i]});//color at array index
				}
				else{
					x = this.tileSize + x;
					y = 0;
					this.tiles.push({xPosition: x, yPosition: y, colorLoc: Tilemap.layers[0].data[i]});
				}
			}
			else if(i % 32 != 0){
				this.tiles.push({xPosition: x, yPosition: y, colorLoc: Tilemap.layers[0].data[i]});
				x = this.tileSize + x;
			}
			else{
				x = 0;
				y = this.tileSize + y;
				this.tiles.push({xPosition: x, yPosition: y, colorLoc: Tilemap.layers[0].data[i]});
				x = this.tileSize + x;
			}
			
		}
	}
	
	render(context){
			for(var i = 0; i < this.tiles.length; i++){
				context.drawImage(
				this.tileset, //image
			   (this.tiles[i].colorLoc - 1) * this.tileSize, // x
				0, //y
				this.tileSize, //tile width
				this.tileSize, //tile height
				this.tiles[i].xPosition, // tile's x
				this.tiles[i].yPosition, // tile's y
				this.tileSize, //tile width
				this.tileSize); //tile height
			}
	}	
}