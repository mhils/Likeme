var isFacebook_Like  = /facebook\.com\/plugins\//i;
var isFacebook_XFBML = /(fbcdn|facebook).(net|com)\/([a-z_]+)\/all\.js/i;
var likeDummy = chrome.extension.getURL("like.html");
var xfbmlDummy = chrome.extension.getURL("fake_xfbml.js");
var unsetDummy = chrome.extension.getURL("load_xfbml.js");
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
			// you get a beer if you tell me why window is not accessible here.
			var script = document.createElement( "script" );
			script.src = unsetDummy;
			script.onload = function() { 
				var script2 = document.createElement( "script" );
				script2.src = XFBML_src;
				script2.onload = function() {
					console.warn("FB loaded");
				};
				document.head.appendChild(script2);
			};
			document.head.appendChild(script);
			break;
		case "allow-always":
			//FIXME
			break;
	}
}

document.addEventListener("beforeload", function(event) {
	console.debug(event.url);
	if(isFacebook_Like.test(event.url))
	{
		event.preventDefault();
		event.target.src = likeDummy+ "#" + encodeURIComponent(event.url);
	}
	else if(isFacebook_XFBML.test(event.url))
	{
		if(XFBML_isBlocked())
		{
			console.debug("XFBML load",event);
			XFBML_src = event.url;
			var port = chrome.extension.connect();
			port.postMessage({xfbml: "request"});
			port.onMessage.addListener(onExtensionMessage);
			event.preventDefault();
			fakescript = document.createElement( "script" );
			fakescript.src = xfbmlDummy;
			event.target.parentNode.insertBefore(fakescript,event.target);
			//event.target.src = xfbmlDummy; somehow doesnt work
		}
	}
}, true); 