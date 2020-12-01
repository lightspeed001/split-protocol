var gridWidth = $(".nav-container").outerWidth();

var nav = Draggable.create(".nav", {
	type: "x",
	lockAxis: true,
	edgeResistance: 1,
	throwProps: true,
	throwResistance: 0,
	cursor: "pointer",
	bounds: ".nav-container",
	allowNativeTouchScrolling: false,
	// snap: {
	// 	x: function(endValue) {
	// 		return Math.round(endValue / gridWidth) * gridWidth;
	// 	}
	// },
	onClick: function() {
		navActiveToggle();
	},
	onDrag: function() {
		checkOffset();
	},
	onThrowComplete: function() {
		checkOffset();
	}
});

function navActiveToggle() {
	$(".nav").toggleClass("active");
	navAnimation.reversed() ? navAnimation.play() : navAnimation.reverse();
	checkOffset();
}

function checkOffset() {
	var screenWidth = $(window).width();
	var screenCenter = $(window).width() / 2;
	var navTogglePosition = $(".nav").offset().left;
	var navSize = $("nav").outerWidth();
	var navSizeHalf = $("nav").outerWidth() / 2;

	if (navSizeHalf >= navTogglePosition) {
		TweenLite.to("nav", 0.5, { ease: Power0.easeNone, x: navSizeHalf });
	} else if (navTogglePosition >= screenWidth - navSize) {
		TweenLite.to("nav", 0.5, { ease: Power0.easeNone, x: -navSizeHalf });
	} else {
		TweenLite.to("nav", 0.5, { ease: Power0.easeNone, x: 0 });
	}
}

function navActiveRemove() {
	$(".nav").removeClass("active");
	navAnimation.reverse();
}

var navAnimation = new TimelineLite({
	paused: true,
	reversed: true
});

navAnimation
	.to(
		"#burger__upper",
		0.25,
		{
			ease: Power0.easeNone,
			rotation: -45,
			y: "6.5px",
			transformOrigin: "center"
		},
		0
	)
	.to(
		"#burger__middle",
		0.25,
		{
			ease: Power0.easeNone,
			opacity: 0,
			x: "-100%",
			transformOrigin: "center"
		},
		0
	)
	.to(
		"#burger__lower",
		0.25,
		{
			ease: Power0.easeNone,
			rotation: 45,
			y: "-6.5px",
			transformOrigin: "center"
		},
		0
	)
	.staggerTo(
		"nav a",
		0.25,
		{
			opacity: 1
		},
		-0.1
	);

$("#burger").animation = navAnimation;

jQuery(document).ready(function() {
    setTimeout(function() {
        navActiveToggle();
    }, 1500);
});