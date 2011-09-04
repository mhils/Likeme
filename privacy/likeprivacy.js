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
}

function fixXFBML(){
	
	var tags = ["fb:like"];
	
	var inited = false;
	
	var activatespan = document.createElement("span");
	var activate = document.createElement("div");
	activatespan.appendChild(activate);
	activate.appendChild(document.createTextNode("Like"));
	activate.className = "fakeLike";

	for(var i=0;i<tags.length;i++)
	{
		var tag = tags[i];
		var elems = document.getElementsByTagName(tag);
		
		if(!inited && (elems.length > 0))
		{
			initXFBMLFake();
			inited = true;
		}
		for(var j=0;j<elems.length;j++)
		{
			var elem = elems[j];
			elem.parentNode.replaceChild(activatespan.cloneNode(true),elem);
		}
	}
	
	document.body.addEventListener("click",function(event){
		if(event.target.className === "fakeLike")
			if(confirm("Allow permanently on this site?"))
				localStorage.setItem("allowXFBML",true);
			else
				sessionStorage.setItem("allowXFBML",true);
			location.reload();
	});
	
	
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
		if((localStorage.getItem("allowXFBML") == null)&&(sessionStorage.getItem("allowXFBML") == null))
		{
			event.preventDefault();
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