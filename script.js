var sketchpad = null;

$(document).ready(function() {
  sketchpad = new Sketchpad({
    element: '#sketchpad',
    width: window.innerWidth,
    height: window.innerHeight,
  });
});

$(window).on('resize', function() {
  sketchpad.reset();
});
$('.reveal-controls').on('click', function() {
	$('.controls').show().addClass('slideInUp');
	$(this).hide();
})
$('.hide-button').on('click', function() {
	$('.reveal-controls').show();
	$('.controls').hide();
})

$('.color-picker').on('change', function(event) {
	sketchpad.color = $(event.target).val();
})

$('.size-picker').on('change', function(event) {
	sketchpad.penSize = $(event.target).val();
})
$('.undo').on('click', function() {
	sketchpad.undo();
});
$('.redo').on('click', function() {
	sketchpad.redo();
});

var upload = function() {
	var now = Date.now();
	var formData = new FormData();
	formData.append(now, sketchpad.canvas.toDataURL().replace('data:image/png;base64,', ''));

	var request = new XMLHttpRequest();
	request.open("POST", "/new/sketch/");
        request.onload = function(event) { window.location = "/files/" + new Date().getFullYear() + "/" + ((new Date().getMonth() + 1 < 10)? "0" + String(new Date().getMonth() + 1): String(new Date().getMonth() + 1)) + "/" + now + ".png"; };
	request.send(formData);
}

