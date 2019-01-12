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

Gui.Texture.prototype.clone = function(){
	const clone = new Gui.Texture(this.width, this.height);
	javaArrayCopy(this.data, 0, clone.data, 0, this.data.length);
	return clone;
};

Gui.Texture.prototype.addSpaceLeft = function(extra){
	const newData = new Uint8ClampedArray((this.width + extra) * this.height * 4);
	for(let y = 0; y < this.height; y++){
		javaArrayCopy(this.data, 4 * y * this.width, newData, 4 * (extra + y * (this.width + extra)), this.width * 4);
	}
	this.width += extra;
	this.data = newData;
};

Gui.Texture.prototype.addSpaceRight = function(extra){
	const newData = new Uint8ClampedArray((this.width + extra) * this.height * 4);
	for(let y = 0; y < this.height; y++){
		javaArrayCopy(this.data, 4 * y * this.width, newData, 4 * y * (this.width + extra), this.width * 4);
	}
	this.width += extra;
	this.data = newData;
};

Gui.Texture.prototype.addSpaceUp = function(extra){
	const newData = new Uint8ClampedArray(this.width * (this.height + extra) * 4);
	javaArrayCopy(this.data, 0, newData, this.width * extra * 4, this.data.length);
	this.height += extra;
	this.data = newData;
};

Gui.Texture.prototype.addSpaceDown = function(extra){
	const newData = new Uint8ClampedArray(this.width * (this.height + extra) * 4);
	javaArrayCopy(this.data, 0, newData, 0, this.data.length);
	this.height += extra;
	this.data = newData;
};

Gui.Texture.prototype.render = function(context, minX, minY){
	const imageData = context.createImageData(this.width, this.height);
	javaArrayCopy(this.data, 0, imageData.data, 0, this.data.length);
	context.putImageData(imageData, minX, minY);
};

Gui.Texture.prototype.toImageData = function(data, minX, minY, maxX, maxY, dataWidth, ownMinX, ownMinY, ownMaxX, ownMaxY){
	if (ownMinX === undefined) ownMinX = 0;
	if (ownMinY === undefined) ownMinY = 0;
	if (ownMaxX === undefined) ownMaxX = this.width + 1;
	if (ownMaxY === undefined) ownMaxY = this.height + 1;
	const ownWidth = ownMaxX - ownMinX + 1;
	const ownHeight = ownMaxY - ownMinY + 1;
	const width = maxX - minX + 1;
	const height = maxY - minY + 1;
	for(let y = 0; y < height; y++){
		for(let x = 0; x < width; x++){
			let dataIndex = 4 * (minX + x + (minY + y) * dataWidth);
			let ownIndex = 4 * (Math.floor(ownMinX + x / width * ownWidth) + this.width * Math.floor(ownMinY + y / height * ownHeight));
			data[dataIndex++] = this.data[ownIndex++];
			data[dataIndex++] = this.data[ownIndex++];
			data[dataIndex++] = this.data[ownIndex++];
			data[dataIndex] = this.data[ownIndex];
		}
	}
};