Gui.MenuSubComponent = function(menu, component, minX, minY, maxX, maxY){
	this.menu = menu;
	this.renderer = new Gui.StaticChildRenderer(undefined);
	this.component = component;
	this.component.state = new Gui.StaticChildComponentState(menu.state);
	if(this.component.init){
		this.component.init();
	}
	this.setBounds(minX, minY, maxX, maxY);
};

Gui.MenuSubComponent.prototype.render = function(renderer){
	if(this.component.render){
		this.renderer.parent = renderer;
		this.component.render(this.renderer);
	}
};

Gui.MenuSubComponent.prototype.click = function(x, y, button){
	if(this.component.click || this.component.clickOut){
		if(this.inBounds(x, y)){
			if(this.component.click){
				this.component.click((x - this.minX) / (this.maxX - this.minX), (y - this.minY) / (this.maxY - this.minY), button);
			}
		}
		else if(this.component.clickOut){
			this.component.clickOut(button);
		}
	}
};

Gui.MenuSubComponent.prototype.inBounds = function(x, y){
	return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
};

Gui.MenuSubComponent.prototype.setBounds = function(minX, minY, maxX, maxY){
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
	this.component.state.setBounds(minX, minY, maxX, maxY);
	this.renderer.setBounds(minX, minY, maxX, maxY);
};