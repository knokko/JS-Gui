Gui.ToolbarSubComponent = function(toolbar, component, height){
	this.minX = toolbar.minX;
	this.maxX = toolbar.maxX;
	this.maxY = toolbar.upperY;
	toolbar.upperY -= height;
	this.minY = toolbar.upperY;
	this.component = component;
	this.renderer = new Gui.StaticChildRenderer(null);
	this.renderer.setBounds(this.minX, this.minY, this.maxX, this.maxY);
	component.state = new Gui.StaticChildComponentState(toolbar.state);
	component.state.setBounds(this.minX, this.minY, this.maxX, this.maxY);
	if(component.init){
		component.init();
	}
};

Gui.ToolbarSubComponent.prototype.click = function(x, y, button){
	if(this.component.click || this.component.clickOut){
		if(x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY){
			if(this.component.click){
				this.component.click((x - this.minX) / (this.maxX - this.minX), (y - this.minY) / (this.maxY - this.minY), button);
			}
		}
		else if(this.component.clickOut){
			this.component.clickOut();
		}
	}
};

Gui.ToolbarSubComponent.prototype.render = function(renderer){
	if(this.component.render){
		this.renderer.parent = renderer;
		this.component.render(this.renderer);
	}
};