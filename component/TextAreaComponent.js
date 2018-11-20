Gui.TextAreaComponent = function(text, props, hoverProps, onClick, width, height){
	this.text = text;
	this.props = props;
	this.hoverProps = hoverProps;
	this.width = width || 512;
	this.height = height || 256;
	this.refreshImages();
	this.click = onClick;
};

extendProtoType(Gui.TextComponent, Gui.TextAreaComponent);

Gui.TextAComponent.prototype.createImage = function(text, props){
	return ImageFactory.createTextAreaImage(text, props, this.width, this.height);
};