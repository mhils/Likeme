var isFacebook_XFBML= /(fbcdn|facebook).(net|com)\/.*all\.js/i;
var isFacebook_Like = /facebook\.com\/plugins\//i;
var likeDummy = chrome.extension.getURL("like.html");

//console.log([document,privacyframes,document.readyState]);

function initXFBMLFake(){
	var fileref=document.createElement("link")
	fileref.setAttribute("rel", "stylesheet")
	fileref.setAttribute("type", "text/css")
	fileref.setAttribute("href", chrome.extension.getURL("like.css"));
	document.head.appendChild(fileref);
	console.log(chrome.extension.getURL("like.css"));
}

function fixXFBML(){
	
	var tags = ["fb:like"];
	
	var inited = false;
	
	var activatespan = document.createElement("span");
	var activate = document.createElement("a");
	activatespan.appendChild(activate);
	activate.appendChild(document.createTextNode("Like"));
	activate.className = "fakeLike";

	activate.onclick = function(){
		alert(1);
		//localStorage.setItem("allowXFBML",true);
	};
	for(var i=0;i<tags.length;i++)
	{
		var elems = document.getElementsByTagName(tags[i]);
		if(!inited && (elems.length > 0))
		{
			initXFBMLFake();
			inited = true;
		}
		for(var j=0;j<elems.length;j++)
		{
			var elem = elems[j];
			console.log([elem,activatespan]);
			elem.parentNode.replaceChild(activatespan,elem);
		}
	}
	
}

//if(window.fb)

document.addEventListener("beforeload", function(event) {
	if(isFacebook_Like.test(event.url))
	{
		//console.log(["Caught FB-Like load",event]); 
		event.preventDefault();
		event.target.src = likeDummy+ "#" + encodeURIComponent(event.url);
	}
	else if(isFacebook_XFBML.test(event.url))
	{
		console.log(["Caught FB-XFBML load",event]); 
		if(localStorage.getItem("allowXFBML") == null)
		{
			event.preventDefault();
			document.addEventListener( "DOMContentLoaded", fixXFBML, false );
		}
		
		
	}
}, true); 