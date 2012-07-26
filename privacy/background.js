var strictMode = false;
var likeURL = chrome.extension.getURL("facebook/like.html");

//Workaround for a synchronous chrome.tabs.get API Call.
//http://code.google.com/p/chromium/issues/detail?id=54257
//https://groups.google.com/a/chromium.org/group/chromium-extensions/browse_thread/thread/31ee95cb50c40275/2e19617c879f245b?lnk=raot&pli=1
var tabs = {}, hostnames = {};
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    tabs[details.tabId] = details.url;
	delete hostnames[details.tabId];
    setAllowed(details.tabId, false, false);
}, {
    urls: ['<all_urls>'],
    types: ["main_frame"]
});

function getHostname(tabId) {
	if  (!(tabId in hostnames))
	{
		hostnames[tabId] = (tabs[tabId] || "").match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/)[4];
	}
    return hostnames[tabId];
}

function isAllowed(tabId) {
    //console.debug("isAllowed",getHostname(tabId),(localStorage.getItem(getHostname(tabId)) || sessionStorage.getItem(getHostname(tabId))) ? true : false,url);
    return isAllowedTemporarily(tabId) || isAllowedPermanently(tabId);
}
function isAllowedTemporarily(tabId){
	return sessionStorage.getItem(tabId) === "true" ;
}
function isAllowedPermanently(tabId){
	return localStorage.getItem(getHostname(tabId)) === "true";
}
const PERM = true, TEMP = false;
function setAllowed(tabId, value, permanently) {
    var storage = permanently ? localStorage : sessionStorage;
    var key = permanently ? getHostname(tabId) : tabId;
	if(value===false)
		storage.removeItem(key);
	else
		storage.setItem(key, value);
}

function allow(tab) {
    if (isAllowedTemporarily(tab.id)) {
		setAllowed(tab.id, false, TEMP);
        setAllowed(tab.id, true, PERM);
        chrome.tabs.reload(tab.id);
    } else if (isAllowedPermanently(tab.id)) {
		setAllowed(tab.id, false, PERM);
		setAllowed(tab.id, false, TEMP);
		chrome.tabs.reload(tab.id);
	} else {
        setAllowed(tab.id, true, TEMP);
		
        chrome.tabs.sendRequest(tab.id, {
            permissionChanged: true
        });
    }
	showPageAction(tab.id);
}

function showPageAction(tabId){
	if(isAllowedTemporarily(tabId))
	{
		chrome.pageAction.setIcon( {tabId: tabId, path:"img/fb_check.png"});
		chrome.pageAction.setTitle({tabId: tabId, title: chrome.i18n.getMessage("pageaction_allow_permanently", getHostname(tabId))});
	}
	else if(isAllowedPermanently(tabId))
	{
		chrome.pageAction.setIcon( {tabId: tabId, path:"img/fb_doublecheck.png"});
		chrome.pageAction.setTitle({tabId: tabId, title: chrome.i18n.getMessage("pageaction_allow_withdraw", getHostname(tabId))});
	}
	else
	{
		chrome.pageAction.setIcon( {tabId: tabId, path:"img/fb.png"});
		chrome.pageAction.setTitle({tabId: tabId, title: chrome.i18n.getMessage("pageaction_allow_once")});
	}
	chrome.pageAction.show(tabId);
}

chrome.extension.onRequest.addListener( function (request, sender, sendResponse) {
	sendResponse({});
	if(request.allow)
		allow(sender.tab);
});

//########### Facebook iframe

chrome.webRequest.onBeforeRequest.addListener(function (details) {
		showPageAction(details.tabId);
		if (isAllowed(details.tabId)) {
			if (strictMode) chrome.webRequest.handlerBehaviorChanged();
			return;
		}
		return { redirectUrl: likeURL + "#" + encodeURIComponent(details.url) };
	}, {
		urls: ["*://*.facebook.com/plugins/*"],
		types: ["sub_frame"]
		}, ["blocking"]);

//########### Facebook XFBML
chrome.webRequest.onBeforeRequest.addListener(function (details) {
		showPageAction(details.tabId);
		if (isAllowed(details.tabId)) {
			//console.log("Tab allowed, don't redirect...");
			if (strictMode) chrome.webRequest.handlerBehaviorChanged();
			return;
		}
		
		//Show Page Action and redirect to fake XFBML
		chrome.tabs.executeScript(details.tabId, {file: "facebook/fb_contentscript.js", runAt: "document_start"},function(){
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