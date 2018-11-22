Gui.Manager = function(){
	this.mainComponent = null;
	this.renderer = null;
	this.guiState = null;
	this.totalTickTime = 0;
	this.ticks = 0;
	this.mouseX = NaN;
	this.mouseY = NaN;
	this.mouseDown = false;
	this.dirty = true;
};

Gui.Manager.prototype.markDirty = function(){
	this.dirty = true;
};

Gui.Manager.prototype.start = function(){
	this.renderer = new Gui.CanvasRenderer();
	this.renderer.start();
	const manager = this;
	this.guiState = new Gui.ParentComponentState(this);
	this.mainComponent.state = this.guiState;
	if(this.mainComponent.init){
		this.mainComponent.init();
	}
	window.addEventListener('click', function(event){
		if(manager.mainComponent.click){
			manager.mainComponent.click(event.pageX / window.innerWidth, 1 - event.pageY / window.innerHeight);
		}
	});
	window.addEventListener('mousemove', function(event){
		manager.mouseX = event.pageX / window.innerWidth;
		manager.mouseY = 1 - event.pageY / window.innerHeight;
		manager.markDirty();
	});
	window.addEventListener('mousedown', function(event){
		manager.mouseDown = true;
	});
	window.addEventListener('mouseup', function(event){
		manager.mouseDown = false;
	});
	window.addEventListener('mouseenter', function(event){
		manager.mouseX = event.pageX / window.innerWidth;
		manager.mouseY = 1 - event.pageY / window.innerHeight;
		manager.markDirty();
	});
	window.addEventListener('mouseleave', function(event){
		manager.mouseX = NaN;
		manager.mouseY = NaN;
		manager.markDirty();
	});
	window.addEventListener('resize', function(event){
		manager.renderer.onResize();
		manager.markDirty();
	});
	window.addEventListener('keypress', function(event){
		if(event.key.length === 1 && manager.mainComponent.keyType){
			manager.mainComponent.keyType(event.key);
		}
	});
	window.addEventListener('keydown', function(event){
		if(manager.mainComponent.keyDown){
			manager.mainComponent.keyDown(event.key);
		}
		if(event.key === 't'){
			console.log('Average tick time is ' + (manager.totalTickTime / manager.ticks) + ' ms');
		}
	});
	window.addEventListener('keyup', function(event){
		if(manager.mainComponent.keyUp){
			manager.mainComponent.keyUp(event.key);
		}
	});
	const onGuiUpdate = function(timestamp){
		const startTime = performance.now();
		if(manager.mainComponent.update){
			manager.mainComponent.update();
		}
		if(manager.dirty){
			manager.mainComponent.render(manager.renderer);
			manager.dirty = false;
		}
		manager.totalTickTime += performance.now() - startTime;
		manager.ticks++;
		window.requestAnimationFrame(onGuiUpdate);
	};
	window.requestAnimationFrame(onGuiUpdate);
};

Gui.Manager.prototype.setMainComponent = function(component){
	this.mainComponent = component;
	if(this.renderer && component.init){//the renderer will be undefined until the manager has started
		component.state = this.guiState;
		component.init();
	}
	this.markDirty();
};