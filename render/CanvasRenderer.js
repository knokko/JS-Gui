Gui.CanvasRenderer = function(){
	this.width = window.innerWidth;
	this.height = window.innerHeight;
};

Gui.CanvasRenderer.prototype.start = function(){
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext("2d");
	document.body.insertBefore(this.canvas,document.body.childNodes[0]);
	this.onResize();
};

Gui.CanvasRenderer.prototype.onResize = function(){
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Gui.CanvasRenderer.prototype.clear = function(color){
	this.context.fillStyle = color;
	this.context.fillRect(0, 0, this.width, this.height);
};

Gui.CanvasRenderer.prototype.fillRect = function(color, minX, minY, maxX, maxY){
	this.context.fillStyle = color;
	if(maxX >= 0 && maxY >= 0 && minX <= 1 && minY <= 1){
		this.context.fillRect(minX * this.width, (1 - maxY) * this.height, (maxX - minX) * this.width, (maxY - minY) * this.height);
	}
};

Gui.CanvasRenderer.prototype.drawRect = function(color, minX, minY, maxX, maxY){
	this.context.fillStyle = color;
	if(maxX >= 0 && maxY >= 0 && minX <= 1 && minY <= 1){
		this.context.strokeRect(minX * this.width, (1 - maxY) * this.height, (maxX - minX) * this.width, (maxY - minY) * this.height);
	}
};

Gui.CanvasRenderer.prototype.renderImage = function(image, minX, minY, maxX, maxY){
	if(maxX >= 0 && maxY >= 0 && minX <= 1 && minY <= 1){
		this.context.drawImage(image, minX * this.width, (1 - maxY) * this.height, (maxX - minX) * this.width, (maxY - minY) * this.height);
	}
};