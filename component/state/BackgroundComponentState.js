Gui.BackgroundComponentState = function(parent){
	this.parent = parent;
};

Gui.BackgroundComponentState.prototype.isMouseOver = function(){
	return false;
};

Gui.BackgroundComponentState.prototype.getMouseX = function(){
	return NaN;
};

Gui.BackgroundComponentState.prototype.getMouseY = function(){
	return NaN;
};

Gui.BackgroundComponentState.prototype.getManager = function(){
	return this.parent.getManager();
};

Gui.BackgroundComponentState.prototype.getWidth = function(){
	return this.parent.getWidth();
};

Gui.BackgroundComponentState.prototype.getHeight = function(){
	return this.parent.getHeight();
};