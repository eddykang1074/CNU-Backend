// Loading
$(function() {
	$("#loading-wrapper").fadeOut(3000);
});



// Toggle sidebar
$("#toggle-sidebar").click(function () {
	$(".page-wrapper").toggleClass("toggled");
});



// Hide Empty Chat Screen
$(".recent-chat-list .chat-cards li").click(function () {
	$(".empty-chat-screen").addClass("d-none");
	$(".chat-content-wrapper").removeClass("d-none");
});

$(".users-container .users-list li").click(function () {
	$(".empty-chat-screen").addClass("d-none");
	$(".chat-content-wrapper").removeClass("d-none");
	$(".users-container .users-list li").removeClass("active-chat");
	$(this).addClass("active-chat");
});



// Lets Chat Mobile View
$(".lets-chat-mobile-view").click(function () {
	$(".empty-chat-screen").addClass("d-none");
	$(".chat-content-wrapper").removeClass("d-none");
	$(".page-wrapper").toggleClass("toggled");
});



if ($(window).width() < 768) {
	$(".users-container .users-list li").click(function () {
		$(".page-wrapper").toggleClass("toggled");
	});
};



// Delete User From Group Modal
$(".stacked-user .delete-user").click(function () {
	$(this).closest(".stacked-user").remove();
});



/***********
***********
***********
	Bootstrap JS 
***********
***********
***********/

// Tooltip
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})