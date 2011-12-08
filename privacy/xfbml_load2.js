window.FB = undefined;
window.fbAsyncInit = function(){
		window._xfbml_fbAsyncInit();
		console.debug("fake async init", window._xfbml_calls);
	};
for(var i=0; i < scripts.length; i++)
{
	if(scripts[i].src.indexOf(fakeScript) > 0)
	{
		var secret = scripts[i].src.match(/secret=\d+/)[0] || console.error("fb-privacy: no secret found!");
		var xfbml_src = scripts[i].src.match(/src=([^#]+)/)[1] || "//connect.facebook.net/en_US/all.js";
		scripts[i].src = encodeURIComponent(xfbml_src) + "#"+secret;
	}
}