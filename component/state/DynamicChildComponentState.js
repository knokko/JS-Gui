Gui.DynamicChildComponentState = function(parent, minX, minY, maxX, maxY){
	this.parent = parent;
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
};

Gui.DynamicChildComponentState.prototype.isMouseOver = function(){
	const x = this.parent().getMouseX();
	const y = this.parent().getMouseY();
	return x >= this.minX() && x <= this.maxX() && y >= this.minY() && y <= this.maxY();
};

Gui.DynamicChildComponentState.prototype.getMouseX = function(){
	const minX = this.minX();
	return (this.parent().getMouseX() - minX) / (this.maxX() - minX);
};

Gui.DynamicChildComponentState.prototype.getMouseY = function(){
	const minY = this.minY();
	return (this.parent().getMouseY() - minY) / (this.maxY() - minY);
};

Gui.DynamicChildComponentState.prototype.getManager = function(){
	return this.parent().getManager();
};