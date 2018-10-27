Gui.StaticChildComponentState = function(parent){
	this.parent = parent;
};

Gui.StaticChildComponentState.prototype.setBounds = function(minX, minY, maxX, maxY){
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
};

Gui.StaticChildComponentState.prototype.isMouseOver = function(){
	const x = this.parent.getMouseX();
	const y = this.parent.getMouseY();
	return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
};

Gui.StaticChildComponentState.prototype.getMouseX = function(){
	return (this.parent.getMouseX() - this.minX) / (this.maxX - this.minX);
};

Gui.StaticChildComponentState.prototype.getMouseY = function(){
	return (this.parent.getMouseY() - this.minY) / (this.maxY - this.minY);
};

Gui.StaticChildComponentState.prototype.getManager = function(){
	return this.parent.getManager();
};

Gui.StaticChildComponentState.prototype.getWidth = function(){
	return Math.round((this.maxX - this.minX) * this.parent.getWidth());
};

Gui.StaticChildComponentState.prototype.getHeight = function(){
	return Math.round((this.maxY - this.minY) * this.parent.getHeight());
};