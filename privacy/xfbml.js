(function(){

	var xfbmlLoadURL = chrome.extension.getURL("xfbml_load.js");
	var xfbmlFakeURL = chrome.extension.getURL("xfbml_fake.js");
	var xfbmlRealURL = undefined;
	
	var head = document.getElementsByTagName('head')[0];
	
	//Fake window.FB
	//To accomplish that, we need to get out of the content script execution environment.
	var fake = document.createElement( 'script' );
	fake.src = xfbmlFakeURL;
	head.appendChild(fake);
	
	function fakeDOM() {
		//Add fake markup
		var tags = ["fb:like"];
		for(var i = 0;i<tags.length;i++)
		{
			var elements = document.getElementsByTagName(tags[i]);
			for(var j=0;j<elements.length;j++)
			{
				var fakeElem = document.createElement("iframe");
				fakeElem.src = chrome.extension.getURL("facebook/iframe/like.html");
				elements[j].parentNode.insertBefore(fakeElem,elements[j]);
			}
		}
	}
	
	function unfakeDOM() {
	
	}
	
	fakeDOM();
	
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		sendResponse({});
		
		if (request.xfbmlRealURL)
		{
			if(xfbmlRealURL === undefined)
				xfbmlRealURL = request.xfbmlRealURL;
		}
		if (request.permissionChanged)
		{
			//Remove fake elements
			unfakeDOM();
			//Load XFBML
			var prepare = document.createElement('script');
			prepare.src = xfbmlLoadURL;
			prepare.addEventListener("load",function(){
				var load = document.createElement('script');
				load.src = xfbmlRealURL || "//connect.facebook.net/en_US/all.js";
				head.appendChild(load);
			});
			head.appendChild(prepare);
		}
	});
	
	console.debug("Facebook XFBML faked.");

	
})();

//console.log("foo");
//console.warn(chrome.i18n.getMessage("@@extension_id"));