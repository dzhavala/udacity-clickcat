var model = {
	currentCat: null,
	cats: [
	{
		id: 1,
		picture: 'pics/cat_picture1.jpeg',
		clickCount: 0,
		name: 'Alex'
	},
	{
		id: 2,
		picture: 'pics/cat_picture2.jpeg',
		clickCount: 0,
		name: 'Bob'
	},
	{
		id: 3,
		picture: 'pics/cat_picture3.jpeg',
		clickCount: 0,
		name: 'Jimmy'
	},
	{
		id: 4,
		picture: 'pics/cat_picture4.jpeg',
		clickCount: 0,
		name: 'Jessica'
	},
	{
		id: 5,
		picture: 'pics/cat_picture5.jpeg',
		clickCount: 0,
		name: 'Marley'
	}
]};

var octo = {
	init: function(){
		adminView.init();
		detailsView.init();
		listView.init();
		this.setCurrentCat(1);
	},
	getAllCats: function(){
		return model.cats;
	},
	getCurrentCat: function(){
		return model.currentCat;
	},
	editCat: function(cat){
		$.extend(model.currentCat, cat);
		listView.render();
		detailsView.render();
	},
	setCurrentCat: function(id){
		model.currentCat = model.cats.filter(function(item){ return item.id == id})[0];
		listView.render();
		detailsView.render();
		adminView.hideForm();
	},
	incrementClicks: function() {
		model.currentCat.clickCount++;
		detailsView.render();
		adminView.hideForm();
	}
};

var listView = {
	init: function(){
		this.$container = $('#catlist');
		this.handleClicks();
	},
	handleClicks: function(){
		this.$container.on('click', 'button', function(evt){
			var id = $(evt.target).attr('id');
			octo.setCurrentCat(id);
		})
	},
	render: function(){
		var listStr = '';
		octo.getAllCats().forEach(function(cat){
			listStr += '<button id="'+ cat.id +'">' + cat.name + '</button>';
		});
		this.$container.html(listStr);
		var $currentItem = this.$container.find('#' + octo.getCurrentCat().id);
		$currentItem.addClass('active').siblings('button').removeClass('active');
	}
};

var detailsView = {
	init: function(){
		this.$container = $('#catDetails');
		this.handleCatClicks();
	},
	handleCatClicks: function() {
		this.$container.on('click', 'img', function(evt){
			octo.incrementClicks();
		});
	},
	render: function(){
		var cat = octo.getCurrentCat();
		var listStr = '<span class="name">'+ cat.name  +'</span>'+
					  '<span class="counter">'+ cat.clickCount +' clicks</span>'+
                      '<img data-id="'+ cat.id +'" src="'+ cat.picture +'">'
		this.$container.html(listStr);
	}
}

var adminView = {
	init: function(){
		this.$container = $('#admin');
		this.$editCatButton = this.$container.find('#editCatButton');
		this.$form = this.$container.find('#editform');
		this.$pictureInput = this.$form.find('input[name="picture"]');
		this.$nameInput = this.$form.find('input[name="name"]');
		this.$clicksInput = this.$form.find('input[name="clicks"]');
		this.$cancelButton = this.$form.find('input[value="Cancel"]');
		this.$saveButton = this.$form.find('input[value="Save"]');
		this.handleClicks();
	},
	handleClicks: function(){
		var that = this;
		this.$editCatButton.on('click', function(evt){
			that.showForm();
		});
		this.$cancelButton.on('click', function(evt){
			that.hideForm();
		});
		this.$saveButton.on('click', function(evt){
			that.validateForm();
		});
	},
	showForm: function(cat){
		var currentCat = octo.getCurrentCat();
		this.$pictureInput.val(currentCat.picture),
		this.$nameInput.val(currentCat.name)
		this.$clicksInput.val(currentCat.clickCount)
		this.$form.removeClass('hidden');
	},
	hideForm: function(){
		this.$pictureInput.val(''),
		this.$nameInput.val('')
		this.$clicksInput.val('')
		this.$form.addClass('hidden');
	},
	validateForm: function(){
		var isValid = true;
		if(!this.$pictureInput.val() || !this.$nameInput.val() || !this.$clicksInput.val()) {
			isValid = false;
		}
		if (!isValid) {
			alert('Please fill all fields');
		} else {
			this.saveForm();
		}
	},
	saveForm: function(){
		octo.editCat({
			picture: this.$pictureInput.val(),
			name: this.$nameInput.val(),
			clickCount: this.$clicksInput.val()
		});
		this.hideForm();
	}
};


octo.init();