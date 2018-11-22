Gui.ConditionalTextAreaComponent = function(text, props, hoverProps, onClick, condition, width, height){
	this.text = text;
	this.props = props;
	this.hoverProps = hoverProps;
	this.click = function(x, y, button){
		if (this.condition()) {
			onClick();
		}
	};
	this.condition = condition;
	this.width = width;
	this.height = height;
	this.refreshImages();
};

extendProtoType(Gui.TextAreaComponent, Gui.ConditionalTextAreaComponent);

Gui.ConditionalTextAreaComponent.prototype.render = function(renderer){
	if (this.condition()) {
		Gui.ImageComponent.prototype.render.call(this, renderer);
	}
};