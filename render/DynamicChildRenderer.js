Gui.DynamicChildRenderer = function(parent, minX, minY, maxX, maxY){
	this.parent = parent;
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
};

Gui.DynamicChildRenderer.prototype.width = function(){
	return this.maxX() - this.minX();
};

Gui.DynamicChildRenderer.prototype.height = function(){
	return this.maxY() - this.minY();
};

Gui.DynamicChildRenderer.prototype.clear = function(color){
	this.parent().fillRect(color, this.minX(), this.minY(), this.maxX(), this.maxY());
};

Gui.DynamicChildRenderer.prototype.fillRect = function(color, minX, minY, maxX, maxY){
	this.parent().fillRect(color, this.minX() + this.width() * minX, this.minY() + this.height() * minY, this.minX() + this.width() * maxX, this.minY() + this.height() * maxY);
};

Gui.DynamicChildRenderer.prototype.drawRect = function(color, minX, minY, maxX, maxY){
	this.parent().drawRect(color, this.minX() + this.width() * minX, this.minY() + this.height() * minY, this.minX() + this.width() * maxX, this.minY() + this.height() * maxY);
};

Gui.DynamicChildRenderer.prototype.renderImage = function(image, minX, minY, maxX, maxY){
	this.parent().renderImage(image, this.minX() + this.width() * minX, this.minY() + this.height() * minY, this.minX() + this.width() * maxX, this.minY() + this.height() * maxY);
};

Gui.DynamicChildRenderer.prototype.renderTexture = function(image, minX, minY, maxX, maxY, textureMinX, textureMinY, textureMaxX, textureMaxY){
	this.parent().renderTexture(image, this.minX() + this.width() * minX, this.minY() + this.height() * minY, this.minX() + this.width() * maxX, this.minY() + this.height() * maxY, textureMinX, textureMinY, textureMaxX, textureMaxY);
};