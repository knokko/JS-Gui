Gui.ActivatableTextComponent = function(text, props, hoverProps, activeProps, onClick, isActive, fixedImageWidth, fixedImageHeight){
	this.text = text;
	this.props = props;
	this.hoverProps = hoverProps;
	this.activeProps = activeProps;
	this.click = onClick;
	this.isActive = isActive;
	this.fixedImageWidth = fixedImageWidth;
	this.fixedImageHeight = fixedImageHeight;
	this.refreshImages();
};

extendProtoType(Gui.TextComponent, Gui.ActivatableTextComponent);

Gui.ActivatableTextComponent.prototype.refreshImages = function(){
	this.refreshBaseImage();
	this.refreshHoverImage();
	this.refreshActiveImage();
};

Gui.ActivatableTextComponent.prototype.refreshActiveImage = function(){
	this.setActiveImage(this.createImage(this.text, this.activeProps));
};

Gui.ActivatableTextComponent.prototype.setActiveImage = function(image){
	this.activeImage = image;
	this.markOnComplete(image);
};

Gui.ActivatableTextComponent.prototype.setActiveProps = function(props){
	this.activeProps = props;
	this.refreshActiveImage();
};

Gui.ActivatableTextComponent.prototype.render = function(renderer){
	if(this.isActive()){
		renderer.renderImage(this.activeImage, 0, 0, 1, 1);
	}
	else {
		if(this.hoverImage && this.state.isMouseOver()){
			renderer.renderImage(this.hoverImage, 0, 0, 1, 1);
		}
		else {
			renderer.renderImage(this.baseImage, 0, 0, 1, 1);
		}
	}
};