Gui.TextComponent = function(text, props, hoverProps, onClick, fixedImageWidth, fixedImageHeight){
	this.text = text;
	this.props = props;
	this.hoverProps = hoverProps;
	this.fixedImageWidth = fixedImageWidth;
	this.fixedImageHeight = fixedImageHeight;
	this.refreshImages();
	this.click = onClick;
};

extendProtoType(Gui.ImageComponent, Gui.TextComponent);

Gui.TextComponent.prototype.refreshImages = function(){
	this.refreshBaseImage();
	this.refreshHoverImage();
};

Gui.TextComponent.prototype.refreshBaseImage = function(){
	this.setBaseImage(this.createImage(this.text, this.props));
};

Gui.TextComponent.prototype.refreshHoverImage = function(){
	if(this.hoverProps){
		this.setHoverImage(this.createImage(this.text, this.hoverProps));
	}
	else {
		this.setHoverImage(undefined);
	}
};

Gui.TextComponent.prototype.createImage = function(text, props){
	return ImageFactory.createTextImage(text, props, this.fixedImageWidth || Math.max(60 * this.text.length, 64), this.fixedImageHeight || 128);
};

Gui.TextComponent.prototype.setText = function(text){
	this.text = text;
	this.refreshImages();
};

Gui.TextComponent.prototype.setProps = function(props){
	this.props = props;
	this.refreshBaseImage();
};

Gui.TextComponent.prototype.setHoverProps = function(props){
	this.hoverProps = props;
	this.refreshHoverImage();
};