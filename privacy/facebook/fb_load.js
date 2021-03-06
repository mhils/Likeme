(function(){
	console.debug("Prepare for real XFBML...");

	delete window.FB;

	var _fbAsyncInit = window.fbAsyncInit || function(){};
	window.fbAsyncInit = function(){
			console.debug("Async Facebook Init.");
			_fbAsyncInit();
			console.debug("Lazy Load XFBML Calls", window._fb_calls);
			if(window._fb_calls)
			{
				for(var i = 0;i < window._fb_calls.length;i++)
				{
					var call = window._fb_calls[i];
					if(call[0].indexOf("FB.") != 0) continue; //security measure.
					var secureCall = call[0].replace(/[^\w\.\$_]/g,""); //We're as careful as possible when it comes to eval, but we cannot do more.
					var parentObj = secureCall.replace(/\.[^\.]+$/,"");
					console.log("Calling",secureCall,parentObj,call[1]);
					eval(secureCall).apply(eval(parentObj),call[1]);
				}
				delete window._fb_calls;
			}
			
			console.debug("fake init done");
			
	};

	console.debug("Prepared.");
})();