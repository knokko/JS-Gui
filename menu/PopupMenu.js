Gui.PopupMenu = function(background, foreground, minX, minY, maxX, maxY){
	this.background = background;
	this.foreground = foreground;
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
	this.renderer = new Gui.StaticChildRenderer(null);
	this.renderer.setBounds(minX, minY, maxX, maxY);
};

Gui.PopupMenu.prototype.init = function(){
	this.background.init();
	this.foreground.init();
};

Gui.PopupMenu.prototype.update = function(){
	this.foreground.update();
};

Gui.PopupMenu.prototype.render = function(renderer){
	this.background.render(renderer);
	renderer.fillRect('rgba(0, 0, 0, 100)', 0, 0, 1, 1);
	this.renderer.parent = renderer;
	this.foreground.render(this.renderer);
};

Gui.PopupMenu.prototype.click = function(x, y, button){
	if(x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY){
		this.foreground.click((x - this.minX) / (this.maxX - this.minX), (y - this.minY) / (this.maxY - this.minY), button);
	} else {
		this.foreground.clickOut(button);
	}
};

Gui.PopupMenu.prototype.clickOut = function(button){
	this.foreground.clickOut(button);
};

Gui.PopupMenu.prototype.keyType = function(key){
	this.foreground.keyType(key);
};

Gui.PopupMenu.prototype.keyDown = function(key){
	this.foreground.keyDown(key);
};

Gui.PopupMenu.prototype.keyUp = function(key){
	this.foreground.keyUp(key);
};