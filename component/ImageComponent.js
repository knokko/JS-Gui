Gui.ImageComponent = function(baseImage, hoverImage, onclick){
	this.baseImage = baseImage;
	this.hoverImage = hoverImage;
};

Gui.ImageComponent.prototype.render = function(renderer){
	if(this.hoverImage && this.state.isMouseOver()){
		renderer.renderImage(this.hoverImage, 0, 0, 1, 1);
	}
	else {
		renderer.renderImage(this.baseImage, 0, 0, 1, 1);
	}
};

Gui.ImageComponent.prototype.setBaseImage = function(image){
	this.baseImage = image;
	this.markOnComplete(image);
};

Gui.ImageComponent.prototype.setHoverImage = function(image){
	this.hoverImage = image;
	this.markOnComplete(image);
};

Gui.ImageComponent.prototype.markOnComplete = function(image){
	if (image) {
		const component = this;
		if (image.complete) {
			if (this.state) {
				this.state.getManager().markDirty();
			}
		} else {
			image.addEventListener('load', function(){
				if (component.state) {
					component.state.getManager().markDirty();
				}
			});
		}
	}
};