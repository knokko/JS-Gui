Gui.ConditionalTextComponent = function(text, props, hoverProps, clickAction, condition, fixedImageWidth, fixedImageHeight){
	this.text = text;
	this.props = props;
	this.hoverProps = hoverProps;
	this.click = function(x, y, button){
		if (this.condition()) {
			clickAction();
		}
	};
	this.condition = condition;
	this.fixedImageWidth = fixedImageWidth;
	this.fixedImageHeight = fixedImageHeight;
	this.refreshImages();
};

extendProtoType(Gui.TextComponent, Gui.ConditionalTextComponent);

Gui.ConditionalTextComponent.prototype.render = function(renderer){
	if (this.condition()) {
		Gui.ImageComponent.prototype.render.call(this, renderer);
	}
};