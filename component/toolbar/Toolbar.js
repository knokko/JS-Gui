Gui.Toolbar = function(upperText, upperProps, upperHoverProps, upperActiveProps, upperComponentHeight, minX, maxX){
	this.minX = minX;
	this.maxX = maxX;
	this.upperHeight = upperComponentHeight;
	this.upperComponent = new Gui.ActivatableTextComponent(upperText, props, hoverProps, activeProps, function(){
		this.active = !this.active;
		this.state.getManager().markDirty();
	}, function(){
		return this.active;
	});
	this.didInit = false;
	this.components = [];
};

Gui.Toolbar.prototype.init = function(){
	if(!this.didInit){
		this.addComponent(this.upperComponent, this.upperHeight);
		this.addComponents();
		this.didInit = true;
	}
};

Gui.Toolbar.prototype.update = function(){
	if(this.upperComponent.active){
		const length = this.components.length;
		for(let index = 0; index < length; index++){
			if(this.components[index].component.update){
				this.components[index].component.update();
			}
		}
	}
};

Gui.Toolbar.prototype.render = function(renderer){
	this.components[0].render(renderer);
	if(this.upperComponent.active){
		const length = this.components.length;
		for(let index = 1; index < length; index++){
			this.components[index].render(renderer);
		}
	}
};

Gui.Toolbar.prototype.click = function(x, y, button){
	this.components[0].click(x, y, button);
	if(this.upperComponent.active){
		const length = this.components.length;
		for(let index = 1; index < length; index++){
			this.components[index].click(x, y, button);
		}
	}
};

Gui.Toolbar.prototype.clickOut = function(button){
	const length = this.components.length;
	for(let index = 0; index < length; index++){
		if(this.components[index].component.clickOut){
			this.components[index].component.clickOut(button);
		}
	}
	if(this.upperComponent.active){
		this.upperComponent.active = false;
		this.state.getManager().markDirty();
	}
};

Gui.Toolbar.prototype.keyType = function(key){
	if(this.upperComponent.active){
		const length = this.components.length;
		for(let index = 0; index < length; index++){
			if(this.components[index].component.keyType){
				this.components[index].component.keyType(key);
			}
		}
	}
};

Gui.Toolbar.prototype.keyDown = function(key){
	if(this.upperComponent.active){
		const length = this.components.length;
		for(let index = 0; index < length; index++){
			if(this.components[index].component.keyDown){
				this.components[index].component.keyDown(key);
			}
		}
	}
};

Gui.Toolbar.prototype.keyUp = function(key){
	if(this.upperComponent.active){
		const length = this.components.length;
		for(let index = 0; index < length; index++){
			if(this.components[index].component.keyUp){
				this.components[index].component.keyUp(key);
			}
		}
	}
};

Gui.Toolbar.prototype.addComponent = function(component, height){
	this.components.push(new Gui.ToolbarSubComponent(this, component));
};