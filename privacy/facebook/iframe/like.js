document.addEventListener( "DOMContentLoaded", function(){
	var facebook = new RegExp("^https?://([^/]*\.)?facebook.com/plugins/(.+)\.php", "i");
	var data = decodeURIComponent(location.hash).replace(/^#/, "");
	var isDirect = false; //true on Facebook Iframe Implementation
	var tagName, language;
	if(facebook.test(data))
	{
		isDirect = true;
		var result = facebook.exec(data);
		tagName =   "fb_" + result[2];
		if (tagName === "fb_like")
		{
			var action = data.match(/action=([a-z]+)/i);
			if(action != null && action[1]==="recommend")
				tagName = "fb_recommend";
		}
		var language = data.match(/locale=([a-z_]+)/i);
		language = (language != null) ? language[1] : "en_US";
	}
	else
	{
		try {
			result = JSON.parse(data);
			tagName = "fb_"+result.tagName;
			language = result.language;
			
		} catch(e) {
			console.error("Could not parse URL. Potential XSRF attack.");
			return;
		}
	}

	

	//Loop through possible localizationKeys until we find a match
	var localizationKeys = [tagName+"_"+language,tagName,"fb_generic"];
	var buttonText = "";
	do {
		buttonText = chrome.i18n.getMessage(localizationKeys.shift());
	} while(buttonText == "" && localizationKeys.length);
	
	var fakeLike = document.getElementById("fakeLike");
	fakeLike.textContent  = buttonText;
	
	fakeLike.addEventListener("click",function(){
		chrome.extension.sendRequest({allow: true});
	});
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		sendResponse({});
		//console.log(request);
		//console.log(request.permissionChanged);
		if (request.permissionChanged && isDirect)
			location = decodeURIComponent(location.hash.replace(/^#/,""));
	});
	
}, false );