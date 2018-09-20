Gui.FullMenuSubComponent = function(menu, component){
	this.menu = menu;
	this.renderer = new Gui.StaticChildRenderer(undefined);
	this.component = component;
	this.component.state = menu.state;
	if(this.component.init){
		this.component.init();
	}
};

Gui.FullMenuSubComponent.prototype.render = function(renderer){
	if(this.component.render){
		this.component.render(renderer);
	}
};

Gui.FullMenuSubComponent.prototype.click = function(x, y, button){
	if(this.component.click){
		this.component.click(x, y, button);
	}
};

Gui.FullMenuSubComponent.prototype.inBounds = function(x, y){
	return true;
};