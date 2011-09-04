var isFacebook_XFBML= /(fbcdn|facebook).(net|com)\/.*all\.js/i;
var isFacebook_Like = /facebook\.com\/plugins\//i;
var likeDummy = chrome.extension.getURL("like.html");

/*
function dump(obj,out)
{
	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	if(obj instanceof HTMLElement)
		return "null";
	if(out==undefined || out ==null)
		out = 0;
	if(out>15)
		return "null";
	if($.isFunction(obj))
		return "fbFakeHandler";//"function(){}";
	else if(obj == null)
		return "null";
	else if(isNumber(obj))
		return obj+"";
	else if(obj.length === undefined)
	{
		var x = "{";
		for(key in obj)
		{
			if(!obj.hasOwnProperty(key))
				continue;
			x += '"'+key+'":'+dump(obj[key],out+1)+',';
		}
		if(x.length >1)
			x = x.slice(0,-1);
		x += "}"
		return x;
	}
	else if($.isArray(obj))
	{
		var x = "[";
		for(var i=0;i<obj.length;i++)
		{
			x += dump(obj[i],out+1)+",";
		}
		if(x.length >1)
			x = x.slice(0,-1);
		x += "]"
		return x;
	}
	else
		return '"'+obj.replace(/"/g,"\\\"")+'"';
}
*/

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
			if(confirm(chrome.i18n.getMessage("confirmUnblock")))
			//	localStorage.setItem("allowXFBML",true);
			//else
				sessionStorage.setItem("allowXFBML",true);
			location.reload();
		}
	});
}

function fixXFBML(){
	
	var tags = ["fb:like"];
		
	var activatespan = document.createElement("span");
	var activate = document.createElement("div");
	activatespan.appendChild(activate);
	activate.appendChild(document.createTextNode(chrome.i18n.getMessage("facebookLike")));
	activate.className = "fakeLike";
	
	for(var i=0;i<tags.length;i++)
	{
		var tag = tags[i];
		var elems = document.getElementsByTagName(tag);

		for(var j=0;j<elems.length;j++)
		{
			var elem = elems[j];
			elem.parentNode.replaceChild(activatespan.cloneNode(true),elem);
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