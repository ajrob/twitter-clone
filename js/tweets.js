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
			// customDropDown(this);
			// $("#tweet-controls").slideToggle(200);
		}
	});
	$("#tweet-content .tweet-compose").focusout(function(){
		if($(this).val().length <= 0)
		{
			hideTweetControls(this);
			// customSlideUp(this);
			// $("#tweet-controls").slideToggle(200);
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
\
							<p class=\"tweet-text\">" + tweetText + "</p>\
\
							<div class=\"tweet-actions\">\
								<ul>\
									<li><span class=\"icon action-reply\"></span> Reply</li>\
									<li><span class=\"icon action-retweet\"></span> Retweet</li>\
									<li><span class=\"icon action-favorite\"></span> Favorite</li>\
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
										<img src=\"img/alagoon.jpg\" />\
										<img src=\"img/vklimenko.jpg\" />\
									</div>\
								</div>\
\
								<div class=\"time\">\
									1:04 PM - 19 Sep 13\
								</div>\
							</div>\
							<div class=\"reply\">\
								<img class=\"avatar\" src=\"img/alagoon.jpg\" />\
								<textarea class=\"tweet-compose\" placeholder=\"Reply to @mybff\"/></textarea>\
							</div>\
						</div>\
					</article><!-- .tweet -->";
		$("#stream").prepend(postHTML);
	}

		//Post Tweet button clicked
	$("#tweet-submit").on("click", function(){
		var tweetConsole = "#tweet-content .tweet-compose";
		if ($(tweetConsole).val().length > 0)
		{
			doPost($(tweetConsole).val());
			//Clear previous text
			$(tweetConsole).val("");
			customSlideUp($(tweetConsole));
		}
	});
	
		// Show/hide tweet actions "Reply", "Retweet", etc
		// NOTE ---> Usage of on() is needed to allow newly appended HTML elements
		//			  to be bound to to the mouseenter and mouseleave events
	$("#stream").on("mouseenter", '.tweet', function(event){
		// Show tweet actions
		// NOTE ---> Use "this" to define the context of the selector
		$('.tweet-actions', this).show();
	});
	$("#stream").on("mouseleave", '.tweet', function(event){
		//Hide tweet actions
		$('.tweet-actions', this).hide();
	});

	/*******************************************/
	// Show div.stats and div.reply on click
	/*******************************************/

	$("#stream").on("click", '.tweet', function(event){
		$("div.stats", this).slideToggle();
		$("div.reply", this).slideToggle();
	});






});