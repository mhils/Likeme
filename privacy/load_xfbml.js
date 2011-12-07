window.FB = undefined;
window.fbAsyncInit = function(){
		window._xfbml_fbAsyncInit();
		console.debug("fake async init", window._xfbml_calls);
	};