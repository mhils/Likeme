(function(){

	var xfbmlLoadURL = chrome.extension.getURL("xfbml_load.js");
	var xfbmlFakeURL = chrome.extension.getURL("xfbml_fake.js");
	
	var head = document.getElementsByTagName('head')[0];

	//Fake window.FB. To accomplish that, we need to get out of the content script execution environment.
	var fake = document.createElement( 'script' );
	fake.src = xfbmlFakeURL;
	head.appendChild(fake);
	
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		sendResponse({});

		if (request.permissionChanged)
		{
			var scripts = document.getElementsByTagName('script');
			var fbTest  = /(facebook|fbcdn)\.(com|net)\/.+\/all\.js/;
				for(var i in scripts)
				{
					if(fbTest.test(scripts[i].src)) 
					{
						var script = document.createElement( 'script' );
						script.dataset.xfbml_fake = scripts[i].src;
						script.src = xfbmlLoadURL;
						head.appendChild(script);
						break;
					}
				}
		}
	});

	var tags = ["fb:like"];
	for(var i = 0;i<tags.length;i++)
	{
		var elements = document.getElementsByTagName(tags[i]);
		for(var j=0;j<elements.length;j++)
		{
			var fakeElem = document.createElement("div");
			fakeElem.innerHTML = "Like2";
			elements[j].parentNode.insertBefore(fakeElem,elements[j]);
		}
	}
	//console.debug("chrome-extension://__MSG_@@extension_id__/background.png");
	//console.debug(chrome.i18n.getMessage("@@extension_id"));
	console.debug("Facebook XFBML faked.");
	
	
})();

//console.log("foo");
//console.warn(chrome.i18n.getMessage("@@extension_id"));