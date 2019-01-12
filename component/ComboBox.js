Gui.ComboBox = function(initialValue, props, hoverProps, heightPerValue, minX, maxX, maxY, values, onSelect){

	// Store bounds
	this.minX = minX;
	this.maxX = maxX;
	this.upperY = maxY - heightPerValue;
	this.heightPerValue = heightPerValue;

	// Create upper component
	this.upperComponent = new Gui.TextComponent(initialValue, props, hoverProps, function(){
		this.active = !this.active;
		this.state.getManager().markDirty();
	});
	this.upperComponent.clickOut = function(button){
		this.active = false;
		this.state.getManager().markDirty();
	};
	this.upperComponent.isActive = function(){
		return this.active;
	};
	this.upperComponent.active = false;

	// Add the components during the init
	this.props = props;
	this.hoverProps = hoverProps;
	this.onSelect = onSelect;
	this.values = values;
	this.didInit = false;
	this.components = [];
};

extendProtoType(Gui.Toolbar, Gui.ComboBox);

Gui.ComboBox.prototype.init = function(){

	// Only add the components once
	if (!this.didInit){
		const y = this.upperY;
		const height = this.heightPerValue;
		this.addComponent(this.upperComponent, height);

		// The upper component is special
		const subComponent = this.components[0];
		const minX = this.minX;
		const maxX = this.maxX;
		subComponent.maxX = this.maxX;
		subComponent.renderer.setBounds(minX, y, maxX, y + height);
		subComponent.component.state.setBounds(minX, y, maxX, y + height);
		subComponent.minY = y;
		subComponent.maxY = y + height;
		this.upperY = y;

		// Now add the other components
		const values = this.values;
		const length = values.length;
		const props = this.props;
		const hoverProps = this.hoverProps;
		const thisComboBox = this;
		for (let index = 0; index < length; index++){
			this.addComponent(new Gui.TextComponent(values[index], props, hoverProps, function(){
				thisComboBox.upperComponent.setText(this.text);
				thisComboBox.onSelect(this.text);
			}), height);
		}
		this.didInit = true;
	}
};