document.addEventListener( "DOMContentLoaded", function(){
	var check = new RegExp("^https?://([^/]*\.)?facebook.com/plugins/(.+)\.php", "i");
	var facebookURL = decodeURIComponent(location.hash).replace(/^#/, "");
	if(!check.test(facebookURL))
	{
		console.error("Could not parse URL. Potential XSRF attack.");
		return;
	}
	var tagName =   "fb_" + check.exec(facebookURL)[2];
	if(tagName === "fb_like")
	{
		var action = new RegExp("action=([a-z]+)", "i").exec(facebookURL);
		tagName = (action != null && action[1]==="recommend") ? "fb_recommend" : "fb_like";
	}
	
	var language = new RegExp("locale=([a-z_]+)","i").exec(facebookURL);
	language = (language != null) ? language[1] : "en_US";

	//Loop through possible localizationKeys until we find a match
	var localizationKeys = [tagName+"_"+language,tagName,"fb_generic"];
	var buttonText = "";
	do {
		buttonText = chrome.i18n.getMessage(localizationKeys.shift());
	} while(buttonText == "" && localizationKeys.length);
	
	var fakeLike = document.getElementById("fakeLike");
	fakeLike.textContent  = buttonText;
	
	fakeLike.addEventListener("click",function(){
		location = decodeURIComponent(location.hash.replace("#",""));
	});
	
}, false );