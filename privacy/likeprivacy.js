var isFacebookXFBML= /facebook.net\/.*all\.js/i;
var isFacebook_Like = /facebook\.com\/plugins\//i;
var likeDummy = chrome.extension.getURL("like.html");

//console.log([document,privacyframes,document.readyState]);

document.addEventListener("beforeload", function(event) {
	if(isFacebook_Like.test(event.url))
	{
		//console.log(["Caught FB-Like load",event]); 
		event.preventDefault();
		event.target.src = likeDummy+ "#" + encodeURIComponent(event.url);
	}
	else if(isFacebook.test(event.url))
	{
		//console.log(["Caught XFBML load",event]); 
		
		event.preventDefault();
	}
}, true); 