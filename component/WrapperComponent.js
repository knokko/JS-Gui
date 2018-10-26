Gui.WrapperComponent = function(component){
	this.component = component;
};

Gui.WrapperComponent.prototype.init = function(){
	if (this.component) {
		this.component.state = this.state;
		if (this.component.init) {
			this.component.init();
		}
	}
};

Gui.WrapperComponent.prototype.render = function(renderer){
	if (this.component) {
		this.component.render(renderer);
	}
};

Gui.WrapperComponent.prototype.update = function(){
	if(this.component && this.component.update){
		this.component.update();
	}
};

Gui.WrapperComponent.prototype.click = function(x, y){
	if(this.component && this.component.click){
		this.component.click(x, y);
	}
};

Gui.WrapperComponent.prototype.keyUp = function(key){
	if(this.component && this.component.keyUp){
		this.component.keyUp(key);
	}
};

Gui.WrapperComponent.prototype.keyDown = function(key){
	if(this.component && this.component.keyDown){
		this.component.keyDown(key);
	}
};

Gui.WrapperComponent.prototype.keyType = function(key){
	if(this.component && this.component.keyType){
		this.component.keyType(key);
	}
};

Gui.WrapperComponent.prototype.setComponent = function(component){
	this.component = component;
	this.init();
	this.state.getManager().markDirty();
};