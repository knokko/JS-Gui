Gui.BackgroundComponent = function(baseColor, hoverColor, onClick){
	this.baseColor = baseColor;
	this.hoverColor = hoverColor || baseColor;
	this.click = onClick;
};

Gui.BackgroundComponent.prototype.render = function(renderer){
	if(this.state.isMouseOver()){
		renderer.clear(this.hoverColor);
	}
	else {
		renderer.clear(this.baseColor);
	}
};