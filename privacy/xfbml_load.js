(function(){
	console.debug("Prepare for real XFBML...");

	delete window.FB;

	_fbAsyncInit = window.fbAsyncInit || function(){};
	window.fbAsyncInit = function(){
			console.debug("Async Facebook Init.");
			_fbAsyncInit();
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

	console.debug("Prepared.");
})();