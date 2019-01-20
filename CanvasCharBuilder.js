Gui.CanvasCharBuilder = function(){
	this.charMap = {};
};

Gui.CanvasCharBuilder.prototype.createKey = function(char, props){
	return char + ':' + props.textColor + ':' + props.font;
};

Gui.CanvasCharBuilder.prototype.getTexture = function(char, props){
	const key = this.createKey(char, props);
	let value = this.charMap[key];
	if (value === undefined){
		value = ImageFactory.createCharImage(char, props);
		this.charMap[key] = value;
	}
	return value;
};