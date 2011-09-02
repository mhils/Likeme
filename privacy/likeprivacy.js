//var privacyframes = document.getElementsByTagName("iframe");
var isFacebook = /.*facebook\.com\/plugins\/.*/i;
var likeDummy = chrome.extension.getURL("like.html");

//console.log([document,privacyframes,document.readyState]);

document.addEventListener("beforeload", function(event) {
  if(isFacebook.test(event.url))
  {
    console.log(["Caught resource load",event]); 
	event.preventDefault();
	event.target.src = likeDummy+ "#" + encodeURIComponent(event.url);
  }
  if(RegExp(likeDummy+".*","i").test(event.url))
	console.log(["New resource load",event]); 
}, true); 
/*
for(var i=0;i<privacyframes.length;i++)
{
	if(isFacebook.test(privacyframes[i].src))
		privacyframes[i].src = likeDummy+ "#" + encodeURIComponent(privacyframes[i].src);
}
*/