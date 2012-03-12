var strictMode = true;

//Workaround for a synchronous chrome.tabs.get API Call.
//http://code.google.com/p/chromium/issues/detail?id=54257
//https://groups.google.com/a/chromium.org/group/chromium-extensions/browse_thread/thread/31ee95cb50c40275/2e19617c879f245b?lnk=raot&pli=1
var tabs = {};
chrome.tabs.getSynchronous = function (tabId) {
    return tabs[tabId];
};
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    tabs[details.tabId] = details.url;
    setAllowed(details.tabId, false, false);
}, {
    urls: ['*://*/*'],
    types: ["main_frame"]
});

function getHostname(tabId) {
    var url = chrome.tabs.getSynchronous(tabId);
    return url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/)[4];
}

function isAllowed(tabId) {
    //console.debug("isAllowed",getHostname(tabId),(localStorage.getItem(getHostname(tabId)) || sessionStorage.getItem(getHostname(tabId))) ? true : false,url);
    return sessionStorage.getItem(tabId) === "true" || localStorage.getItem(getHostname(tabId)) === "true";
}

function setAllowed(tabId, value, permanently) {
    var storage = permanently ? localStorage : sessionStorage;
    var key = permanently ? getHostname(tabId) : tabId;
    storage.setItem(key, value);
}

function allow(tab) {
    if (sessionStorage.getItem(tab.id) === "true") {
        setAllowed(tab.id, true, true);
        chrome.pageAction.hide(tab.id);
        location.reload();
    } else {
        setAllowed(tab.id, true, false);
        /*chrome.webRequest.handlerBehaviorChanged(function(){
			chrome.tabs.executeScript(tab.id,{code:executionEnvEscapeScript,
			allFrames: true});
		});*/
        chrome.tabs.sendRequest(tab.id, {
            permissionChanged: true
        });
    }
}

chrome.extension.onRequest.addListener( function (request, sender, sendResponse) {
	sendResponse({});
    //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    //console.log(arguments);
	if(request.allow)
		allow(sender.tab);
});

//########### Facebook iframe
var likeURL = chrome.extension.getURL("facebook/iframe/like.html");
chrome.webRequest.onBeforeRequest.addListener(function (details) {
		if (isAllowed(details.tabId)) {
			if (strictMode) chrome.webRequest.handlerBehaviorChanged();
			return;
		}
		return { redirectUrl: likeURL + "#" + encodeURIComponent(details.url) };
	}, {
		urls: ["*://*.facebook.com/plugins/*"],
		types: ["main_frame", "sub_frame"]
		}, ["blocking"]);

//########### Facebook XFBML
chrome.webRequest.onBeforeRequest.addListener(function (details) {
		if (isAllowed(details.tabId)) {
			//console.log("Tab allowed, don't redirect...");
			if (strictMode) chrome.webRequest.handlerBehaviorChanged();
			return;
		}
		
		//Show Page Action and redirect to fake XFBML
		chrome.pageAction.show(details.tabId);
		chrome.tabs.executeScript(details.tabId, {file: "xfbml.js"},function(){
			chrome.tabs.sendRequest(details.tabId, {
				xfbmlRealURL: details.url
			});
		});
		return { cancel: true };
	}, {
		urls:
		//afaik, all.js is distributed by (facebook|fbcdn)\.net
		["*://*.fbcdn.net/*/all.js*", "*://*.facebook.net/*/all.js*"],
		types: ["script"]
		}, ["blocking"]);

chrome.pageAction.onClicked.addListener(allow);