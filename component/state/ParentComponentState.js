Gui.ParentComponentState = function(manager){
	this.manager = manager;
};

Gui.ParentComponentState.prototype.isMouseOver = function(){
	return this.manager.mouseX === this.manager.mouseX && this.manager.mouseY === this.manager.mouseY;
};

Gui.ParentComponentState.prototype.getMouseX = function(){
	return this.manager.mouseX;
};

Gui.ParentComponentState.prototype.getMouseY = function(){
	return this.manager.mouseY;
};

Gui.ParentComponentState.prototype.getManager = function(){
	return this.manager;
};