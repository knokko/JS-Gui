Gui.Toolbar = function(upperText, upperProps, upperHoverProps, upperActiveProps, upperComponentHeight, minX, maxX, upperMaxX, addComponents){
	this.minX = minX;
	this.maxX = maxX;
	this.upperMaxX = upperMaxX;
	this.upperY = 1 - upperComponentHeight;
	this.upperComponent = new Gui.ActivatableTextComponent(upperText, props, hoverProps, activeProps, function(){
		this.active = !this.active;
		this.state.getManager().markDirty();
	}, function(){
		return this.active;
	});
	this.didInit = false;
	this.addComponents = addComponents;
	this.components = [];
};

Gui.Toolbar.prototype.init = function(){
	if(!this.didInit){
		const y = this.upperY;
		this.addComponent(this.upperComponent, this.upperY);

		// The upper component is special
		this.components[0].maxX = this.upperMaxX;
		this.components[0].renderer.setBounds(this.minX, 1 - y, this.upperMaxX, 1);
		this.components[0].state.setBounds(this.minX, 1 - y, this.upperMaxX, 1);
		this.upperY = y;

		// Now add the other components
		this.addComponents();
		this.didInit = true;
	}
};

Gui.Toolbar.prototype.update = function(){
	if(this.upperComponent.isActive()){
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
	if(this.upperComponent.isActive()){
		const length = this.components.length;
		for(let index = 1; index < length; index++){
			this.components[index].render(renderer);
		}
	}
};

Gui.Toolbar.prototype.click = function(x, y, button){
	this.components[0].click(x, y, button);
	if(this.upperComponent.isActive()){
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
	if(this.upperComponent.isActive()){
		const length = this.components.length;
		for(let index = 0; index < length; index++){
			if(this.components[index].component.keyType){
				this.components[index].component.keyType(key);
			}
		}
	}
};

Gui.Toolbar.prototype.keyDown = function(key){
	if(this.upperComponent.isActive()){
		const length = this.components.length;
		for(let index = 0; index < length; index++){
			if(this.components[index].component.keyDown){
				this.components[index].component.keyDown(key);
			}
		}
	}
};

Gui.Toolbar.prototype.keyUp = function(key){
	if(this.upperComponent.isActive()){
		const length = this.components.length;
		for(let index = 0; index < length; index++){
			if(this.components[index].component.keyUp){
				this.components[index].component.keyUp(key);
			}
		}
	}
};

Gui.Toolbar.prototype.addComponent = function(component, height){
	this.components.push(new Gui.ToolbarSubComponent(this, component, height));
};