Gui.FullMenuSubComponent = function(menu, component){
	this.menu = menu;
	this.renderer = new Gui.StaticChildRenderer(undefined);
	this.component = component;
	this.initComponent();
};

Gui.FullMenuSubComponent.prototype.render = function(renderer){
	if(this.component.render){
		this.component.render(renderer);
	}
};

Gui.FullMenuSubComponent.prototype.setComponent = function(newComponent){
	this.component = newComponent;
	this.initComponent();
};

Gui.FullMenuSubComponent.prototype.initComponent = function(){
	const sub = this;
	this.component.state = new Gui.DynamicChildComponentState(function(){
		return sub.menu.state;
	}, this.getMinX, this.getMinY, this.getMaxX, this.getMaxY);
	if(this.component.init){
		this.component.init();
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

Gui.FullMenuSubComponent.prototype.getMinX = function(){
	return 0;
};

Gui.FullMenuSubComponent.prototype.getMinY = function(){
	return 0;
};

Gui.FullMenuSubComponent.prototype.getMaxX = function(){
	return 1;
};

Gui.FullMenuSubComponent.prototype.getMaxY = function(){
	return 1;
};