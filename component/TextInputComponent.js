Gui.TextInputComponent = function(startText, maxLength, props, focusProps){
	this.text = startText;
	this.maxLength = maxLength;
	this.props = props;
	this.hoverProps = focusProps || props;
	this.refreshImages();
};

extendProtoType(Gui.TextComponent, Gui.TextInputComponent);

Gui.TextInputComponent.prototype.click = function(x, y, button){
	this.focus = true;
	this.state.getManager().markDirty();
};

Gui.TextInputComponent.prototype.clickOut = function(button){
	this.focus = false;
	this.state.getManager().markDirty();
};

Gui.TextInputComponent.prototype.keyType = function(key){
	if(this.focus){
		const newText = this.text + key;
		if(newText.length <= this.maxLength){
			this.setText(newText);
		}
	}
};

Gui.TextInputComponent.prototype.createImage = function(text, props){
	return ImageFactory.createTextImage(text, props, 512, 128);
};

Gui.TextInputComponent.prototype.keyDown = function(key){
	if(this.focus && key === 'Backspace' && this.text.length > 0){
		this.setText(this.text.substring(0, this.text.length - 1));
	}
};

Gui.TextInputComponent.prototype.render = function(renderer){
	if(this.focus){
		renderer.renderImage(this.hoverImage, 0, 0, 1, 1);
	}
	else {
		renderer.renderImage(this.baseImage, 0, 0, 1, 1);
	}
};