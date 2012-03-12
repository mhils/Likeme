delete window.FB;

window._xfbml_fbAsyncInit = window.fbAsyncInit || function(){};
window.fbAsyncInit = function(){
		console.debug("Async Facebook Init.");
		window._xfbml_fbAsyncInit();
		console.debug("Lazy Load XFBML Calls", window._xfbml_calls);
		if(window._xfbml_calls)
		{
			for(var i = 0;i < window._xfbml_calls.length;i++)
			{
				var call = window._xfbml_calls[i];
				if(call[0].indexOf("FB.") != 0) continue; //security measure.
				var secureCall = call[0].replace(/[^\w\.\$_]/g,""); //We're as careful as possible when it comes to eval, but we cannot do more.
				var parentObj = secureCall.replace(/\.[^\.]+$/,"");
				console.log("Calling",secureCall,parentObj,call[1]);
				eval(secureCall).apply(eval(parentObj),call[1]);
			}
			delete window._xfbml_calls;
		}
		console.debug("fake init done");
		
	};
var scripts = document.getElementsByTagName('script');
for(var i=0; i < scripts.length; i++)
{
	if("xfbml_fake" in scripts[i].dataset)
	{
		console.debug("my tag found: ",scripts[i]);
		var script = document.createElement( "script" );
		var url = scripts[i].dataset.xfbml_fake.split("#");
		url = url[0] + ((url[0].indexOf("?") < 0) ? "?" : "&") + scripts[i].dataset.secret + ((url.length > 1) ? (url.shift(),"#"+url.join("#")) : "");
		script.src = url;
		console.debug(script.src);
		document.head.appendChild(script);
		break;
	}
}