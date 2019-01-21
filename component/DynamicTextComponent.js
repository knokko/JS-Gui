Gui.DynamicTextComponent = function(text, props, hoverProps, onClick){
	this.text = new Gui.DynamicSingleText(text, props);
	if (hoverProps){
		this.hoverText = new Gui.DynamicSingleText(text, hoverProps);
	} else {
		this.hoverText = this.text;
	}
	this.click = onClick;
};

Gui.DynamicTextComponent.prototype.init = function(){
	this.text.state = this.state;
	this.text.init();
	if (this.hoverText !== this.text){
		this.hoverText.state = this.state;
		this.hoverText.init();
	}
};

Gui.DynamicTextComponent.prototype.setText = function(newText){
	this.text.setText(newText);
	if (this.hoverText !== this.text){
		this.hoverText.setText(newText);
	}
};

Gui.DynamicTextComponent.prototype.setProps = function(newProps){
	this.text.setProps(newProps);
};

Gui.DynamicTextComponent.prototype.setHoverProps = function(newHoverProps){
	if (this.text !== this.hoverText){
		this.hoverText.setProps(newHoverProps);
	}
};

Gui.DynamicTextComponent.prototype.render = function(renderer){
	if (this.state.isMouseOver()){
		this.hoverText.render(renderer);
	} else {
		this.text.render(renderer);
	}
};

Gui.DynamicSingleText = function(text, props){
	this.text = text;
	this.props = props;
};

Gui.DynamicSingleText.prototype.updateTextureWidths = function(){
	let totalWidth = 0;
	const length = this.text.length;
	for (let index = 0; index < length; index++){
		if (this.textures[index] && this.textures[index].complete){
			totalWidth += this.textures[index].width;
		} else {
			return;
		}
	}
	if (totalWidth !== 0){
		this.xCoords = new Array(length + 1);
		let x = this.props.borderX + this.props.marginX;
		const widthFactor = 1 - 2 * (this.props.borderX + this.props.marginX);
		for (let index = 0; index < length; index++){
			this.xCoords[index] = x;
			x += widthFactor * this.textures[index].width / totalWidth;
			this.xCoords[index + 1] = x;
		}
		this.state.getManager().markDirty();
	} else {
		this.xCoords = null;
	}
}

Gui.DynamicSingleText.prototype.updateTextures = function(){
	const length = this.text.length;
	this.textures = new Array(length);
	for (let index = 0; index < length; index++){
		this.textures[index] = this.state.getManager().charBuilder.getTexture(this.text.charAt(index), this.props);
		this.markOnComplete(this.textures[index]);
	}

	this.minTextY = this.props.borderY + this.props.marginY;
	this.maxTextY = 1 - this.minTextY;
};

Gui.DynamicSingleText.prototype.markOnComplete = function(image){
	if (image) {
		const component = this;
		if (image.complete) {
			this.updateTextureWidths();
		} else {
			image.addEventListener('load', function(){
				component.updateTextureWidths();
			});
		}
	}
};

Gui.DynamicSingleText.prototype.init = function(){
	this.updateTextures();
};

Gui.DynamicSingleText.prototype.setText = function(newText){
	this.text = newText;
	this.updateTextures();
};

Gui.DynamicSingleText.prototype.setProps = function(newProps){
	this.props = newProps;
	this.updateTextures();
};

Gui.DynamicSingleText.prototype.render = function(renderer){
	renderer.clear(this.props.backgroundColor);
	renderer.fillRect(this.props.borderColor, 0, 0, 1, this.props.borderY);
	renderer.fillRect(this.props.borderColor, 0, 0, this.props.borderX, 1);
	renderer.fillRect(this.props.borderColor, 0, 1 - this.props.borderY, 1, 1);
	renderer.fillRect(this.props.borderColor, 1 - this.props.borderX, 0, 1, 1);
	if (this.xCoords) {
		for (let index = 0; index < this.textures.length; index++) {
			console.log('complete is ' + this.textures[index].complete + ' for index ' + index);
			renderer.renderImage(this.textures[index], this.xCoords[index], this.minTextY, this.xCoords[index + 1], this.maxTextY);
		}
	}
};