var isFacebook_Like  = /facebook\.com\/plugins\//i;
var likeDummy = chrome.extension.getURL("like.html");

document.addEventListener("beforeload", function(event) {
	if(isFacebook_Like.test(event.url))
	{
		event.preventDefault();
		event.target.src = likeDummy+ "#" + encodeURIComponent(event.url);
	}
}, true); 