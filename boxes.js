$(document).ready(function(){
	/*
	var boxController = new BoxController({
		master: document.getElementById('tile-nav'),
		boxes: document.getElementById('tile-nav').getElementsByClassName('tile'),
		boxArea: 0.22,
		boxRatio: {
			height: 1,
			width: .8
		},
		boxPosition: {
			margin: .05
		},
		callback: tileController

	});
	*/
	//boxController.print();
});

function BoxController(settings){
	
	
	this.setBoxSize = function(){
		var masterHeight = this.height;
		var masterWidth = this.width;
		var masterArea = this.area;
				
		var ratio = settings.boxRatio.height / settings.boxRatio.width;
		
		var boxArea = masterArea * settings.boxArea;	
		
		var side = Math.sqrt(boxArea);
		var height = side * ratio;
		var width = side - height;		
		
		var top = height * settings.boxPosition.margin;
		var left = width * settings.boxPosition.margin;
		
		height -= (2 * top);
		width -= (2 * left);
		
		var row = 0;
		var col = 0;
		for(var i=0; i<this.boxes.length; i++){
	                if(typeof $(this.boxes[i]).attr('data-area') != 'undefined'){
	                	boxArea = masterArea * ( parseFloat($(this.boxes[i]).attr('data-area')) / 100 );
	                	
	                	var side = Math.sqrt(boxArea);
				var height = side * ratio;
				var width = side - height;

	                	top = height * settings.boxPosition.margin;
				left = width * settings.boxPosition.margin;
				
				height -= (2 * top);
				width -= (2 * left);
	                }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
			this.boxes[i].style.minHeight = height + "px";
			this.boxes[i].style.width = width + "px";
						
			this.boxes[i].style.top = (row * height) + "px";
			this.boxes[i].style.float = "left";
			this.boxes[i].style.margin = top + "px " + left + "px";
			
			col++;
			if(col == this.maxBoxesPerRow){
				row++;
				col = 0;
			}
		}
		
		settings.callback();
	}
	
	this.resize = function(){
		this.setHeight();
		this.setWidth();
		this.setArea();
		this.setBoxSize();
		this.print();
	}
	
	this.setHeight = function(){
		this.height = this.master.offsetHeight;
		return this.master.offsetHeight;
	}
	
	this.setWidth = function(){
		this.width = this.master.offsetWidth;
		return this.master.offsetWidth;
	}
	
	this.setArea = function(){
		var a = area(this.master);
		this.area = a;
		return a;
	}
	
	this.print = function(){
		console.log('------------------- box print -----------------------');
		console.log('master:\t',this.master);
		console.log('area: ' + this.area);
		console.log('boxes:\t',this.boxes);
		console.log('width: ' + this.width);
		console.log('height: ' + this.height);
		console.log('max per row : ' + this.maxBoxesPerRow);
		console.log('------------------- end box print -----------------------');
	}
	
	this.master = settings.master;
	this.boxes = settings.boxes;
	
	this.height = this.setHeight();
	this.width = this.setWidth();
	this.area = this.setArea();
	
	this.maxBoxesPerRow = Math.floor(1/settings.boxArea);
	this.setBoxSize();
	
	var t = this;
	$(window).resize(function(){
		t.resize();
	});
}

function area(element){
	var width = element.offsetWidth;
	var height = element.offsetHeight;
	
	return (width * height);
}

KICKER = 6.46226415094;
function tileController(){
	var tiles = [];
	tiles = $('#tile-nav').find('.tile');
	for(var i=0; i<tiles.length; i++){
		//set image line-height
		//set tile-description font size
		var h = $(tiles[i]).find('.tile-image').height();

		$(tiles[i]).find('.tile-image').css({
			'line-height' : h + 'px'
		});
		
		var w = $(tiles[i]).find('.tile-description').width();
		var fs = w/KICKER;
		$(tiles[i]).find('.tile-description h1').css({
			'font-size' : fs + 'px'
		});
	}
}