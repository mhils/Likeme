var strictMode = true;


//########### Facebook iframes
var likeURL = chrome.extension.getURL("facebook/iframe/like.html");
//secret key used to verify requests from our pages. 
var secret = "xfbml_secret="+Math.floor(Math.random()*100000001); 


//Workaround for a synchronous chrome.tabs.get API Call.
//http://code.google.com/p/chromium/issues/detail?id=54257
//https://groups.google.com/a/chromium.org/group/chromium-extensions/browse_thread/thread/31ee95cb50c40275/2e19617c879f245b?lnk=raot&pli=1
var tabs = {};
chrome.tabs.getSynchronous = function(tabId){
	return tabs[tabId];
};
chrome.webRequest.onBeforeRequest.addListener(function(details){
	tabs[details.tabId] = details.url;
	setAllowed(details.tabId,false,false);
}, {urls: ['*://*/*'], types: ["main_frame"]});

function getHostname(tabId){
	var url = chrome.tabs.getSynchronous(tabId);
	return url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/)[4];
}
function isAllowed(tabId){
	//console.debug("isAllowed",getHostname(tabId),(localStorage.getItem(getHostname(tabId)) || sessionStorage.getItem(getHostname(tabId))) ? true : false,url);
	return sessionStorage.getItem(tabId) === "true" || localStorage.getItem(getHostname(tabId)) === "true";
}
function setAllowed(tabId,value,permanently){
	var storage = permanently ? localStorage : sessionStorage;
	var key = permanently ? getHostname(tabId) : tabId;
	storage.setItem(key,value);
}


chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	console.log(arguments);
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
    else
      sendResponse({}); // snub them.
  });

var likeSub = function(details) 
{
	if(details.url.indexOf(secret) > 0)
		return;
	if(isAllowed(details.tabId)){
		if(strictMode)
			chrome.webRequest.handlerBehaviorChanged();
		return;
	}
	return {redirectUrl: likeURL + "#" + encodeURIComponent(details.url) + "#"+secret};
};
chrome.webRequest.onBeforeRequest.addListener(likeSub, {urls: ["*://*.facebook.com/plugins/*"], types: ["main_frame","sub_frame"]}, ["blocking"]);

//########### Facebook XFBML
var xfbmlFakeURL = chrome.extension.getURL("xfbml_fake.js");
var xfbmlLoadURL = chrome.extension.getURL("xfbml_load.js");
chrome.webRequest.onBeforeRequest.addListener(function(details){
	//console.debug(details);
	//console.debug("Allowed: ",isAllowed(details.tabId));
	if(details.url.indexOf(secret) > 0)
	{
		//console.log("Secret in URL found, redirecting...");
		return {redirectUrl: details.url.replace(new RegExp("[?&#]"+secret,"g"),"")};
	}
	if(isAllowed(details.tabId)){
		//console.log("Tab allowed, don't redirect...");
		if(strictMode)
			chrome.webRequest.handlerBehaviorChanged();
		return;
	}
	//xfbml loaded first, show page action
	chrome.pageAction.show(details.tabId);
	return {redirectUrl: xfbmlFakeURL+"#"+encodeURIComponent(likeURL)};
}, {urls: 
//afaik, all.js is distributed by (facebook|fbcdn)\.net
["*://*.fbcdn.net/*/all.js*","*://*.facebook.net/*/all.js*"], 
types: ["script"]}, ["blocking"]);

var executionEnvEscapeScript = 	//Dirty :(
								//Doing it inline is easier because of the secret.
	"var scripts = document.getElementsByTagName('script');"+
	"var fbTest  = /(facebook|fbcdn)\.(com|net)\\/.+\\/all\.js/;"+
	"for(var i=0; i < scripts.length; i++)"+
		"if(fbTest.test(scripts[i].src)) {"+
			"var script = document.createElement( 'script' );"+
			"script.dataset.xfbml_fake = scripts[i].src;"+
			'script.dataset.secret = "'+secret+'";'+
			'script.src = "'+xfbmlLoadURL+'";'+
			"document.head.appendChild(script);"+
			"i = scripts.length;}";
chrome.pageAction.onClicked.addListener(function(tab) {
	if(sessionStorage.getItem(tab.id) === true)
	{
		setAllowed(tab.id,true,true);
		chrome.pageAction.hide(tab.id);
		location.reload();
	}
	else
	{
		setAllowed(tab.id,true,false);
		chrome.webRequest.handlerBehaviorChanged(function(){
			chrome.tabs.executeScript(tab.id,{code:executionEnvEscapeScript,
			allFrames: true});
		});
	}
});

/*var ports = {};
var tabStatus = {};
chrome.pageAction.onClicked.addListener(function(tab) {
	var message = (tabStatus && tabStatus[tab.id] && tabStatus[tab.id] > 0) ? "allow-always" : "allow-once";
	console.debug(ports[tab.id],message);
	var tabPorts = ports[tab.id];
	for(var i in tabPorts)
	{
		tabPorts[i].postMessage({xfbml: message});
	}
});
chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if (msg.xfbml == "request")
	{
		console.debug(port,msg);
		chrome.pageAction.show(port.tab.id);
		if(port.tab.id in ports)
			ports[port.tab.id].push(port);
		else
			ports[port.tab.id] = [port];
		
	}
  });
});*/
  /* "content_scripts": [
	{
      */// "matches": ["http://*/*","https://*/*"], 
      /* "js": ["likeprivacy.js"],
	  "run_at": "document_start",
	  "all_frames": true
    }
  ], */
//chrome.tabs.onUpdated.addListener(checkForValidUrl);