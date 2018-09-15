Gui.Texture = function(width, height){
	this.width = width;
	this.height = height;
	this.data = new Uint8ClampedArray(4 * width * height);
};

Gui.Texture.prototype.setPixel = function(x, y, red, green, blue, alpha){
	let index = 4 * (x + y * this.width);
	if(alpha === undefined){
		alpha = 255;
	}
	this.data[index++] = red;
	this.data[index++] = green;
	this.data[index++] = blue;
	this.data[index] = alpha;
};

Gui.Texture.prototype.getPixel = function(x, y){
	let index = 4 * (x + y * this.width);
	return {
		red : this.data[index++],
		green : this.data[index++],
		blue : this.data[index++],
		alpha : this.data[index]
	};
};

Gui.Texture.prototype.fill = function(minX, minY, maxX, maxY, red, green, blue){
	let index;
	const width = maxX - minX + 1;
	for(let y = minY; y <= maxY; y++){
		index = 4 * (minX + y * this.width);
		for(let counter = 0; counter < width; counter++){
			this.data[index++] = red;
			this.data[index++] = green;
			this.data[index++] = blue;
			this.data[index++] = 255;
		}
	}
};

Gui.Texture.prototype.clear = function(red, green, blue){
	const length = this.data.length;
	for(let index = 0; index < length; index += 4){
		this.data[index] = red;
		this.data[index + 1] = green;
		this.data[index + 2] = blue;
		this.data[index + 3] = 255;
	}
};

Gui.Texture.prototype.render = function(context, minX, minY){
	const imageData = context.createImageData(this.width, this.height);
	const d = imageData.data;
	const length = this.data.length;
	for(let index = 0; index < length; index++){
		d[index] = this.data[index];
	}
	context.putImageData(imageData, minX, minY);
};