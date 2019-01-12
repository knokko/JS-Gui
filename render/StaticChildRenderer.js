Gui.StaticChildRenderer = function(parent){
	this.parent = parent;
};

Gui.StaticChildRenderer.prototype.setBounds = function(minX, minY, maxX, maxY){
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
	this.width = maxX - minX;
	this.height = maxY - minY;
};

Gui.StaticChildRenderer.prototype.clear = function(color){
	this.parent.fillRect(color, this.minX, this.minY, this.maxX, this.maxY);
};

Gui.StaticChildRenderer.prototype.fillRect = function(color, minX, minY, maxX, maxY){
	this.parent.fillRect(color, this.minX + this.width * minX, this.minY + this.height * minY, this.minX + this.width * maxX, this.minY + this.height * maxY);
};

Gui.StaticChildRenderer.prototype.drawRect = function(color, minX, minY, maxX, maxY){
	this.parent.drawRect(color, this.minX + this.width * minX, this.minY + this.height * minY, this.minX + this.width * maxX, this.minY + this.height * maxY);
};

Gui.StaticChildRenderer.prototype.renderImage = function(image, minX, minY, maxX, maxY){
	this.parent.renderImage(image, this.minX + this.width * minX, this.minY + this.height * minY, this.minX + this.width * maxX, this.minY + this.height * maxY);
};

Gui.StaticChildRenderer.prototype.renderTexture = function(image, minX, minY, maxX, maxY, textureMinX, textureMinY, textureMaxX, textureMaxY){
	this.parent.renderTexture(image, this.minX + this.width * minX, this.minY + this.height * minY, this.minX + this.width * maxX, this.minY + this.height * maxY, textureMinX, textureMinY, textureMaxX, textureMaxY);
};