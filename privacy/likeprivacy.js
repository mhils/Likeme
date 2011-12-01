var isFacebook_Like  = /facebook\.com\/plugins\//i;
var isFacebook_XFBML = /(fbcdn|facebook).(net|com)\/([a-z_]+)\/all\.js/i;
var likeDummy = chrome.extension.getURL("like.html");
var xfbmlDummy = chrome.extension.getURL("xfbml.js");
var XFBML_src;
var block_xfbml = true;

function XFBML_isBlocked(){
	return block_xfbml;
}

function onExtensionMessage(msg){
	console.debug(msg);
	switch(msg.xfbml)
	{
		case "allow-once":
			block_xfbml = false;
			var script = document.createElement( "script" );
			script.src = XFBML_src;
			script.onload = function() {
				console.log(script.readyState);
			};
			document.head.appendChild(script);
			break;
		case "allow-always":
			//FIXME
			break;
	}
}

document.addEventListener("beforeload", function(event) {
	if(isFacebook_Like.test(event.url))
	{
		event.preventDefault();
		event.target.src = likeDummy+ "#" + encodeURIComponent(event.url);
	}
	else if(isFacebook_XFBML.test(event.url))
	{
		if(XFBML_isBlocked())
		{
			console.debug("XFBML load");
			XFBML_src = event.url;
			var port = chrome.extension.connect();
			port.postMessage({xfbml: "request"});
			port.onMessage.addListener(onExtensionMessage);
		}
	}
}, true); 