$(window).load(function(){

	// colors fit page on tall screens
	setHeight();

	$( window ).resize(function() {
		setHeight();
	});

	function setHeight(){

		// color boxes
		if ($(window).height() > 875) {
			var hColor = ($(window).height() - 200) / 9;
			$('.color').height(hColor);
		} 
		else {
			$('.color').height(75);
		}

		// overlay
		var ovH = $(document).height();
		$('.overlay').height(ovH);
	}

	// close modal window
	$('.close--modal').click(function() {
		$('.modal').addClass('hidden--1');

		setTimeout(function() {
			var w = $('.modal').width();
			var h = $('.modal').height();
			

			$('.modal').width(w).height(h);
			$('.modal').addClass('hidden--2');
			$('.overlay').addClass('hidden');
		}, 600);


		setTimeout(function() {
			$('.modal').remove();
		}, 1000)
	});

	/* For quick copy-paste */
    $('input').focus(function(){this.select();});

    var pickerColor = $('#colorPicker').val();
    pickerColor = pickerColor.substring(1);
    $('#color').val(pickerColor);

    $('#colorPicker').minicolors();

    drawColors($('#color'));

    /* Change color on every color picker input. */
    $('#colorPicker').change(function(){ 
		var pickerColor = $('#colorPicker').val();
	    pickerColor = pickerColor.substring(1);
	    $('#color').val(pickerColor);
	    drawColors($('#color'));
	}); 

	/* Change color on every key input. */
	$('#color').bind('blur keydown', function (event) {
		drawColors(this);

		var inputColor = $('#color').val();
	    inputColor = '#' + inputColor;
	    $('#colorPicker').val(inputColor);
	});

	function drawColors(el) {
		setTimeout(function () {

			var hex = $(el).val(),
			    colors = fibonator(hex),
			    leftCounter = 0,
			    rightCounter = 0;

			$( ".left .color" ).each(function() {
				leftCounter ++;
				var colorLeft = colors.left[leftCounter];
			    $( this ).css('backgroundColor', colorLeft);

			    // input color name
			    $(this).empty();
			    $(this).append('<p>'+colorLeft+'</p>');
			});

			$( ".right .color" ).each(function() {
				rightCounter ++;
				var colorRight = colors.right[rightCounter];
			    $( this ).css('backgroundColor', colorRight);

			    // input color name
			    $(this).empty();
			    $(this).append('<p>'+colorRight+'</p>');
			});


			$('#color').css('borderColor', '#' + hex);

	    }, 13);
	}

	//returns an array of colors
	function fibonator(hex) {
		var colors = {};
		colors.left = [];
		colors.right = [];		 

		for (var i = 0; i < 10; i++) {
			
			var lum;

			switch (i) {
				case 0:
					lum = 2;
					break;
				case 1: 
					lum =  3;
					break;
				case 2: 
					lum = 5;
					break;
				case 3: 
					lum = 8; 
					break;
				case 4:
					lum = 13;
					break;
				case 5:
					lum = 21;
					break;
				case 6:
					lum = 34;
					break;
				case 7:
					lum = 55;
					break;
				case 8:
					lum = 89;
					break;
				case 9:
					lum = 144;
					break;
			}

			lum = lum/250;
			var fibonacciededColorLeft = ColorLuminance(hex, lum);
			var fibonacciededColorRight = ColorLuminance(hex, -lum);

			colors.left.push(fibonacciededColorLeft);
			colors.right.push(fibonacciededColorRight);
		}

		return colors;
	}



	function ColorLuminance(hex, lum) {

		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}

		return rgb;
	}

});
