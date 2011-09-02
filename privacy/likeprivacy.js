var privacyframes = document.getElementsByTagName("iframe");
var isFacebook = /.*facebook\.com\/plugins\/.*/i;
var likeDummy = chrome.extension.getURL("like.html");

//console.log([document,privacyframes,document.readyState]);

for(var i=0;i<privacyframes.length;i++)
{
	if(isFacebook.test(privacyframes[i].src))
		privacyframes[i].src = likeDummy+ "#" + encodeURIComponent(privacyframes[i].src);
}