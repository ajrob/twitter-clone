$(document).ready(function(){
	var userInfo = {
		name: "Alex Robinson",
		username: "@alex",
		img: "img/alagoon.jpg"
	};

	/*******************************************/
	// Slide compose tweet up/down.
	//   Only show/hide if there isn't content in the textarea
	/*******************************************/

	//Animated height increase/decrease of an element
	function customDropDown(element){
		$(element).animate({
				height: [ "+=2.5em", "swing" ]
			}, 200 );
		
	}

	function customSlideUp(element){
		$(element).animate({
				height: [ "-=2.5em", "swing"]
			}, 200);
		
	}

	function revealTweetControls(animatedElement){
		customDropDown(animatedElement);
		$("#tweet-controls").slideToggle(200);
	}

	function hideTweetControls(animatedElement){
		customSlideUp(animatedElement);
		$("#tweet-controls").slideToggle(200);
	}

	$("#tweet-content .tweet-compose").focusin(function(){
		if ($(this).val().length <= 0)
		{
			revealTweetControls(this);
		}
	});
	$("#tweet-content .tweet-compose").focusout(function(){
		if($(this).val().length <= 0)
		{
			hideTweetControls(this);
		}
	});

	/*******************************************/
	// Increment/decrement character count
	/*******************************************/
	function doCount(){
		$("#char-count").text(140 - $(this).val().length);
		if ($("#char-count").text() <= 10)
		{
			$("#char-count").css("color", "red");
			if($("#char-count").text() < 0)
			{
				// Disable button
				$("#tweet-submit").attr("disabled", "disabled");
			}
			else
			{
				$("#tweet-submit").removeAttr("disabled");
			}
		}
		else
		{
			$("#char-count").css("color", "black");
		}
	}

	$("#tweet-content .tweet-compose")
									.bind('keydown keyup keypress', doCount)
									.bind('paste', function(){setTimeout(doCount, 10);});
									// Delay by 10ms to give paste time to complete before counting

	/*******************************************/
	// Post tweet
	/*******************************************/
	function doPost(tweetText){
		var postHTML = "<article class=\"tweet\">\
						<div class=\"content\">\
							<img class=\"avatar\" src=\"" + userInfo.img + "\" />\
							<strong class=\"fullname\">" + userInfo.name + "</strong>\
							<span class=\"username\">" + userInfo.username + "</span>\
							<i class=\"fa fa-star-o fa-star\"></i>\
							<p class=\"tweet-text\">" + tweetText + "</p>\
\
							<div class=\"tweet-actions\">\
								<ul>\
									<li><span class=\"icon action-reply\"></span> Reply</li>\
									<li><span class=\"icon action-retweet\"></span> Retweet</li>\
									<li class=\"favorite\"><span class=\"icon action-favorite\"></span> Favorite</li>\
									<li><span class=\"icon action-more\"></span> More</li>\
								</ul>\
							</div>\
\
							<div class=\"stats\">\
								<div class=\"retweets\">\
									<p class=\"num-retweets\">30</p>\
									<p>RETWEETS</p>\
								</div>\
								<div class=\"favorites\">\
									<p class=\"num-favorites\">6</p>\
									<p>FAVORITES</p>\
								</div>\
								<div class=\"users-interact\">\
									<div>\
\
										<img class=\"hasTooltip\" src=\"img/alagoon.jpg\" />\
										<img class=\"hasTooltip\" src=\"img/vklimenko.jpg\" />\
									</div>\
								</div>\
\
								<abbr class=\"timeago\" title=\"2014-04-04T09:35:00Z\">\
								</abbr>\
							</div>\
							<div class=\"reply\">\
								<img class=\"avatar\" src=\"img/alagoon.jpg\" />\
								<textarea class=\"tweet-compose\" placeholder=\"Reply to @mybff\"/></textarea>\
							</div>\
						</div>\
					</article><!-- .tweet -->";
		$("#stream").prepend(postHTML);
		$("abbr.timeago").timeago(); //Refresh the timeago plugin
	}

		//Post Tweet button clicked
	$("#tweet-submit").on("click", function(){
		var tweetConsole = "#tweet-content .tweet-compose";
		if ($(tweetConsole).val().length > 0)
		{
			doPost($(tweetConsole).val());
			//Clear previous text
			$(tweetConsole).val("");
			$("#char-count").text("140");
			hideTweetControls($(tweetConsole));
		}
	});
	
		// Show/hide tweet actions "Reply", "Retweet", etc
		// NOTE ---> Usage of on() is needed to allow newly appended HTML elements
		//			  to be bound to to the mouseenter and mouseleave events
	$("#stream").on("mouseenter", '.tweet', function(event){
		// Show tweet actions
		// NOTE ---> Use "this" to define the context of the selector
		$('.tweet-actions', this).css("visibility", "visible");
	});
	$("#stream").on("mouseleave", '.tweet', function(event){
		//Hide tweet actions
		$('.tweet-actions', this).css("visibility", "hidden");
	});

	/*******************************************/
	// Show div.stats and div.reply on click
	/*******************************************/

	$("#stream").on("click", '.tweet', function(event){
		//Skip this event if clicking on the "Favorite" icon
		if($(event.target).hasClass("favorite") == false && 
			$(event.target).hasClass("fa") == false && 
			$(event.target).hasClass("tweet-compose") == false)
		{
			$("div.stats", this).slideToggle();
			$("div.reply", this).slideToggle();
		}
	});

	//Collapse the tweet after the mouse leaves the tweet
	$("#stream").on("mouseleave", '.tweet', function(event){
		$("div.stats", this).delay(500).slideUp();
		$("div.reply", this).delay(500).slideUp();
	});

	/*******************************************/
	// Timeago plugin
	/*******************************************/
	$("abbr.timeago").timeago();

	/*******************************************/
	// Favorite star
	/*******************************************/
	$("#stream").on("click", ".fa-star-o, .fa-star", function(event){
		$(this).toggleClass("fa-star-o", "fa-star");
		$(this).css("cursor", "pointer");
		$(this).css("color", "gold");
	});

	//Clicking the favorite button in .tweet-actions
	$("#stream").on("click", ".favorite", function(event){
		$(event.target).closest(".content").children("i").toggleClass("fa-star-o", "fa-star");
		$(event.target).closest(".content").children("i").css("color", "gold");
	});

	/*******************************************/
	// Enable tooltips over retweet avatar images
	/*******************************************/
	function setTitle(node){
		return $(node).attr("src");
	}
	$(".hasTooltip").tooltip();
	$(".hasTooltip").on("mouseenter", function(event){
		$(event.target).tooltip()
					   .attr('data-original-title', setTitle($(event.target)))
			           .tooltip('fixTitle')
			           .tooltip('show');
	});
});