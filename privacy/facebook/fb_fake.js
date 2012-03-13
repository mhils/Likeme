(function() {

	//create a faked FB object
	//(object created using window.fb_dumper.js)
	var fb_call = function(name,arguments) {
		console.debug("XFBML-Call: "+name,arguments);
		window._fb_calls = window._fb_calls || [];
		window._fb_calls.push([name,arguments]);
		return undefined;
	}
	window.FB = {"_apiKey":null,"_session":null,"_userStatus":"unknown","_logging":{},"_inCanvas":{},"_https":{},"_domain":{"api":"https://api.facebook.com/","api_read":"https://api-read.facebook.com/","cdn":"http://static.ak.fbcdn.net/","cdn_foreign":"http://connect.facebook.net/","graph":"https://graph.facebook.com/","https_cdn":"https://s-static.ak.fbcdn.net/","https_staticfb":"https://s-static.ak.facebook.com/","https_www":"https://www.facebook.com/","staticfb":"http://static.ak.facebook.com/","www":"http://www.facebook.com/","m":"http://m.facebook.com/","https_m":"https://m.facebook.com/"},"_locale":"en_US","_localeIsRtl":{},"getDomain":function(){ fb_call("FB.getDomain", arguments);   },"copy":function(){ fb_call("FB.copy", arguments);   },"create":function(){ fb_call("FB.create", arguments);   },"provide":function(){ fb_call("FB.provide", arguments);   },"guid":function(){ fb_call("FB.guid", arguments);   },"log":function(){ fb_call("FB.log", arguments);   },"$":function (a){return document.getElementById(a);},"Array":{"indexOf":function (a,c){if(a.indexOf)return a.indexOf(c);var d=a.length;if(d)for(var b=0;b<d;b++)if(a[b]===c)return b;return -1;},"merge":function (c,b){for(var a=0;a<b.length;a++)if(FB.Array.indexOf(c,b[a])<0)c.push(b[a]);return c;},"filter":function (a,c){var b=[];for(var d=0;d<a.length;d++)if(c(a[d]))b.push(a[d]);return b;},"keys":function (c,d){var a=[];for(var b in c)if(d||c.hasOwnProperty(b))a.push(b);return a;},"map":function (a,d){var c=[];for(var b=0;b<a.length;b++)c.push(d(a[b]));return c;},"forEach":function (c,a,f){if(!c)return;if(Object.prototype.toString.apply(c)==='[object Array]'||(!(c instanceof Function)&&typeof c.length=='number')){if(c.forEach){c.forEach(a);}else for(var b=0,e=c.length;b<e;b++)a(c[b],b,c);}else for(var d in c)if(f||c.hasOwnProperty(d))a(c[d],d,c);},"toArray":function (b){for(var c=0,a=[],d=b.length;c<d;c++)a[c]=b[c];return a;}},"QS":{"encode":function(){ fb_call("FB.QS.encode", arguments);   },"decode":function(){ fb_call("FB.QS.decode", arguments);   }},"Content":{"_root":null,"_hiddenRoot":null,"_callbacks":{},"append":function(){ fb_call("FB.Content.append", arguments);   },"appendHidden":function(){ fb_call("FB.Content.appendHidden", arguments);   },"insertIframe":function(){ fb_call("FB.Content.insertIframe", arguments);   },"submitToTarget":function(){ fb_call("FB.Content.submitToTarget", arguments);   }},"Flash":{"_minVersions":[[10,3,181,34],[11,0,0]],"_swfPath":"rsrc.php/v1/yD/r/GL74y29Am1r.swf","_callbacks":[],"_names":{},"_unloadRegistered":{},"init":function(){ fb_call("FB.Flash.init", arguments);   },"embedSWF":function(){ fb_call("FB.Flash.embedSWF", arguments);   },"hasMinVersion":function(){ fb_call("FB.Flash.hasMinVersion", arguments);   },"onReady":function(){ fb_call("FB.Flash.onReady", arguments);   }},"JSON":{"stringify":function (a){if(window.Prototype&&Object.toJSON){return Object.toJSON(a);}else return JSON.stringify(a);},"parse":function (a){return JSON.parse(a);},"flatten":function (c){var a={};for(var b in c)if(c.hasOwnProperty(b)){var d=c[b];if(null===d||undefined===d){continue;}else if(typeof d=='string'){a[b]=d;}else a[b]=FB.JSON.stringify(d);}return a;}},"api":function(){ fb_call("FB.api", arguments);   },"ApiServer":{"METHODS":["get","post","delete","put"],"_callbacks":{},"_readOnlyCalls":{"fql_query":{},"fql_multiquery":{},"friends_get":{},"notifications_get":{},"stream_get":{},"users_getinfo":{}},"graph":function(){ fb_call("FB.ApiServer.graph", arguments);   },"rest":function(){ fb_call("FB.ApiServer.rest", arguments);   },"oauthRequest":function(){ fb_call("FB.ApiServer.oauthRequest", arguments);   },"corsPost":function(){ fb_call("FB.ApiServer.corsPost", arguments);   },"_createCORSRequest":function(){ fb_call("FB.ApiServer._createCORSRequest", arguments);   },"jsonp":function(){ fb_call("FB.ApiServer.jsonp", arguments);   },"flash":function(){ fb_call("FB.ApiServer.flash", arguments);   }},"EventProvider":{"subscribers":function(){ fb_call("FB.EventProvider.subscribers", arguments);   },"subscribe":function(){ fb_call("FB.EventProvider.subscribe", arguments);   },"unsubscribe":function(){ fb_call("FB.EventProvider.unsubscribe", arguments);   },"monitor":function(){ fb_call("FB.EventProvider.monitor", arguments);   },"clear":function(){ fb_call("FB.EventProvider.clear", arguments);   },"fire":function(){ fb_call("FB.EventProvider.fire", arguments);   },"listen":function(){ fb_call("FB.EventProvider.listen", arguments);   },"unlisten":function(){ fb_call("FB.EventProvider.unlisten", arguments);   }},"Event":{"subscribers":function(){ fb_call("FB.Event.subscribers", arguments);   },"subscribe":function(){ fb_call("FB.Event.subscribe", arguments);   },"unsubscribe":function(){ fb_call("FB.Event.unsubscribe", arguments);   },"monitor":function(){ fb_call("FB.Event.monitor", arguments);   },"clear":function(){ fb_call("FB.Event.clear", arguments);   },"fire":function(){ fb_call("FB.Event.fire", arguments);   },"listen":function(){ fb_call("FB.Event.listen", arguments);   },"unlisten":function(){ fb_call("FB.Event.unlisten", arguments);   },"_subscribersMap":{"xfbml.parse":[function(){ fb_call("FB.Event._subscribersMap.xfbml.parse[0]", arguments);   }],"auth.sessionChange":[function(){ fb_call("FB.Event._subscribersMap.auth.sessionChange[0]", arguments);   }]}},"XD":{"_origin":"http://takethislollipop.com/f33dbfff38","_transport":"postmessage","_callbacks":{},"_forever":{},"_xdProxyUrl":"connect/xd_proxy.php?version=3","_openerTransport":null,"_openerOrigin":null,"_nonOpenerOrigin":null,"init":function(){ fb_call("FB.XD.init", arguments);   },"resolveRelation":function(){ fb_call("FB.XD.resolveRelation", arguments);   },"handler":function(){ fb_call("FB.XD.handler", arguments);   },"recv":function(){ fb_call("FB.XD.recv", arguments);   },"PostMessage":{"_isInitialized":{},"init":function(){ fb_call("FB.XD.PostMessage.init", arguments);   },"onMessage":function(){ fb_call("FB.XD.PostMessage.onMessage", arguments);   }},"WebView":{"onMessage":function(){ fb_call("FB.XD.WebView.onMessage", arguments);   }},"Flash":{"init":function(){ fb_call("FB.XD.Flash.init", arguments);   },"onMessage":function(){ fb_call("FB.XD.Flash.onMessage", arguments);   }},"Fragment":{"_magic":"fb_xd_fragment","checkAndDispatch":function(){ fb_call("FB.XD.Fragment.checkAndDispatch", arguments);   }}},"UA":{"ie":function(){ fb_call("FB.UA.ie", arguments);   },"firefox":function(){ fb_call("FB.UA.firefox", arguments);   },"opera":function(){ fb_call("FB.UA.opera", arguments);   },"safari":function(){ fb_call("FB.UA.safari", arguments);   },"chrome":function(){ fb_call("FB.UA.chrome", arguments);   },"windows":function(){ fb_call("FB.UA.windows", arguments);   },"osx":function(){ fb_call("FB.UA.osx", arguments);   },"linux":function(){ fb_call("FB.UA.linux", arguments);   },"ios":function(){ fb_call("FB.UA.ios", arguments);   },"mobile":function(){ fb_call("FB.UA.mobile", arguments);   },"nativeApp":function(){ fb_call("FB.UA.nativeApp", arguments);   },"android":function(){ fb_call("FB.UA.android", arguments);   },"iPad":function(){ fb_call("FB.UA.iPad", arguments);   },"_populated":{},"_populate":function(){ fb_call("FB.UA._populate", arguments);   },"_iPad":null,"_android":null,"_mobile":null,"_ie":{},"_firefox":{},"_opera":{},"_safari":535.11,"_chrome":17,"_osx":{},"_windows":{},"_linux":{},"_ios":null,"_enableMobile":{}},"Arbiter":{"_canvasProxyUrl":"connect/canvas_proxy.php?version=3","BEHAVIOR_EVENT":"e","BEHAVIOR_PERSISTENT":"p","BEHAVIOR_STATE":"s","inform":function(){ fb_call("FB.Arbiter.inform", arguments);   }},"Canvas":{"_timer":null,"_lastSize":{},"_pageInfo":{"clientWidth":0,"clientHeight":0,"scrollLeft":0,"scrollTop":0,"offsetLeft":0,"offsetTop":0},"getPageInfo":function(){ fb_call("FB.Canvas.getPageInfo", arguments);   },"hideFlashElement":function(){ fb_call("FB.Canvas.hideFlashElement", arguments);   },"showFlashElement":function(){ fb_call("FB.Canvas.showFlashElement", arguments);   },"_flashClassID":"CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000","_hideFlashCallback":function(){ fb_call("FB.Canvas._hideFlashCallback", arguments);   },"_devHideFlashCallback":null,"_setHideFlashCallback":function(){ fb_call("FB.Canvas._setHideFlashCallback", arguments);   },"init":function(){ fb_call("FB.Canvas.init", arguments);   },"setSize":function(){ fb_call("FB.Canvas.setSize", arguments);   },"scrollTo":function(){ fb_call("FB.Canvas.scrollTo", arguments);   },"setAutoGrow":function(){ fb_call("FB.Canvas.setAutoGrow", arguments);   },"setAutoResize":function(){ fb_call("FB.Canvas.setAutoResize", arguments);   },"isTabIframe":function(){ fb_call("FB.Canvas.isTabIframe", arguments);   },"setDoneLoading":function(){ fb_call("FB.Canvas.setDoneLoading", arguments);   },"stopTimer":function(){ fb_call("FB.Canvas.stopTimer", arguments);   },"setUrlHandler":function(){ fb_call("FB.Canvas.setUrlHandler", arguments);   },"startTimer":function(){ fb_call("FB.Canvas.startTimer", arguments);   },"_passAppTtiMessage":function(){ fb_call("FB.Canvas._passAppTtiMessage", arguments);   },"_computeContentSize":function(){ fb_call("FB.Canvas._computeContentSize", arguments);   },"Prefetcher":{"_sampleRate":500,"_appIdsBlacklist":144959615576466,"_links":[],"COLLECT_AUTOMATIC":0,"COLLECT_MANUAL":1,"_collectionMode":0,"addStaticResource":function(){ fb_call("FB.Canvas.Prefetcher.addStaticResource", arguments);   },"setCollectionMode":function(){ fb_call("FB.Canvas.Prefetcher.setCollectionMode", arguments);   },"_maybeSample":function(){ fb_call("FB.Canvas.Prefetcher._maybeSample", arguments);   },"_sample":function(){ fb_call("FB.Canvas.Prefetcher._sample", arguments);   }},"EarlyFlush":{"addResource":function(){ fb_call("FB.Canvas.EarlyFlush.addResource", arguments);   },"setCollectionMode":function(){ fb_call("FB.Canvas.EarlyFlush.setCollectionMode", arguments);   }}},"Intl":{"_punctCharClass":"[.!?。！？।…ຯ᠁ฯ．]","_endsInPunct":function(){ fb_call("FB.Intl._endsInPunct", arguments);   },"_tx":function(){ fb_call("FB.Intl._tx", arguments);   },"tx":function(){ fb_call("FB.Intl.tx", arguments);   }},"String":{"trim":function(){ fb_call("FB.String.trim", arguments);   },"format":function(){ fb_call("FB.String.format", arguments);   },"escapeHTML":function(){ fb_call("FB.String.escapeHTML", arguments);   },"quote":function(){ fb_call("FB.String.quote", arguments);   }},"Dom":{"containsCss":function(){ fb_call("FB.Dom.containsCss", arguments);   },"addCss":function(){ fb_call("FB.Dom.addCss", arguments);   },"removeCss":function(){ fb_call("FB.Dom.removeCss", arguments);   },"getByClass":function(){ fb_call("FB.Dom.getByClass", arguments);   },"getStyle":function(){ fb_call("FB.Dom.getStyle", arguments);   },"setStyle":function(){ fb_call("FB.Dom.setStyle", arguments);   },"addScript":function(){ fb_call("FB.Dom.addScript", arguments);   },"addCssRules":function(){ fb_call("FB.Dom.addCssRules", arguments);   },"getViewportInfo":function(){ fb_call("FB.Dom.getViewportInfo", arguments);   },"ready":function(){ fb_call("FB.Dom.ready", arguments);   },"_isReady":{},"_cssRules":{"fb.css.base":{},"fb.css.dialog":{},"fb.css.iframewidget":{},"fb.css.button":{},"fb.css.sharebutton":{},"fb.css.connectbarwidget":{},"fb.css.edgecommentwidget":{},"fb.css.sendbuttonformwidget":{},"fb.css.plugin.recommendationsbar":{}}},"bind":function(){ fb_call("FB.bind", arguments);   },"Class":function(){ fb_call("FB.Class", arguments);   },"subclass":function(){ fb_call("FB.subclass", arguments);   },"CLASSES":{"Obj":function(){ fb_call("FB.CLASSES.Obj", arguments);   },"Dialog":function(){ fb_call("FB.CLASSES.Dialog", arguments);   },"Waitable":function(){ fb_call("FB.CLASSES.Waitable", arguments);   },"Data.Query":function(){ fb_call("FB.CLASSES.Data.Query", arguments);   },"TemplateUI":function(){ fb_call("FB.CLASSES.TemplateUI", arguments);   },"XFBML.Element":function(){ fb_call("FB.CLASSES.XFBML.Element", arguments);   },"XFBML.IframeWidget":function(){ fb_call("FB.CLASSES.XFBML.IframeWidget", arguments);   },"XFBML.Activity":function(){ fb_call("FB.CLASSES.XFBML.Activity", arguments);   },"XFBML.ButtonElement":function(){ fb_call("FB.CLASSES.XFBML.ButtonElement", arguments);   },"XFBML.AddProfileTab":function(){ fb_call("FB.CLASSES.XFBML.AddProfileTab", arguments);   },"XFBML.Facepile":function(){ fb_call("FB.CLASSES.XFBML.Facepile", arguments);   },"XFBML.AddToTimeline":function(){ fb_call("FB.CLASSES.XFBML.AddToTimeline", arguments);   },"XFBML.Bookmark":function(){ fb_call("FB.CLASSES.XFBML.Bookmark", arguments);   },"XFBML.Comments":function(){ fb_call("FB.CLASSES.XFBML.Comments", arguments);   },"XFBML.CommentsCount":function(){ fb_call("FB.CLASSES.XFBML.CommentsCount", arguments);   },"XFBML.ConnectBar":function(){ fb_call("FB.CLASSES.XFBML.ConnectBar", arguments);   },"XFBML.Fan":function(){ fb_call("FB.CLASSES.XFBML.Fan", arguments);   },"XFBML.Friendpile":function(){ fb_call("FB.CLASSES.XFBML.Friendpile", arguments);   },"XFBML.EdgeCommentWidget":function(){ fb_call("FB.CLASSES.XFBML.EdgeCommentWidget", arguments);   },"XFBML.EdgeWidget":function(){ fb_call("FB.CLASSES.XFBML.EdgeWidget", arguments);   },"XFBML.SendButtonFormWidget":function(){ fb_call("FB.CLASSES.XFBML.SendButtonFormWidget", arguments);   },"XFBML.Send":function(){ fb_call("FB.CLASSES.XFBML.Send", arguments);   },"XFBML.Like":function(){ fb_call("FB.CLASSES.XFBML.Like", arguments);   },"XFBML.LikeBox":function(){ fb_call("FB.CLASSES.XFBML.LikeBox", arguments);   },"XFBML.LiveStream":function(){ fb_call("FB.CLASSES.XFBML.LiveStream", arguments);   },"XFBML.Login":function(){ fb_call("FB.CLASSES.XFBML.Login", arguments);   },"XFBML.LoginButton":function(){ fb_call("FB.CLASSES.XFBML.LoginButton", arguments);   },"XFBML.Name":function(){ fb_call("FB.CLASSES.XFBML.Name", arguments);   },"XFBML.ProfilePic":function(){ fb_call("FB.CLASSES.XFBML.ProfilePic", arguments);   },"XFBML.Question":function(){ fb_call("FB.CLASSES.XFBML.Question", arguments);   },"XFBML.Recommendations":function(){ fb_call("FB.CLASSES.XFBML.Recommendations", arguments);   },"XFBML.RecommendationsBar":function(){ fb_call("FB.CLASSES.XFBML.RecommendationsBar", arguments);   },"XFBML.Registration":function(){ fb_call("FB.CLASSES.XFBML.Registration", arguments);   },"XFBML.ServerFbml":function(){ fb_call("FB.CLASSES.XFBML.ServerFbml", arguments);   },"XFBML.ShareButton":function(){ fb_call("FB.CLASSES.XFBML.ShareButton", arguments);   },"XFBML.Subscribe":function(){ fb_call("FB.CLASSES.XFBML.Subscribe", arguments);   }},"Type":{"isType":function(){ fb_call("FB.Type.isType", arguments);   }},"Obj":function(){ fb_call("FB.Obj", arguments);   },"Dialog":function(){ fb_call("FB.Dialog", arguments);   },"ui":function(){ fb_call("FB.ui", arguments);   },"UIServer":{"Methods":{"permissions.request":{"size":{"width":640,"height":241},"transform":function(){ fb_call("FB.UIServer.Methods.permissions.request.transform", arguments);   }},"permissions.oauth":{"url":"dialog/oauth","size":{"width":627,"height":326},"transform":function(){ fb_call("FB.UIServer.Methods.permissions.oauth.transform", arguments);   }},"auth.logout":{"url":"logout.php","transform":function(){ fb_call("FB.UIServer.Methods.auth.logout.transform", arguments);   }},"auth.status":{"url":"extern/login_status.php","transform":function(){ fb_call("FB.UIServer.Methods.auth.status.transform", arguments);   }},"login.status":{"url":"dialog/oauth","transform":function(){ fb_call("FB.UIServer.Methods.login.status.transform", arguments);   }},"stream.share":{"size":{"width":575,"height":380},"url":"sharer.php","transform":function(){ fb_call("FB.UIServer.Methods.stream.share.transform", arguments);   }},"fbml.dialog":{"size":{"width":575,"height":300},"url":"render_fbml.php","loggedOutIframe":{},"transform":function(){ fb_call("FB.UIServer.Methods.fbml.dialog.transform", arguments);   }},"auth.logintofacebook":{"size":{"width":530,"height":287},"url":"login.php","transform":function(){ fb_call("FB.UIServer.Methods.auth.logintofacebook.transform", arguments);   }},"apprequests":{"transform":function(){ fb_call("FB.UIServer.Methods.apprequests.transform", arguments);   },"getXdRelation":function(){ fb_call("FB.UIServer.Methods.apprequests.getXdRelation", arguments);   }},"feed":{"transform":function(){ fb_call("FB.UIServer.Methods.feed.transform", arguments);   },"getXdRelation":function(){ fb_call("FB.UIServer.Methods.feed.getXdRelation", arguments);   }},"auth.login":{"size":{"width":640,"height":241},"transform":function(){ fb_call("FB.UIServer.Methods.auth.login.transform", arguments);   }},"pay.prompt":{"transform":function(){ fb_call("FB.UIServer.Methods.pay.prompt.transform", arguments);   }},"pay":{"size":{"width":555,"height":120},"noHttps":{},"connectDisplay":"popup","transform":function(){ fb_call("FB.UIServer.Methods.pay.transform", arguments);   }}},"_loadedNodes":{},"_defaultCb":{},"_resultToken":"\"xxRESULTTOKENxx\"","_forceHTTPS":{},"genericTransform":function(){ fb_call("FB.UIServer.genericTransform", arguments);   },"prepareCall":function(){ fb_call("FB.UIServer.prepareCall", arguments);   },"prepareParams":function(){ fb_call("FB.UIServer.prepareParams", arguments);   },"urlTooLongForIE":function(){ fb_call("FB.UIServer.urlTooLongForIE", arguments);   },"getDisplayMode":function(){ fb_call("FB.UIServer.getDisplayMode", arguments);   },"getXdRelation":function(){ fb_call("FB.UIServer.getXdRelation", arguments);   },"popup":function(){ fb_call("FB.UIServer.popup", arguments);   },"setLoadedNode":function(){ fb_call("FB.UIServer.setLoadedNode", arguments);   },"getLoadedNode":function(){ fb_call("FB.UIServer.getLoadedNode", arguments);   },"hidden":function(){ fb_call("FB.UIServer.hidden", arguments);   },"iframe":function(){ fb_call("FB.UIServer.iframe", arguments);   },"touch":function(){ fb_call("FB.UIServer.touch", arguments);   },"async":function(){ fb_call("FB.UIServer.async", arguments);   },"getDefaultSize":function(){ fb_call("FB.UIServer.getDefaultSize", arguments);   },"_insertIframe":function(){ fb_call("FB.UIServer._insertIframe", arguments);   },"_handleResizeMessage":function(){ fb_call("FB.UIServer._handleResizeMessage", arguments);   },"_triggerDefault":function(){ fb_call("FB.UIServer._triggerDefault", arguments);   },"_popupMonitor":function(){ fb_call("FB.UIServer._popupMonitor", arguments);   },"_xdChannelHandler":function(){ fb_call("FB.UIServer._xdChannelHandler", arguments);   },"_xdNextHandler":function(){ fb_call("FB.UIServer._xdNextHandler", arguments);   },"_xdRecv":function(){ fb_call("FB.UIServer._xdRecv", arguments);   },"_xdResult":function(){ fb_call("FB.UIServer._xdResult", arguments);   },"MobileIframableMethod":{"transform":function(){ fb_call("FB.UIServer.MobileIframableMethod.transform", arguments);   },"getXdRelation":function(){ fb_call("FB.UIServer.MobileIframableMethod.getXdRelation", arguments);   }}},"getLoginStatus":function(){ fb_call("FB.getLoginStatus", arguments);   },"getSession":function(){ fb_call("FB.getSession", arguments);   },"getAuthResponse":function(){ fb_call("FB.getAuthResponse", arguments);   },"getAccessToken":function(){ fb_call("FB.getAccessToken", arguments);   },"getUserID":function(){ fb_call("FB.getUserID", arguments);   },"login":function(){ fb_call("FB.login", arguments);   },"logout":function(){ fb_call("FB.logout", arguments);   },"Auth":{"_callbacks":[],"_xdStorePath":"xd_localstorage/v2","staticAuthCheck":function(){ fb_call("FB.Auth.staticAuthCheck", arguments);   },"_staticAuthHandler":function(){ fb_call("FB.Auth._staticAuthHandler", arguments);   },"setSession":function(){ fb_call("FB.Auth.setSession", arguments);   },"setAuthResponse":function(){ fb_call("FB.Auth.setAuthResponse", arguments);   },"xdHandler":function(){ fb_call("FB.Auth.xdHandler", arguments);   },"xdResponseWrapper":function(){ fb_call("FB.Auth.xdResponseWrapper", arguments);   },"_getSessionOrigin":function(){ fb_call("FB.Auth._getSessionOrigin", arguments);   },"xdNewHandler":function(){ fb_call("FB.Auth.xdNewHandler", arguments);   },"xdNewResponseWrapper":function(){ fb_call("FB.Auth.xdNewResponseWrapper", arguments);   },"parseSignedRequest":function(){ fb_call("FB.Auth.parseSignedRequest", arguments);   },"base64URLDecode":function(){ fb_call("FB.Auth.base64URLDecode", arguments);   }},"CanvasInsights":{"setDoneLoading":function(){ fb_call("FB.CanvasInsights.setDoneLoading", arguments);   }},"Cookie":{"_domain":null,"_enabled":{},"setEnabled":function(){ fb_call("FB.Cookie.setEnabled", arguments);   },"getEnabled":function(){ fb_call("FB.Cookie.getEnabled", arguments);   },"load":function(){ fb_call("FB.Cookie.load", arguments);   },"loadSignedRequest":function(){ fb_call("FB.Cookie.loadSignedRequest", arguments);   },"setSignedRequestCookie":function(){ fb_call("FB.Cookie.setSignedRequestCookie", arguments);   },"clearSignedRequestCookie":function(){ fb_call("FB.Cookie.clearSignedRequestCookie", arguments);   },"setRaw":function(){ fb_call("FB.Cookie.setRaw", arguments);   },"set":function(){ fb_call("FB.Cookie.set", arguments);   },"clear":function(){ fb_call("FB.Cookie.clear", arguments);   }},"Frictionless":{"_allowedRecipients":{},"_useFrictionless":{},"_updateRecipients":function(){ fb_call("FB.Frictionless._updateRecipients", arguments);   },"init":function(){ fb_call("FB.Frictionless.init", arguments);   },"_processRequestResponse":function(){ fb_call("FB.Frictionless._processRequestResponse", arguments);   },"isAllowed":function(){ fb_call("FB.Frictionless.isAllowed", arguments);   }},"initSitevars":{"parseXFBMLBeforeDomReady":{},"computeContentSizeVersion":0,"enableMobile":1,"forceSecureXdProxy":1,"iframePermissions":{"read_stream":{},"manage_mailbox":{},"manage_friendlists":{},"read_mailbox":{},"publish_checkins":{},"status_update":{},"photo_upload":{},"video_upload":{},"sms":{},"create_event":{},"rsvp_event":{},"offline_access":{},"email":{},"xmpp_login":{},"create_note":{},"share_item":{},"export_stream":{},"publish_stream":{},"publish_likes":{},"ads_management":{},"contact_email":{},"access_private_data":{},"read_insights":{},"read_requests":{},"read_friendlists":{},"manage_pages":{},"physical_login":{},"manage_groups":{},"read_deals":{}}},"init":function(){ fb_call("FB.init", arguments);   },"share":function(){ fb_call("FB.share", arguments);   },"publish":function(){ fb_call("FB.publish", arguments);   },"addFriend":function(){ fb_call("FB.addFriend", arguments);   },"XFBML":{"_renderTimeout":30000,"getElements":function(){ fb_call("FB.XFBML.getElements", arguments);   },"parse":function(){ fb_call("FB.XFBML.parse", arguments);   },"registerTag":function(){ fb_call("FB.XFBML.registerTag", arguments);   },"shouldUseWidgetPipe":function(){ fb_call("FB.XFBML.shouldUseWidgetPipe", arguments);   },"getBoolAttr":function(){ fb_call("FB.XFBML.getBoolAttr", arguments);   },"getAttr":function(){ fb_call("FB.XFBML.getAttr", arguments);   },"_processElement":function(){ fb_call("FB.XFBML._processElement", arguments);   },"_getDomElements":function(){ fb_call("FB.XFBML._getDomElements", arguments);   },"_tagInfos":[{"localName":"activity","className":"FB.XFBML.Activity"},{"localName":"add-profile-tab","className":"FB.XFBML.AddProfileTab"},{"localName":"add-to-timeline","className":"FB.XFBML.AddToTimeline"},{"localName":"bookmark","className":"FB.XFBML.Bookmark"},{"localName":"comments","className":"FB.XFBML.Comments"},{"localName":"comments-count","className":"FB.XFBML.CommentsCount"},{"localName":"connect-bar","className":"FB.XFBML.ConnectBar"},{"localName":"fan","className":"FB.XFBML.Fan"},{"localName":"like","className":"FB.XFBML.Like","supportsWidgetPipe":{}},{"localName":"like-box","className":"FB.XFBML.LikeBox"},{"localName":"live-stream","className":"FB.XFBML.LiveStream"},{"localName":"login","className":"FB.XFBML.Login"},{"localName":"login-button","className":"FB.XFBML.LoginButton"},{"localName":"facepile","className":"FB.XFBML.Facepile"},{"localName":"friendpile","className":"FB.XFBML.Friendpile"},{"localName":"name","className":"FB.XFBML.Name"},{"localName":"profile-pic","className":"FB.XFBML.ProfilePic"},{"localName":"question","className":"FB.XFBML.Question"},{"localName":"recommendations","className":"FB.XFBML.Recommendations"},{"localName":"recommendations-bar","className":"FB.XFBML.RecommendationsBar"},{"localName":"registration","className":"FB.XFBML.Registration"},{"localName":"send","className":"FB.XFBML.Send"},{"localName":"serverfbml","className":"FB.XFBML.ServerFbml"},{"localName":"share-button","className":"FB.XFBML.ShareButton"},{"localName":"subscribe","className":"FB.XFBML.Subscribe"}],"_widgetPipeEnabledTagCount":0,"_widgetPipeIsEnabled":function(){ fb_call("FB.XFBML._widgetPipeIsEnabled", arguments);   },"set":function(){ fb_call("FB.XFBML.set", arguments);   },"Element":function(){ fb_call("FB.XFBML.Element", arguments);   },"IframeWidget":function(){ fb_call("FB.XFBML.IframeWidget", arguments);   },"Activity":function(){ fb_call("FB.XFBML.Activity", arguments);   },"ButtonElement":function(){ fb_call("FB.XFBML.ButtonElement", arguments);   },"AddProfileTab":function(){ fb_call("FB.XFBML.AddProfileTab", arguments);   },"Facepile":function(){ fb_call("FB.XFBML.Facepile", arguments);   },"AddToTimeline":function(){ fb_call("FB.XFBML.AddToTimeline", arguments);   },"Bookmark":function(){ fb_call("FB.XFBML.Bookmark", arguments);   },"Comments":function(){ fb_call("FB.XFBML.Comments", arguments);   },"CommentsCount":function(){ fb_call("FB.XFBML.CommentsCount", arguments);   },"ConnectBar":function(){ fb_call("FB.XFBML.ConnectBar", arguments);   },"Fan":function(){ fb_call("FB.XFBML.Fan", arguments);   },"Friendpile":function(){ fb_call("FB.XFBML.Friendpile", arguments);   },"EdgeCommentWidget":function(){ fb_call("FB.XFBML.EdgeCommentWidget", arguments);   },"EdgeWidget":function(){ fb_call("FB.XFBML.EdgeWidget", arguments);   },"SendButtonFormWidget":function(){ fb_call("FB.XFBML.SendButtonFormWidget", arguments);   },"Send":function(){ fb_call("FB.XFBML.Send", arguments);   },"Like":function(){ fb_call("FB.XFBML.Like", arguments);   },"LikeBox":function(){ fb_call("FB.XFBML.LikeBox", arguments);   },"LiveStream":function(){ fb_call("FB.XFBML.LiveStream", arguments);   },"Login":function(){ fb_call("FB.XFBML.Login", arguments);   },"LoginButton":function(){ fb_call("FB.XFBML.LoginButton", arguments);   },"Name":function(){ fb_call("FB.XFBML.Name", arguments);   },"ProfilePic":function(){ fb_call("FB.XFBML.ProfilePic", arguments);   },"Question":function(){ fb_call("FB.XFBML.Question", arguments);   },"Recommendations":function(){ fb_call("FB.XFBML.Recommendations", arguments);   },"RecommendationsBar":function(){ fb_call("FB.XFBML.RecommendationsBar", arguments);   },"Registration":function(){ fb_call("FB.XFBML.Registration", arguments);   },"ServerFbml":function(){ fb_call("FB.XFBML.ServerFbml", arguments);   },"ShareButton":function(){ fb_call("FB.XFBML.ShareButton", arguments);   },"Subscribe":function(){ fb_call("FB.XFBML.Subscribe", arguments);   }},"Waitable":function(){ fb_call("FB.Waitable", arguments);   },"Data":{"Query":function(){ fb_call("FB.Data.Query", arguments);   },"query":function(){ fb_call("FB.Data.query", arguments);   },"waitOn":function(){ fb_call("FB.Data.waitOn", arguments);   },"_getValue":function(){ fb_call("FB.Data._getValue", arguments);   },"_selectByIndex":function(){ fb_call("FB.Data._selectByIndex", arguments);   },"_waitToProcess":function(){ fb_call("FB.Data._waitToProcess", arguments);   },"_process":function(){ fb_call("FB.Data._process", arguments);   },"_mergeIndexQuery":function(){ fb_call("FB.Data._mergeIndexQuery", arguments);   },"timer":-1,"queue":[]},"Native":{"NATIVE_READY_EVENT":"fbNativeReady","onready":function(){ fb_call("FB.Native.onready", arguments);   }},"Helper":{"isUser":function(){ fb_call("FB.Helper.isUser", arguments);   },"getLoggedInUser":function(){ fb_call("FB.Helper.getLoggedInUser", arguments);   },"upperCaseFirstChar":function(){ fb_call("FB.Helper.upperCaseFirstChar", arguments);   },"getProfileLink":function(){ fb_call("FB.Helper.getProfileLink", arguments);   },"invokeHandler":function(){ fb_call("FB.Helper.invokeHandler", arguments);   },"fireEvent":function(){ fb_call("FB.Helper.fireEvent", arguments);   },"executeFunctionByName":function(){ fb_call("FB.Helper.executeFunctionByName", arguments);   }},"TemplateData":{"_initialized":{},"_version":0,"_response":null,"_localStorageTimeout":86400,"_enabled":{},"enabled":function(){ fb_call("FB.TemplateData.enabled", arguments);   },"supportsLocalStorage":function(){ fb_call("FB.TemplateData.supportsLocalStorage", arguments);   },"_isStale":function(){ fb_call("FB.TemplateData._isStale", arguments);   },"getResponse":function(){ fb_call("FB.TemplateData.getResponse", arguments);   },"saveResponse":function(){ fb_call("FB.TemplateData.saveResponse", arguments);   },"getData":function(){ fb_call("FB.TemplateData.getData", arguments);   },"init":function(){ fb_call("FB.TemplateData.init", arguments);   },"clear":function(){ fb_call("FB.TemplateData.clear", arguments);   },"update":function(){ fb_call("FB.TemplateData.update", arguments);   }},"TemplateUI":function(){ fb_call("FB.TemplateUI", arguments);   },"URI":{"resolve":function(){ fb_call("FB.URI.resolve", arguments);   }},"Anim":{"ate":function(){ fb_call("FB.Anim.ate", arguments);   },"_parseCSS":function(){ fb_call("FB.Anim._parseCSS", arguments);   }},"Insights":{"impression":function(){ fb_call("FB.Insights.impression", arguments);   }},"forceOAuth":{},"widgetPipeEnabledApps":{"111476658864976":1,"cca6477272fc5cb805f85a84f20fca1d":1,"179150165472010":1},"widgetPipeTagCountThreshold":4,"_userID":0,"_oauth":{}};
	
	//console.debug("window.FB faked");
	
})();