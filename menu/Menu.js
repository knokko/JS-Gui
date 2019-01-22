Gui.Menu = function(backgroundColor, addComponents){
	this.backgroundColor = backgroundColor;
	this.addComponents = addComponents;
	this.didInit = false;
	this.components = [];
};

Gui.Menu.prototype.init = function(){
	if(!this.didInit){
		this.addComponents();
		this.didInit = true;
	}
};

Gui.Menu.prototype.addComponent = function(component, minX, minY, maxX, maxY){
	const subComponent = new Gui.MenuSubComponent(this, component, minX, minY, maxX, maxY);
	this.components.push(subComponent);
	return subComponent;
};

Gui.Menu.prototype.addFullComponent = function(component){
	const subComponent = new Gui.FullMenuSubComponent(this, component);
	this.components.push(subComponent);
	return subComponent;
};

Gui.Menu.prototype.update = function(){
	for(let index in this.components){
		if(this.components[index].component.update){
			this.components[index].component.update();
		}
	}
};

Gui.Menu.prototype.render = function(renderer){
	renderer.clear(this.backgroundColor);
	for(let index in this.components){
		this.components[index].render(renderer);
	}
};

Gui.Menu.prototype.click = function(x, y, button){
	for(let index in this.components){
		this.components[index].click(x, y, button);
	}
};

Gui.Menu.prototype.clickOut = function(button){
	for(let index in this.components){
		if(this.components[index].component.clickOut){
			this.components[index].component.clickOut(button);
		}
	}
};

Gui.Menu.prototype.scroll = function(amount){
	for (let index in this.components){
		if (this.components[index].component.scroll){
			this.components[index].component.scroll(amount);
		}
	}
}

Gui.Menu.prototype.keyType = function(key){
	for(let index in this.components){
		if(this.components[index].component.keyType){
			this.components[index].component.keyType(key);
		}
	}
};

Gui.Menu.prototype.keyDown = function(key){
	for(let index in this.components){
		if(this.components[index].component.keyDown){
			this.components[index].component.keyDown(key);
		}
	}
};

Gui.Menu.prototype.keyUp = function(key){
	for(let index in this.components){
		if(this.components[index].component.keyUp){
			this.components[index].component.keyUp(key);
		}
	}
};