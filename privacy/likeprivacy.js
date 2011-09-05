var isFacebook_XFBML = /(fbcdn|facebook).(net|com)\/([a-z_]+)\/all\.js/i;
var isFacebook_Like  = /facebook\.com\/plugins\//i;
var likeDummy = chrome.extension.getURL("like.html");
var language = undefined;

function isBlocked(){
	return ((localStorage.getItem("allowXFBML") == null)&&(sessionStorage.getItem("allowXFBML") == null));
}

function initXFBMLFake(){
	var fbFakeCSS=document.createElement("link");
	fbFakeCSS.setAttribute("rel", "stylesheet");
	fbFakeCSS.setAttribute("type", "text/css");
	fbFakeCSS.setAttribute("href", chrome.extension.getURL("like.css"));
	document.head.appendChild(fbFakeCSS);
	
	var fbFakeJS=document.createElement('script');
    fbFakeJS.setAttribute("type","text/javascript");
    fbFakeJS.setAttribute("src", chrome.extension.getURL("fbFake.js"));
	document.head.appendChild(fbFakeJS);
	
	document.body.addEventListener("click",function(event){
		if(event.target.className === "fakeLike")
		{
			//if(!isBlocked()) return;
			//FIXME: Make this more beautiful
			//if(confirm(chrome.i18n.getMessage("confirmUnblock")))
			//	localStorage.setItem("allowXFBML",true);
			//else
				sessionStorage.setItem("allowXFBML",true);
			location.reload();
		}
	});
}

function fixXFBML(){
	
	var tags = ["fb:like"];
	
	var fakes = {
		"fb:like" : function(elem){
			var container = document.createElement("span");
			var like = document.createElement("div");
			like.className = "fakeLike";
			container.appendChild(like);
			
			var tagName = elem.tagName.replace(":","_").toLowerCase();
			if(tagName === "fb_like" && elem.getAttribute("action") == "recommend")
				tagName = "fb_recommend";
			var likeText;
			var localizationKeys = [tagName+"_"+language,tagName,"fb_generic"];
			do {
				likeText = chrome.i18n.getMessage(localizationKeys.shift());
			} while(likeText == "");
			
			like.appendChild(document.createTextNode(likeText));
			
			return container;
		}
	}
	fakes.generic = fakes["fb:like"];
	
	for(var i=0;i<tags.length;i++)
	{
		var tag = tags[i];
		var fakeFunction = fakes.hasOwnProperty(tag) ? fakes[tag] : fakes.generic;
		var elems = document.getElementsByTagName(tag);

		for(var j=0;j<elems.length;j++)
		{
			var elem = elems[j];			
			elem.parentNode.replaceChild(fakeFunction(elem),elem);
		}
	}	
}

document.addEventListener("beforeload", function(event) {
	if(isFacebook_Like.test(event.url))
	{
		//console.log(["Caught FB-Like load",event]); 
		event.preventDefault();
		event.target.src = likeDummy+ "#" + encodeURIComponent(event.url);
	}
	else if(isFacebook_XFBML.test(event.url))
	{
		//console.log(["Caught FB-XFBML load",event]); 
		if(isBlocked())
		{
			event.preventDefault();
			initXFBMLFake();
			document.body.addEventListener('fixXFBML',fixXFBML);
			language = isFacebook_XFBML.exec(event.url)[3];
			if(language==null || language == undefined) //regex failed somehow. :-/
				language = "en_US";

			if ( document.readyState === "complete" ) {
				fixXFBML();
			}
			else {
				//console.log("DOMContentLoaded"); 
				document.addEventListener( "DOMContentLoaded", fixXFBML, false );
				window.addEventListener( "load", fixXFBML, false );
			}
		}
		
		
	}
}, true); 