Gui.PasswordInputComponent = function(maxLength, props, focusProps){
	this.text = '';
	this.maxLength = maxLength;
	this.props = props;
	this.hoverProps = focusProps || props;
	this.refreshImages();
};

extendProtoType(Gui.TextInputComponent, Gui.PasswordInputComponent);

Gui.PasswordInputComponent.prototype.createImage = function(text, props){
	return ImageFactory.createTextImage(this.getMasked(text), props, 512, 128);
};

Gui.PasswordInputComponent.prototype.getMasked = function(text){
	let masked = '';
	while(masked.length < text.length){
		masked += '*';
	}
	return masked;
};