(function(){
    
    var head = document.getElementsByTagName('head')[0];
    
    //run only once
    if(head.dataset._fb_faked == "true")
        return;
    head.dataset._fb_faked = true;
    
	var likeURL = chrome.extension.getURL("facebook/like.html");
	var xfbmlLoadURL = chrome.extension.getURL("facebook/fb_load.js");
	var xfbmlFakeURL = chrome.extension.getURL("facebook/fb_fake.js");
	var xfbmlRealURL = undefined;
	
	
	
	//Fake window.FB
	//To accomplish that, we need to get out of the content script execution environment.
	var fake = document.createElement( 'script' );
	fake.src = xfbmlFakeURL;
	head.insertBefore(fake,head.firstChild);
	
	function fakeDOM() {
		var tags = ["activity","add-to-timeline","comments","facepile","like-box","like","live-stream","login-button","recommendations","recommendations_bar","registration","send","subscribe"];
		
		//Add fake markup
		for(var i in tags)
		{
			var tag = tags[i];
			
			var elements = 
			Array.prototype.slice.call(document.getElementsByTagName("fb:"+tag)).concat(
			Array.prototype.slice.call(document.getElementsByClassName("fb-"+tag)));

			for(var j=0; j < elements.length; j++)
			{
				var elem = elements[j];
				if(elem.classList.contains("_fb_faked"))
					continue;
				else
					elem.classList.add("_fb_faked");
				
				var data = {};
				data.tagName = tag;
				var action = elem.getAttribute("action") || elem.dataset.action;
				if(data.tagName === "like" && action === "recommend")
					data.tagName = "recommend";
				
				var fakeElem = document.createElement("iframe");
				fakeElem.src = likeURL+"#"+encodeURIComponent(JSON.stringify(data));
				fakeElem.scrolling = "no";
				fakeElem.frameBorder = 0;
				//fakeElem.className = elem.className;
                for(var k = 0; k < elem.attributes.length;k++)
                {
                    var name = elem.attributes[k].name;
                    var val = elem.attributes[k].value;
                    fakeElem.setAttribute(name,val);
                }
                
				fakeElem.classList.add("_fb_fakeElement");
				fakeElem.style.cssText += "height: 20px; display: inline-block";
				elements[j].parentNode.insertBefore(fakeElem,elements[j]);
			}
		}
		
	}
	
	function unfakeDOM() {
		var fakeElements = document.getElementsByClassName("_fb_fakeElement");
		for(var i=fakeElements.length-1; i >= 0; i--)
		{
			fakeElements[i].parentNode.removeChild( fakeElements[i] );
		}
		
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
				//Workaround: Search for url fragment in source code (not available in the WebRequest API)
				//http://code.google.com/p/chromium/issues/detail?id=118172
				if(xfbmlRealURL)
				{
					var scripts = document.getElementsByTagName("script");
					for(var i=0;i<scripts.length;i++)
					{
						var script = scripts[i];
						if(script.src.indexOf(xfbmlRealURL) >= 0)
						{
							xfbmlRealURL = script.src;
							break;
						}
					}
				}
				var load = document.createElement('script');
				load.src = xfbmlRealURL || "//connect.facebook.net/en_US/all.js#xfbml=1";
				head.appendChild(load);
			});
			head.appendChild(prepare);
		}
	});
	
	console.debug("Facebook JavaScript SDK faked.");

	
})();